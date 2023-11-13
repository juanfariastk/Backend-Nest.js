import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserPrismaRepository } from 'src/users/repositories/prisma/user-prisma.repository';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { AddressPrismaRepository } from './repositories/prisma/address-prisma.repository';

@Module({
  controllers: [AddressesController],
  providers: [AddressesService, PrismaService, AddressPrismaRepository, UserPrismaRepository]
})
export class AddressesModule {}
