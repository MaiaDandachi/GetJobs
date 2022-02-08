import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Client} from './client.model';
import {Freelancer} from './freelancer.model';

@model()
export class Job extends Entity {
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
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;
  @property({
    type: 'string',
    required: true,
  })
  status: string;
  @belongsTo(() => Client)
  clientId: string;

  @belongsTo(() => Freelancer)
  freelancerId: string;

  constructor(data?: Partial<Job>) {
    super(data);
  }
}

export interface JobRelations {
  // describe navigational properties here
}

export type JobWithRelations = Job & JobRelations;
