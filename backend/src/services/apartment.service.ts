import { Apartment } from '../models/Apartment';
import * as ApartmentRepo from '../repositories/apartment.repository';

export async function addApartment(apartment: Apartment): Promise<Apartment> {
  return ApartmentRepo.addApartment(apartment);
}
