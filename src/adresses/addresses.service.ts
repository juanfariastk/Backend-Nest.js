import { Injectable, NotFoundException } from '@nestjs/common';
import { UserPrismaRepository } from 'src/users/repositories/prisma/user-prisma.repository';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Adress } from './entities/adress.entity';
import { AddressPrismaRepository } from './repositories/prisma/address-prisma.repository';
@Injectable()
export class AddressesService {
  constructor(private addressRepository:AddressPrismaRepository, private userRepository:UserPrismaRepository){}

  async create(userId: number, createAddressDto: CreateAddressDto): Promise<Adress> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const addressData = {
      ...createAddressDto,
      user_id: userId, 
    };
    return this.addressRepository.create(addressData);
  }

  findAll() {
    return `This action returns all adresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adress`;
  }

  async update(userId: number, updateAdressDto: UpdateAddressDto) {
    const updatedAddress = await this.addressRepository.update(userId, updateAdressDto);
    return updatedAddress;
  }

  remove(id: number) {
    return `This action removes a #${id} adress`;
  }
}
