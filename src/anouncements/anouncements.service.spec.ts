import { Test, TestingModule } from '@nestjs/testing';
import { AnouncementsService } from './anouncements.service';

describe('AnouncementsService', () => {
  let service: AnouncementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnouncementsService],
    }).compile();

    service = module.get<AnouncementsService>(AnouncementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
