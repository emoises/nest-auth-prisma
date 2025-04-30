import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PoolUserService } from './pool-user.service';
import { CreatePoolUserDto } from './dto/create-pool-user.dto';
import { PoolUser } from './schemas/pool-user.schema';
import { FindPoolUsersDto } from './dto/find-pool-users-dto';

@Controller('pool-user')
export class PoolUserController {
  constructor(private readonly poolUserService: PoolUserService) {}

  @Post()
  async create(
    @Body() createPoolUserDto: CreatePoolUserDto,
  ): Promise<PoolUser> {
    console.trace('🧭 create() foi chamado');
    return this.poolUserService.create(createPoolUserDto);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(
    @Query() findPoolUsersDto: FindPoolUsersDto,
  ): Promise<PoolUser[]> {
    return this.poolUserService.findAll(findPoolUsersDto);
  }
}
