import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PoolUserModule } from './pool-user/pool-user.module';
import * as dotenv from 'dotenv';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    AuthModule,
    PoolUserModule,
  ],
})
export class AppModule {}
