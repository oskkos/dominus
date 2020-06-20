import { Column, Entity } from 'typeorm';
import { EntityWithIdAndTimestamps } from './EntityWithIdAndTimestamps';

@Entity()
export class EventLog extends EntityWithIdAndTimestamps {
  @Column()
  entity!: string;

  @Column()
  entityId!: number;

  @Column()
  userId!: number;

  @Column()
  event!: string;

  @Column({ type: 'json' })
  eventData!: {};

  constructor(
    entity: string,
    entityId: number,
    userId: number,
    event: string,
    eventData: {},
  ) {
    super();
    this.entity = entity;
    this.entityId = entityId;
    this.userId = userId;
    this.event = event;
    this.eventData = eventData;
  }

  static UserAdded(
    userId: number,
    data: { username: string; password: string; name: string },
  ): EventLog {
    return new EventLog('User', userId, userId, 'UserAdded', data);
  }

  static UserPasswordChanged(
    userId: number,
    data: { password: string },
  ): EventLog {
    return new EventLog('User', userId, userId, 'UserPasswordChanged', data);
  }

  static ApartmentAdded(
    userId: number,
    apartmentId: number,
    data: { apartment: {} },
  ): EventLog {
    return new EventLog(
      'Apartment',
      apartmentId,
      userId,
      'ApartmentAdded',
      data,
    );
  }

  static CoOwnerAdded(
    userId: number,
    data: { apartmentId: number; coOwnerId: number },
  ): EventLog {
    return new EventLog(
      'Apartment',
      data.apartmentId,
      userId,
      'CoOwnerAdded',
      data,
    );
  }
}
