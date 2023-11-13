import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from "src/database/prisma.service";
import { CreateImageDto } from 'src/images/dto/create-image.dto';
import { UpdateImageDto } from 'src/images/dto/update-image.dto';
import { Image } from 'src/images/entities/image.entity';

@Injectable()
export class ImagePrismaRepository{
    constructor (private prismaSvc:PrismaService){}

    async create(imageData:CreateImageDto){
        return this.prismaSvc.image.create({data:imageData});
    }

    async findManyByAnouncementID(anouncementID: number): Promise<Image[]> {
        const images = await this.prismaSvc.image.findMany({
          where: { anouncement_id: anouncementID },
        });
    
        if (!images || images.length === 0) {
          throw new NotFoundException('No images found for the specified announcement.');
        }
    
        return images;
      }

    async update(id:number, newImageData:UpdateImageDto){
        const updatedImage = await this.prismaSvc.image.update({where:{id}, data:{...newImageData}});
        return plainToInstance(Image,updatedImage);
    }
}

