// import { morphism, Schema } from 'morphism';
import { getConnection } from 'typeorm';
import { Apartment } from '../models/Apartment';
import { Apartment as EntityApartment } from '../entities/Apartment';
import { User as EntityUser } from '../entities/User';

/*
const schema: Schema<Apartment, EntityApartment> = {
  apartmentDescription: 'apartmentDescription',
  roomCount: 'roomCount',
  surfaceArea: 'surfaceArea',
  streetAddress: 'streetAddress',
  postalCode: 'postalCode',
  postDistrict: 'postDistrict',
  owner: ?,
  coOwners: ?[],
};
 */

export async function addApartment(apartment: Apartment): Promise<Apartment> {
  const userRepository = getConnection().getRepository(EntityUser);
  const owner = await userRepository.findOne({ id: apartment.owner.id });
  if (!owner) {
    throw new Error('Failed to open owner object');
  }

  return getConnection().transaction(async (transactionalEntityManager) => {
    const entityAptmt = new EntityApartment({
      ...apartment,
      owner,
      coOwners: [] /* FIXME */,
    });
    const apt = await transactionalEntityManager.save(entityAptmt);
    /* await transactionalEntityManager.save(
      EventLog.UserAdded(apt.id, { username, password: '*****', name }),
    ); */
    // TODO: Use morphism
    return apt;
  });
}
