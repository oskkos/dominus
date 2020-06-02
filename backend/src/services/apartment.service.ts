import { Apartment } from '../models/Apartment';
import * as ApartmentRepo from '../repositories/apartment.repository';

export async function addApartment(
  apartment: Apartment,
  ownerId: number,
): Promise<Apartment> {
  return ApartmentRepo.addApartment(apartment, ownerId);
}
export async function getApartments(ownerId: number): Promise<Apartment[]> {
  return ApartmentRepo.getApartments(ownerId);
}
