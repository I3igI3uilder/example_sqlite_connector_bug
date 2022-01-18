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
  Doctor,
} from '../models';
import {AppointmentRepository} from '../repositories';

export class AppointmentDoctorController {
  constructor(
    @repository(AppointmentRepository)
    public appointmentRepository: AppointmentRepository,
  ) { }

  @get('/appointments/{id}/doctor', {
    responses: {
      '200': {
        description: 'Doctor belonging to Appointment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Doctor)},
          },
        },
      },
    },
  })
  async getDoctor(
    @param.path.number('id') id: typeof Appointment.prototype.id,
  ): Promise<Doctor> {
    return this.appointmentRepository.doctor(id);
  }
}
