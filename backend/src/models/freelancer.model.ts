import {Entity, model, property, hasMany} from '@loopback/repository';
import {Job} from './job.model';

@model()
export class Freelancer extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @hasMany(() => Job)
  jobs: Job[];

  constructor(data?: Partial<Freelancer>) {
    super(data);
  }
}

export interface FreelancerRelations {
  // describe navigational properties here
}

export type FreelancerWithRelations = Freelancer & FreelancerRelations;
