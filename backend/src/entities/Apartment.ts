import { Column, Entity } from 'typeorm';
import { EntityWithIdAndTimestamps } from './EntityWithIdAndTimestamps';

@Entity()
export class Apartment extends EntityWithIdAndTimestamps {
  @Column()
  apartmentDescription!: string;

  @Column('smallint')
  roomCount!: number;

  @Column('decimal')
  surfaceArea!: number;

  @Column()
  streetAddress!: string;

  @Column()
  postalCode!: string;

  @Column()
  postDistrict!: string;
}
