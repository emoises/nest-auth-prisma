import { Test, TestingModule } from '@nestjs/testing';
import { PoolUserService } from './pool-user.service';

describe('PoolUserService', () => {
  let service: PoolUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoolUserService],
    }).compile();

    service = module.get<PoolUserService>(PoolUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
