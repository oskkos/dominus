import {
  Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, AfterLoad,
} from 'typeorm';
import { hashSync } from 'bcrypt';

@Entity()
export class User {
  get cryptedPassword(): string {
    return this.#cryptedPwd ?? '';
  }

  constructor(username: string, password: string, name: string) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.isActive = true;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column()
  isActive: boolean;

  @Column({ name: 'password' })
  private password: string;

  #cryptedPwd?: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    if (this.password) {
      this.password = hashSync(this.password, 10);
    }
  }

  @AfterLoad()
  handlePassword(): void {
    this.#cryptedPwd = this.password;
    this.password = '';
  }
}
