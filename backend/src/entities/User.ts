import { Entity, Column, BeforeInsert, BeforeUpdate, AfterLoad } from 'typeorm';
import { hashSync } from 'bcrypt';
import { EntityWithIdAndTimestamps } from './EntityWithIdAndTimestamps';

@Entity()
export class User extends EntityWithIdAndTimestamps {
  set password(value: string) {
    this.pwd = value;
  }

  get cryptedPassword(): string {
    return this.#cryptedPwd ?? '';
  }

  constructor(username: string, password: string, name: string) {
    super();
    this.username = username;
    this.pwd = password;
    this.name = name;
    this.isActive = true;
  }

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column()
  isActive: boolean;

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
