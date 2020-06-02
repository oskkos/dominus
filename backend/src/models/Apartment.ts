/**
 * Apartment details
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
export interface Apartment {
  /**
   * @isInt Integer
   */
  apartmentDescription: string;
  /**
   * @isInt Integer
   */
  roomCount: number;
  surfaceArea: number;
  streetAddress: string;
  postalCode: string;
  postDistrict: string;
}
