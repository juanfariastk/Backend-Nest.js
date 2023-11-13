import { Injectable } from "@nestjs/common";
import { CreateAnouncementDto } from "src/anouncements/dto/create-anouncement.dto";
import { UpdateAnouncementDto } from "src/anouncements/dto/update-anouncement.dto";
import { Anouncement } from "src/anouncements/entities/anouncement.entity";
import { PrismaService } from "src/database/prisma.service";

@Injectable()

export class AnouncementsPrismaRepository{
    constructor(private prismaSvc:PrismaService){}

    async create(anouncementData:CreateAnouncementDto, userId:string ){
        const createdAnouncement = new Anouncement();
        Object.assign(createdAnouncement, {...anouncementData});
        const finalAnouncement = await this.prismaSvc.anouncement.create({
            data:{
                brand:anouncementData.brand,
                model:anouncementData.model,
                year:anouncementData.year,
                fuel:anouncementData.fuel,
                mileage:anouncementData.mileage,
                color:anouncementData.color,
                fipe_price: anouncementData.fipe_price,
                price: anouncementData.price,
                description:anouncementData.description,
                cover_image: anouncementData.cover_image,
                user : { connect : {id:parseInt(userId)}}
            }
        })
        return finalAnouncement;
    }

    async findAll(){
        const allAnouncements = await this.prismaSvc.anouncement.findMany();
        return allAnouncements;
    }

    async findOne(anouncementId:number){
        const findedAnouncement = await this.prismaSvc.anouncement.findUnique({where:{id:anouncementId}});
        return findedAnouncement;
    }

    async findManyByAnouncementUserId(userId:number){
        const findedAllAnouncements = await this.prismaSvc.anouncement.findMany({where:{user_id:userId}});
        return findedAllAnouncements;
    }

    async update(anouncementId:number, anouncementNewData:UpdateAnouncementDto){
        const updatedAnouncement = await this.prismaSvc.anouncement.update({where:{id:anouncementId}, data:{...anouncementNewData}});
        return updatedAnouncement;
    }

    async delete(anouncementId:number){
        await this.prismaSvc.anouncement.delete({where:{id:anouncementId}});
    }

}