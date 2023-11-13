import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { ImagePrismaRepository } from './repositories/prisma/image-prisma.repository';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, PrismaService, ImagePrismaRepository],
})
export class ImagesModule {}
