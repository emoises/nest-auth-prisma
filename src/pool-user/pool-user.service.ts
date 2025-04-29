import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PoolUser } from './schemas/pool-user.schema';
import { CreatePoolUserDto } from './dto/create-pool-user.dto';
import { Model } from 'mongoose';
import { PoolUserResponseDto } from './dto/pool-user-response.dto';
import { FindPoolUsersDto } from './dto/find-pool-users-dto';

@Injectable()
export class PoolUserService {
  constructor(
    @InjectModel(PoolUser.name) private readonly poolUserModel: Model<PoolUser>,
  ) {}

  async create(createPoolUserDto: CreatePoolUserDto): Promise<PoolUser> {
    console.trace('🧭 create() foi chamado');
    console.log('🔥 Entrou no método create do PoolUserService');

    const userData = {
      ...createPoolUserDto,
      createdAt: new Date().toISOString(),
    };
    console.log(userData);
    const createdUser = new this.poolUserModel(userData);
    const saved = await createdUser.save();
    return new PoolUserResponseDto(saved);
  }

  async findAll({ managerEmail }: FindPoolUsersDto): Promise<PoolUser[]> {
    console.log('🔎 Find manager email: ');
    console.log(managerEmail);
    const users = await this.poolUserModel.find({ managerEmail }).exec();

    return users.map((user) => new PoolUserResponseDto(user));
  }
}
