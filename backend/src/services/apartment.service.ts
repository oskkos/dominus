import { AddApartment, Apartment } from '../models/Apartment';
import * as ApartmentRepo from '../repositories/apartment.repository';

export async function addApartment(
  apartment: AddApartment,
  ownerId: number,
): Promise<Apartment> {
  return ApartmentRepo.addApartment(apartment, ownerId);
}
export async function getApartments(ownerId: number): Promise<Apartment[]> {
  return ApartmentRepo.getApartments(ownerId);
}
export async function addCoOwner(
  apartmentId: number,
  ownerId: number,
  coOwnerId: number,
): Promise<void> {
  return ApartmentRepo.addCoOwner(apartmentId, ownerId, coOwnerId).catch(
    (e) => {
      throw e;
    },
  );
}
