import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Job,
  Client,
} from '../models';
import {JobRepository} from '../repositories';

export class JobClientController {
  constructor(
    @repository(JobRepository)
    public jobRepository: JobRepository,
  ) { }

  @get('/jobs/{id}/client', {
    responses: {
      '200': {
        description: 'Client belonging to Job',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Client)},
          },
        },
      },
    },
  })
  async getClient(
    @param.path.string('id') id: typeof Job.prototype.id,
  ): Promise<Client> {
    return this.jobRepository.client(id);
  }
}
