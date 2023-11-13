import { Test, TestingModule } from '@nestjs/testing';
import { AnouncementsController } from './anouncements.controller';
import { AnouncementsService } from './anouncements.service';

describe('AnouncementsController', () => {
  let controller: AnouncementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnouncementsController],
      providers: [AnouncementsService],
    }).compile();

    controller = module.get<AnouncementsController>(AnouncementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
