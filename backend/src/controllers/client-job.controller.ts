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
import {Client, Job} from '../models';
import {ClientRepository} from '../repositories';

@authenticate('jwt')
export class ClientJobController {
  constructor(
    @repository(ClientRepository) protected clientRepository: ClientRepository,
  ) {}

  @get('/clients/{id}/jobs', {
    responses: {
      '200': {
        description: 'Array of Client has many Job',
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
    return this.clientRepository.jobs(id).find(filter);
  }

  @post('/clients/{id}/jobs', {
    responses: {
      '200': {
        description: 'Client model instance',
        content: {'application/json': {schema: getModelSchemaRef(Job)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Client.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Job, {
            title: 'NewJobInClient',
            exclude: ['id'],
            optional: ['clientId'],
          }),
        },
      },
    })
    job: Omit<Job, 'id'>,
  ): Promise<Job> {
    return this.clientRepository.jobs(id).create(job);
  }

  @patch('/clients/{id}/jobs', {
    responses: {
      '200': {
        description: 'Client.Job PATCH success count',
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
    return this.clientRepository.jobs(id).patch(job, where);
  }

  @del('/clients/{id}/jobs', {
    responses: {
      '200': {
        description: 'Client.Job DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Job)) where?: Where<Job>,
  ): Promise<Count> {
    return this.clientRepository.jobs(id).delete(where);
  }
}
