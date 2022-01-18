import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Appointment,
  Patient,
} from '../models';
import {AppointmentRepository} from '../repositories';

export class AppointmentPatientController {
  constructor(
    @repository(AppointmentRepository)
    public appointmentRepository: AppointmentRepository,
  ) { }

  @get('/appointments/{id}/patient', {
    responses: {
      '200': {
        description: 'Patient belonging to Appointment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Patient)},
          },
        },
      },
    },
  })
  async getPatient(
    @param.path.number('id') id: typeof Appointment.prototype.id,
  ): Promise<Patient> {
    return this.appointmentRepository.patient(id);
  }
}
