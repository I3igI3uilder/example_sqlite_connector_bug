import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Patient,
Appointment,
Doctor,
} from '../models';
import {PatientRepository} from '../repositories';

export class PatientDoctorController {
  constructor(
    @repository(PatientRepository) protected patientRepository: PatientRepository,
  ) { }

  @get('/patients/{id}/doctors', {
    responses: {
      '200': {
        description: 'Array of Patient has many Doctor through Appointment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Doctor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Doctor>,
  ): Promise<Doctor[]> {
    return this.patientRepository.doctors(id).find(filter);
  }

  @post('/patients/{id}/doctors', {
    responses: {
      '200': {
        description: 'create a Doctor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Doctor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Patient.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Doctor, {
            title: 'NewDoctorInPatient',
            exclude: ['id'],
          }),
        },
      },
    }) doctor: Omit<Doctor, 'id'>,
  ): Promise<Doctor> {
    return this.patientRepository.doctors(id).create(doctor);
  }

  @patch('/patients/{id}/doctors', {
    responses: {
      '200': {
        description: 'Patient.Doctor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Doctor, {partial: true}),
        },
      },
    })
    doctor: Partial<Doctor>,
    @param.query.object('where', getWhereSchemaFor(Doctor)) where?: Where<Doctor>,
  ): Promise<Count> {
    return this.patientRepository.doctors(id).patch(doctor, where);
  }

  @del('/patients/{id}/doctors', {
    responses: {
      '200': {
        description: 'Patient.Doctor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Doctor)) where?: Where<Doctor>,
  ): Promise<Count> {
    return this.patientRepository.doctors(id).delete(where);
  }
}
