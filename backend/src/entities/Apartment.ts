import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Apartment {
  @PrimaryGeneratedColumn()
  id!: number;

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

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
}
