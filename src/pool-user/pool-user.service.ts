import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PoolUser } from './schemas/pool-user.schema';
import { CreatePoolUserDto } from './dto/create-pool-user.dto';
import { Model } from 'mongoose';

@Injectable()
export class PoolUserService {
  constructor(
    @InjectModel(PoolUser.name) private readonly poolUserModel: Model<PoolUser>,
  ) {}

  async create(createPoolUserDto: CreatePoolUserDto): Promise<PoolUser> {
    const userData = {
      ...createPoolUserDto,
      createdAt: new Date(),
    };

    const createdUser = new this.poolUserModel(userData);
    return createdUser.save();
  }
}
