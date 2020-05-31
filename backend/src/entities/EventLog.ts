import { Column, Entity } from 'typeorm';
import { EntityWithIdAndTimestamps } from './EntityWithIdAndTimestamps';

@Entity()
export class EventLog extends EntityWithIdAndTimestamps {
  @Column()
  entity!: string;

  @Column()
  entityId!: number;

  @Column()
  event!: string;

  @Column({ type: 'json' })
  eventData!: {};

  constructor(entity: string, entityId: number, event: string, eventData: {}) {
    super();
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

  static ApartmentAdded(
    userId: number,
    data: { apartment: {}; ownerId: number },
  ): EventLog {
    return new EventLog('Apartment', userId, 'ApartmentAdded', data);
  }
}
