import { Test, TestingModule } from '@nestjs/testing';
import { AdressesController } from './addresses.controller';
import { AdressesService } from './addresses.service';

describe('AdressesController', () => {
  let controller: AdressesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdressesController],
      providers: [AdressesService],
    }).compile();

    controller = module.get<AdressesController>(AdressesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
