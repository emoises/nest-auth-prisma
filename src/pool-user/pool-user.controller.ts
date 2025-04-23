import { Body, Controller, Get, Post } from '@nestjs/common';
import { PoolUserService } from './pool-user.service';
import { CreatePoolUserDto } from './dto/create-pool-user.dto';
import { PoolUser } from './schemas/pool-user.schema';

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
  async findAll(): Promise<PoolUser[]> {
    return this.poolUserService.findAll();
  }
}
