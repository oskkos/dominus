import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { EntityWithIdAndTimestamps } from './EntityWithIdAndTimestamps';
import { User } from './User';

@Entity()
export class Apartment extends EntityWithIdAndTimestamps {
  constructor(data: {
    apartmentDescription: string;
    roomCount: number;
    surfaceArea: number;
    streetAddress: string;
    postalCode: string;
    postDistrict: string;
    owner: User;
    coOwners: User[];
  }) {
    super();
    Object.assign(this, data);
  }

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

  @ManyToOne(() => User)
  owner!: User;

  @ManyToMany(() => User)
  @JoinTable()
  coOwners!: User[];
}
