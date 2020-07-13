import { User } from './User';

/**
 * Add apartment
 *
 * @tsoaModel
 * @example {
 *   "apartmentDescription": "2h+k+ph+parv.",
 *   "roomCount": 2,
 *   "surfaceArea": 54.5,
 *   "streetAddress": "Mallikatu 27 A 8",
 *   "postalCode": "33100",
 *   "postDistrict": "Tampere"
 * }
 */
export interface AddApartment {
  apartmentDescription: string;
  /**
   * @isInt Room count value must be integer
   */
  roomCount: number;
  surfaceArea: number;
  streetAddress: string;
  postalCode: string;
  postDistrict: string;
}

/**
 * Apartment details
 *
 * @tsoaModel
 * @example {
 *   "id": 82,
 *   "apartmentDescription": "2h+k+ph+parv.",
 *   "coOwners": [{
 *     "id": 75,
 *     "username": "arokman",
 *     "name: "Annika Rökman"
 *   }],
 *   "owner": {
 *     "id": 82,
 *     "username": "oskkos",
 *     "name": "Oskari Kosonen"
 *   },
 *   "roomCount": 2,
 *   "surfaceArea": 54.5,
 *   "streetAddress": "Mallikatu 27 A 8",
 *   "postalCode": "33100",
 *   "postDistrict": "Tampere"
 * }
 */
export interface Apartment extends AddApartment {
  /**
   * @isInt id value must be integer
   */
  id: number;
  coOwners: User[];
  owner: User;
}
