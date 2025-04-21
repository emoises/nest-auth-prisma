import { Module } from '@nestjs/common';
import { PoolUserService } from './pool-user.service';
import { PoolUserController } from './pool-user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PoolUser, PoolUserSchema } from './schemas/pool-user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PoolUser.name, schema: PoolUserSchema },
    ]),
  ],
  providers: [PoolUserService],
  controllers: [PoolUserController],
})
export class PoolUserModule {}
