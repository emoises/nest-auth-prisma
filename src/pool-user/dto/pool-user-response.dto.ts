import { DayAbbreviation } from '../enum/enum';
import { PoolUser } from '../schemas/pool-user.schema';

export class PoolUserResponseDto {
  id: string;
  name: string;
  status: string;
  activityType: string;
  daysOfActivity: DayAbbreviation[];
  managerId: string;
  createdAt: Date;

  constructor(poolUser: PoolUser) {
    this.name = poolUser.name;
    this.status = poolUser.status;
    this.activityType = poolUser.activityType;
    this.daysOfActivity = poolUser.daysOfActivity;
    this.managerId = poolUser.managerId;
    this.createdAt = poolUser.createdAt;
  }
}
