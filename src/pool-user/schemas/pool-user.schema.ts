import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DayAbbreviation } from '../enum/enum';

@Schema()
export class PoolUser {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  managerId: string;

  @Prop({ required: true })
  managerEmail: string;

  @Prop({ required: true })
  activityType: string;

  @Prop()
  daysOfActivity: DayAbbreviation[];

  @Prop({ required: true })
  createdAt: Date;
}

export const PoolUserSchema = SchemaFactory.createForClass(PoolUser);
