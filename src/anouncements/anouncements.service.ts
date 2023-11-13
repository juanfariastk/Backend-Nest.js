import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAnouncementDto } from './dto/create-anouncement.dto';
import { UpdateAnouncementDto } from './dto/update-anouncement.dto';
import { AnouncementsPrismaRepository } from './repository/prisma/anouncements-prisma.repository';

@Injectable()
export class AnouncementsService {
  constructor(private anouncementRepository: AnouncementsPrismaRepository){}
  async create(createAnouncementDto: CreateAnouncementDto, userId:string) {
    const newAnouncement = await this.anouncementRepository.create(createAnouncementDto, userId);
    return newAnouncement;
  }

  async findAll() {
    const allAnouncements = await this.anouncementRepository.findAll();
    return allAnouncements;
  }

  async findOne(id: number) {
    const findedAnouncement = await this.anouncementRepository.findOne(id);
    if(!findedAnouncement){
      throw new NotFoundException('Not found.');
    };
    return findedAnouncement;
  }

  async findManyByAnouncementUserId(userID:number){
    const allAnouncements = await this.anouncementRepository.findManyByAnouncementUserId(userID);
    if(!allAnouncements){
      throw new NotFoundException('Not found.');
    }
    return allAnouncements;
  }

  async update(id: number, updateAnouncementDto: UpdateAnouncementDto, userId:number) {
    const refAnouncement = await this.findOne(id);
    if(userId != refAnouncement.user_id){
      throw new UnauthorizedException("This user not have a sufficient permission.");
    }
    const updatedAnouncement = await this.anouncementRepository.update(id, updateAnouncementDto);
    return updatedAnouncement;
  }

  async remove(id: number,userId:number) {
    const refAnouncement = await this.findOne(id);
    if(userId != refAnouncement.user_id){
      throw new UnauthorizedException("This user not have a sufficient permission.");
    }
    await this.anouncementRepository.delete(id);
  }
}
