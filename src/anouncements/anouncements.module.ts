import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AnouncementsController } from './anouncements.controller';
import { AnouncementsService } from './anouncements.service';
import { AnouncementsPrismaRepository } from './repository/prisma/anouncements-prisma.repository';

@Module({
  controllers: [AnouncementsController],
  providers: [AnouncementsService, PrismaService,AnouncementsPrismaRepository],
})
export class AnouncementsModule {}
