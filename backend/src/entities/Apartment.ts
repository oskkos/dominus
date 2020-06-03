import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { EntityWithIdAndTimestamps } from './EntityWithIdAndTimestamps';
import { User } from './User';

@Entity()
@Index(['streetAddress', 'postalCode'], { unique: true })
export class Apartment extends EntityWithIdAndTimestamps {
  constructor(
    apartmentDescription: string,
    roomCount: number,
    surfaceArea: number,
    streetAddress: string,
    postalCode: string,
    postDistrict: string,
    owner: User,
    coOwners: User[],
  ) {
    super();

    this.apartmentDescription = apartmentDescription;
    this.roomCount = roomCount;
    this.surfaceArea = surfaceArea;
    this.streetAddress = streetAddress;
    this.postalCode = postalCode;
    this.postDistrict = postDistrict;
    this.owner = owner;
    this.coOwners = coOwners;
  }

  @Column()
  apartmentDescription: string;

  @Column('smallint')
  roomCount: number;

  @Column('decimal')
  surfaceArea: number;

  @Column()
  streetAddress: string;

  @Column()
  postalCode: string;

  @Column()
  postDistrict: string;

  @Column({ nullable: true })
  ownerId!: number;

  @ManyToOne(() => User)
  owner: User;

  @ManyToMany(() => User, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  coOwners: User[];
}
