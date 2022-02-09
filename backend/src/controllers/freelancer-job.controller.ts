import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Freelancer, Job} from '../models';
import {FreelancerRepository} from '../repositories';

@authenticate('jwt')
export class FreelancerJobController {
  constructor(
    @repository(FreelancerRepository)
    protected freelancerRepository: FreelancerRepository,
  ) {}

  @get('/freelancers/{id}/jobs', {
    responses: {
      '200': {
        description: 'Array of Freelancer has many Job',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Job)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Job>,
  ): Promise<Job[]> {
    return this.freelancerRepository.jobs(id).find({
      include: [
        {
          relation: 'client',
          scope: {
            // further filter the client object
            fields: {password: false}, // dont show password
          },
        },
      ],
    });
  }

  @post('/freelancers/{id}/jobs', {
    responses: {
      '200': {
        description: 'Freelancer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Job)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Freelancer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Job, {
            title: 'NewJobInFreelancer',
            exclude: ['id'],
            optional: ['freelancerId'],
          }),
        },
      },
    })
    job: Omit<Job, 'id'>,
  ): Promise<Job> {
    return this.freelancerRepository.jobs(id).create(job);
  }

  @patch('/freelancers/{id}/jobs', {
    responses: {
      '200': {
        description: 'Freelancer.Job PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Job, {partial: true}),
        },
      },
    })
    job: Partial<Job>,
    @param.query.object('where', getWhereSchemaFor(Job)) where?: Where<Job>,
  ): Promise<Count> {
    return this.freelancerRepository.jobs(id).patch(job, where);
  }

  @del('/freelancers/{id}/jobs', {
    responses: {
      '200': {
        description: 'Freelancer.Job DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Job)) where?: Where<Job>,
  ): Promise<Count> {
    return this.freelancerRepository.jobs(id).delete(where);
  }
}
