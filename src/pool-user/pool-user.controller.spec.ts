import { Test, TestingModule } from '@nestjs/testing';
import { PoolUserController } from './pool-user.controller';

describe('PoolUserController', () => {
  let controller: PoolUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoolUserController],
    }).compile();

    controller = module.get<PoolUserController>(PoolUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
