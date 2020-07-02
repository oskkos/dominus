import { morphism, StrictSchema } from 'morphism';
import { Apartment as ModelApartment } from '../models/Apartment';
import { Apartment as EntityApartment } from '../entities/Apartment';
import { User as ModelUser } from '../models/User';
import { User as EntityUser } from '../entities/User';

const entityUserToModelUserSchema: StrictSchema<ModelUser, EntityUser> = {
  id: 'id',
  username: 'username',
  name: 'name',
};
export const userMorph = morphism(entityUserToModelUserSchema);

const entityApartmentToModelApartmentSchema: StrictSchema<
  ModelApartment,
  EntityApartment
> = {
  id: 'id',
  apartmentDescription: 'apartmentDescription',
  postDistrict: 'postDistrict',
  postalCode: 'postalCode',
  roomCount: 'roomCount',
  streetAddress: 'streetAddress',
  surfaceArea: 'surfaceArea',
  coOwners: (apt) => userMorph(apt.coOwners),
  owner: (apt) => userMorph(apt.owner),
};
export const apartmentMorph = morphism(entityApartmentToModelApartmentSchema);
