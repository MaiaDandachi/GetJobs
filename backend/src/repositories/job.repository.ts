import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Job, JobRelations, Client, Freelancer} from '../models';
import {ClientRepository} from './client.repository';
import {FreelancerRepository} from './freelancer.repository';

export class JobRepository extends DefaultCrudRepository<
  Job,
  typeof Job.prototype.id,
  JobRelations
> {

  public readonly client: BelongsToAccessor<Client, typeof Job.prototype.id>;

  public readonly freelancer: BelongsToAccessor<Freelancer, typeof Job.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>, @repository.getter('FreelancerRepository') protected freelancerRepositoryGetter: Getter<FreelancerRepository>,
  ) {
    super(Job, dataSource);
    this.freelancer = this.createBelongsToAccessorFor('freelancer', freelancerRepositoryGetter,);
    this.registerInclusionResolver('freelancer', this.freelancer.inclusionResolver);
    this.client = this.createBelongsToAccessorFor('client', clientRepositoryGetter,);
    this.registerInclusionResolver('client', this.client.inclusionResolver);
  }
}
