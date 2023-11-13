import { Injectable } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { CreateAddressDto } from 'src/adresses/dto/create-address.dto';
import { UpdateAddressDto } from 'src/adresses/dto/update-address.dto';
import { Adress } from 'src/adresses/entities/adress.entity';
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class AddressPrismaRepository{
    constructor (private prismaSvc:PrismaService){}

    async create(addressData: CreateAddressDto): Promise<Adress> {
        const address = plainToClass(Adress, addressData);
        return this.prismaSvc.address.create({
          data: address,
        });
      }

    async update(userId:number, newAddressData:UpdateAddressDto){
        const updatedAddress = await this.prismaSvc.address.update({where:{user_id:userId}, data:{...newAddressData}});
        return plainToInstance(Adress,updatedAddress);
    }
}