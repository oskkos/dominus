import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class EventLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  entity!: string;

  @Column()
  entityId!: number;

  @Column()
  event!: string;

  @Column({ type: 'json' })
  eventData!: {};

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  constructor(entity: string, entityId: number, event: string, eventData: {}) {
    this.entity = entity;
    this.entityId = entityId;
    this.event = event;
    this.eventData = eventData;
  }

  static UserAdded(
    userId: number,
    data: { username: string; password: string; name: string },
  ): EventLog {
    return new EventLog('User', userId, 'UserAdded', data);
  }

  static UserPasswordChanged(
    userId: number,
    data: { password: string },
  ): EventLog {
    return new EventLog('User', userId, 'UserPasswordChanged', data);
  }
}