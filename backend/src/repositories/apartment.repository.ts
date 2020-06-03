import { getConnection, getRepository } from 'typeorm';
import { Apartment } from '../models/Apartment';
import { Apartment as EntityApartment } from '../entities/Apartment';
import { User as EntityUser } from '../entities/User';
import { EventLog } from '../entities/EventLog';
import { ForbiddenError } from '../errors/ForbiddenError';
import { ConflictError } from '../errors/ConflictError';

export async function addApartment(
  apartment: Apartment,
  ownerId: number,
): Promise<Apartment> {
  const userRepository = getRepository(EntityUser);
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
export async function addCoOwner(
  apartmentId: number,
  ownerId: number,
  coOwnerId: number,
): Promise<void> {
  const apartmentRepository = getRepository(EntityApartment);
  const apartment = await apartmentRepository.findOneOrFail({
    id: apartmentId,
  });
  if (apartment.ownerId !== ownerId) {
    throw new ForbiddenError('Invalid owner for apartment!', { ownerId });
  }
  if (apartment.coOwners.map((u) => u.id).includes(coOwnerId)) {
    throw new ConflictError(`Co-owner already linked to apartment!`, {
      coOwnerId,
      apartmentId,
    });
  }
  const userRepository = getRepository(EntityUser);
  const coOwner = await userRepository.findOneOrFail(coOwnerId);
  const existingCoOwners = apartment.coOwners;
  apartment.coOwners = [...(existingCoOwners ?? []), coOwner];

  return getConnection().transaction(async (transactionalEntityManager) => {
    await transactionalEntityManager.save(apartment);
    await transactionalEntityManager.save(
      EventLog.CoOwnerAdded(ownerId, { apartmentId, coOwnerId }),
    );
  });
}
