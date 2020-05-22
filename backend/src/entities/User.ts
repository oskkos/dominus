import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';

@Entity()
export class User {
  set password(value: string) {
    this.pwd = value;
  }

  get cryptedPassword(): string {
    return this.#cryptedPwd ?? '';
  }

  constructor(username: string, password: string, name: string) {
    this.username = username;
    this.pwd = password;
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

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @Column({ name: 'password' })
  private pwd: string;

  #cryptedPwd?: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    if (this.pwd) {
      this.pwd = hashSync(this.pwd, 10);
    }
  }

  @AfterLoad()
  handlePassword(): void {
    this.#cryptedPwd = this.pwd;
    this.pwd = '';
  }
}
