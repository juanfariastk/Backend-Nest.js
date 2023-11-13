import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';
import { ImagePrismaRepository } from './repositories/prisma/image-prisma.repository';
@Injectable()
export class ImagesService {
  constructor(private imageRepository:ImagePrismaRepository){}
  create(createImageDto: CreateImageDto) {
    const newImage = this.imageRepository.create(createImageDto);
    return newImage;
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  findManyByAnouncementID(anouncementID: number): Promise<Image[]> {
    return this.imageRepository.findManyByAnouncementID(anouncementID);
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    const updatedImage = this.imageRepository.update(id, updateImageDto);
    return updatedImage;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
