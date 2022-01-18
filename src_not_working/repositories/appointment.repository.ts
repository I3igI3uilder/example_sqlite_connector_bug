import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SqliteDsDataSource} from '../datasources';
import {Appointment, AppointmentRelations, Doctor, Patient} from '../models';
import {DoctorRepository} from './doctor.repository';
import {PatientRepository} from './patient.repository';

export class AppointmentRepository extends DefaultCrudRepository<
  Appointment,
  typeof Appointment.prototype.id,
  AppointmentRelations
> {

  public readonly doctor: BelongsToAccessor<Doctor, typeof Appointment.prototype.id>;

  public readonly patient: BelongsToAccessor<Patient, typeof Appointment.prototype.id>;

  constructor(
    @inject('datasources.sqliteDS') dataSource: SqliteDsDataSource, @repository.getter('DoctorRepository') protected doctorRepositoryGetter: Getter<DoctorRepository>, @repository.getter('PatientRepository') protected patientRepositoryGetter: Getter<PatientRepository>,
  ) {
    super(Appointment, dataSource);
    this.patient = this.createBelongsToAccessorFor('patient', patientRepositoryGetter,);
    this.registerInclusionResolver('patient', this.patient.inclusionResolver);
    this.doctor = this.createBelongsToAccessorFor('doctor', doctorRepositoryGetter,);
    this.registerInclusionResolver('doctor', this.doctor.inclusionResolver);
  }
}
