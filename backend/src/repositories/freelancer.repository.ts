import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Freelancer, FreelancerRelations, Job} from '../models';
import {JobRepository} from './job.repository';

export class FreelancerRepository extends DefaultCrudRepository<
  Freelancer,
  typeof Freelancer.prototype.id,
  FreelancerRelations
> {

  public readonly jobs: HasManyRepositoryFactory<Job, typeof Freelancer.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('JobRepository') protected jobRepositoryGetter: Getter<JobRepository>,
  ) {
    super(Freelancer, dataSource);
    this.jobs = this.createHasManyRepositoryFactoryFor('jobs', jobRepositoryGetter,);
    this.registerInclusionResolver('jobs', this.jobs.inclusionResolver);
  }
}
