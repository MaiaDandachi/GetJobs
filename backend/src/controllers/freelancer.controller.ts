import {inject} from '@loopback/core';
import {Credentials, TokenServiceBindings} from '@loopback/authentication-jwt';
import {authenticate, TokenService} from '@loopback/authentication';
import {SecurityBindings, UserProfile, securityId} from '@loopback/security';
import {genSalt, hash, compare} from 'bcryptjs';

import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  SchemaObject,
  HttpErrors,
} from '@loopback/rest';
import {Freelancer} from '../models';
import {FreelancerRepository} from '../repositories';
import {validateCredentials} from '../services/validator';
import _ from 'lodash';
import {JWTCustomService} from '../services/jwt.service';

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

@authenticate('jwt')
export class FreelancerController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTCustomService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(FreelancerRepository)
    public freelancerRepository: FreelancerRepository,
  ) {}

  @authenticate.skip()
  @post('/freelancers/login', {
    responses: {
      '200': {
        description: 'Freelancer with token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
                id: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                },
                username: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string; id: string; email: string; username: string}> {
    const {email, password} = credentials;
    const invalidCredentialsError = 'Invalid email or password.';

    // ensure the user exists, and the password is correct
    if (!email) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const foundUser = await this.freelancerRepository.findOne({
      where: {email},
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await compare(password, foundUser.password);

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const userProfile: UserProfile = {
      [securityId]: foundUser.id!,
      name: foundUser.username,
      id: foundUser.id,
    };

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    return {
      token,
      id: foundUser.id!,
      email: foundUser.email,
      username: foundUser.username,
    };
  }

  @authenticate.skip()
  @post('/freelancers')
  @response(200, {
    description: 'Freelancer model instance',
    content: {'application/json': {schema: getModelSchemaRef(Freelancer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Freelancer, {
            title: 'NewFreelancer',
            exclude: ['id'],
          }),
        },
      },
    })
    freelancer: Omit<Freelancer, 'id'>,
  ): Promise<Freelancer> {
    // ensure a valid email value and password value
    validateCredentials(_.pick(freelancer, ['email', 'password']));

    const foundUser = await this.freelancerRepository.findOne({
      where: {email: freelancer.email},
    });

    if (foundUser) throw new HttpErrors.Conflict('email already exists');

    const password = await hash(freelancer.password, await genSalt());

    return this.freelancerRepository.create({...freelancer, password});
  }

  @get('/freelancers/count')
  @response(200, {
    description: 'Freelancer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Freelancer) where?: Where<Freelancer>,
  ): Promise<Count> {
    return this.freelancerRepository.count(where);
  }

  @get('/freelancers')
  @response(200, {
    description: 'Array of Freelancer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Freelancer, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Freelancer) filter?: Filter<Freelancer>,
  ): Promise<Freelancer[]> {
    return this.freelancerRepository.find(filter);
  }

  @patch('/freelancers')
  @response(200, {
    description: 'Freelancer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Freelancer, {partial: true}),
        },
      },
    })
    freelancer: Freelancer,
    @param.where(Freelancer) where?: Where<Freelancer>,
  ): Promise<Count> {
    return this.freelancerRepository.updateAll(freelancer, where);
  }

  @get('/freelancers/{id}')
  @response(200, {
    description: 'Freelancer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Freelancer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Freelancer, {exclude: 'where'})
    filter?: FilterExcludingWhere<Freelancer>,
  ): Promise<Freelancer> {
    return this.freelancerRepository.findById(id, filter);
  }

  @patch('/freelancers/{id}')
  @response(204, {
    description: 'Freelancer PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Freelancer, {partial: true}),
        },
      },
    })
    freelancer: Freelancer,
  ): Promise<void> {
    await this.freelancerRepository.updateById(id, freelancer);
  }

  @put('/freelancers/{id}')
  @response(204, {
    description: 'Freelancer PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() freelancer: Freelancer,
  ): Promise<void> {
    await this.freelancerRepository.replaceById(id, freelancer);
  }

  @del('/freelancers/{id}')
  @response(204, {
    description: 'Freelancer DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.freelancerRepository.deleteById(id);
  }
}
