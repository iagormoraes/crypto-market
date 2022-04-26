import { Test, TestingModule } from '@nestjs/testing';
import { UsersSpreadService } from './users-spread.service';

describe('UsersSpreadService', () => {
  let service: UsersSpreadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersSpreadService],
    }).compile();

    service = module.get<UsersSpreadService>(UsersSpreadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
