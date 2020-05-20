import {
  Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate,
} from 'typeorm';
import { hashSync } from 'bcrypt';

@Entity()
export class User {
  get cryptedPassword(): string {
    return this.password;
  }

  constructor(username: string, password: string, name: string) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.isActive = true;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username: string;

  @Column()
  private password: string;

  @Column()
  name: string;

  @Column()
  isActive: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    if (this.password) {
      this.password = hashSync(this.password, 10);
    }
  }
}
