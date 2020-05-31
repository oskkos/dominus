import { getConnection } from 'typeorm';
import { Apartment } from '../models/Apartment';
import { Apartment as EntityApartment } from '../entities/Apartment';
import { User as EntityUser } from '../entities/User';
import { EventLog } from '../entities/EventLog';

export async function addApartment(
  apartment: Apartment,
  ownerId: number,
): Promise<Apartment> {
  if (apartment.id) {
    throw new Error('Apartment already added!');
  }
  const userRepository = getConnection().getRepository(EntityUser);
  const owner = await userRepository.findOne({ id: ownerId });
  if (!owner) {
    throw new Error('Failed to open owner object');
  }

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
