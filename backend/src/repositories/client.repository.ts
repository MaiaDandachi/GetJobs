import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Client, ClientRelations, Job} from '../models';
import {JobRepository} from './job.repository';

export class ClientRepository extends DefaultCrudRepository<
  Client,
  typeof Client.prototype.id,
  ClientRelations
> {

  public readonly jobs: HasManyRepositoryFactory<Job, typeof Client.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('JobRepository') protected jobRepositoryGetter: Getter<JobRepository>,
  ) {
    super(Client, dataSource);
    this.jobs = this.createHasManyRepositoryFactoryFor('jobs', jobRepositoryGetter,);
    this.registerInclusionResolver('jobs', this.jobs.inclusionResolver);
  }
}
