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
  Freelancer,
} from '../models';
import {JobRepository} from '../repositories';

export class JobFreelancerController {
  constructor(
    @repository(JobRepository)
    public jobRepository: JobRepository,
  ) { }

  @get('/jobs/{id}/freelancer', {
    responses: {
      '200': {
        description: 'Freelancer belonging to Job',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Freelancer)},
          },
        },
      },
    },
  })
  async getFreelancer(
    @param.path.string('id') id: typeof Job.prototype.id,
  ): Promise<Freelancer> {
    return this.jobRepository.freelancer(id);
  }
}
