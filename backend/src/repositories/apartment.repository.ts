import { getConnection } from 'typeorm';
import { Apartment } from '../models/Apartment';
import { Apartment as EntityApartment } from '../entities/Apartment';
import { User as EntityUser } from '../entities/User';
import { EventLog } from '../entities/EventLog';

export async function addApartment(
  apartment: Apartment,
  ownerId: number,
): Promise<Apartment> {
  const userRepository = getConnection().getRepository(EntityUser);
  const owner = await userRepository.findOneOrFail({ id: ownerId });

  return getConnection().transaction(async (transactionalEntityManager) => {
    const entityAptmt = new EntityApartment(
      apartment.apartmentDescription,
      apartment.roomCount,
      apartment.surfaceArea,
      apartment.streetAddress,
      apartment.postalCode,
      apartment.postDistrict,
      owner,
      [],
    );
    const apt = await transactionalEntityManager.save(entityAptmt);
    await transactionalEntityManager.save(
      EventLog.ApartmentAdded(apt.id, { apartment, ownerId }),
    );

    // TODO: Convert to Model object
    return apt;
  });
}

export async function getApartments(ownerId: number): Promise<Apartment[]> {
  const apartments = await getConnection()
    .createQueryBuilder()
    .select('apartment')
    .from(EntityApartment, 'apartment')
    .leftJoinAndSelect(
      'apartment_co_owners_user',
      'coOwner',
      'coOwner.apartmentId = apartment.id',
    )
    .where('"ownerId" = :ownerId', { ownerId })
    .orWhere('"userId" = :coOwnerid', { coOwnerid: ownerId })
    .getMany();

  // TODO: Convert to Model objects
  return apartments;
}
