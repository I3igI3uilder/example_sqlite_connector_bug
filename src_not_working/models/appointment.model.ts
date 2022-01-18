import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Doctor} from './doctor.model';
import {Patient} from './patient.model';

@model()
export class Appointment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @property({
    type: 'string',
    required: true,
  })
  date: string;

  @belongsTo(() => Doctor)
  doctorId: number;

  @belongsTo(() => Patient)
  patientId: number;

  constructor(data?: Partial<Appointment>) {
    super(data);
  }
}

export interface AppointmentRelations {
  // describe navigational properties here
}

export type AppointmentWithRelations = Appointment & AppointmentRelations;
