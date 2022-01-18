import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {SqliteDsDataSource} from '../datasources';
import {Patient, PatientRelations, Doctor, Appointment} from '../models';
import {AppointmentRepository} from './appointment.repository';
import {DoctorRepository} from './doctor.repository';

export class PatientRepository extends DefaultCrudRepository<
  Patient,
  typeof Patient.prototype.id,
  PatientRelations
> {

  public readonly doctors: HasManyThroughRepositoryFactory<Doctor, typeof Doctor.prototype.id,
          Appointment,
          typeof Patient.prototype.id
        >;

  constructor(
    @inject('datasources.sqliteDS') dataSource: SqliteDsDataSource, @repository.getter('AppointmentRepository') protected appointmentRepositoryGetter: Getter<AppointmentRepository>, @repository.getter('DoctorRepository') protected doctorRepositoryGetter: Getter<DoctorRepository>,
  ) {
    super(Patient, dataSource);
    this.doctors = this.createHasManyThroughRepositoryFactoryFor('doctors', doctorRepositoryGetter, appointmentRepositoryGetter,);
    this.registerInclusionResolver('doctors', this.doctors.inclusionResolver);
  }
}
