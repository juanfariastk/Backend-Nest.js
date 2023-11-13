import { Body, Controller, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/authorization/jwt-auth.guard';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('adresses')
export class AddressesController {
  constructor(private readonly adressesService: AddressesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  create(@Param('userId') userId: number, @Body() createAddressDto: CreateAddressDto) {
    return this.adressesService.create(userId, createAddressDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Request() request, @Body() updateAdressDto:UpdateAddressDto ) {
    return this.adressesService.update(parseInt(request.user.id), updateAdressDto);
  }
}
