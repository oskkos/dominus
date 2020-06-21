import { getConnection, getRepository } from 'typeorm';
import { AddApartment, Apartment } from '../models/Apartment';
import { Apartment as EntityApartment } from '../entities/Apartment';
import { User as EntityUser } from '../entities/User';
import { EventLog } from '../entities/EventLog';
import { ForbiddenError } from '../errors/ForbiddenError';
import { ConflictError } from '../errors/ConflictError';
import { apartmentMorph } from './morphism';

export async function addApartment(
  apartment: AddApartment,
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
      EventLog.ApartmentAdded(ownerId, apt.id, { apartment }),
    );

    return apartmentMorph(apt);
  });
}

export async function getApartments(ownerId: number): Promise<Apartment[]> {
  const query = getRepository(EntityApartment)
    .createQueryBuilder('apartment')
    .leftJoinAndSelect('apartment.owner', 'owner')
    .leftJoinAndSelect('apartment.coOwners', 'coOwners')
    .where('owner.id = :ownerId', { ownerId })
    .orWhere('coOwners.id = :coOwnerid', { coOwnerid: ownerId });
  const apartments = await query.getMany();

  return apartmentMorph(apartments);
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
