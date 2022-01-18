import {Entity, model, property, hasMany} from '@loopback/repository';
import {Doctor} from './doctor.model';
import {Appointment} from './appointment.model';

@model()
export class Patient extends Entity {
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
  pat_name: string;

  @hasMany(() => Doctor, {
    through: {
      model: () => Appointment,
      keyFrom: 'patientId',
      keyTo: 'doctorId',
    }
  })
  doctors: Doctor[];

  constructor(data?: Partial<Patient>) {
    super(data);
  }
}

export interface PatientRelations {
  // describe navigational properties here
}

export type PatientWithRelations = Patient & PatientRelations;
