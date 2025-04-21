import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PoolUser {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  activityType: string;

  @Prop()
  daysOfActivity: string;

  @Prop({ required: true })
  createdAt: Date;
}

export const PoolUserSchema = SchemaFactory.createForClass(PoolUser);
