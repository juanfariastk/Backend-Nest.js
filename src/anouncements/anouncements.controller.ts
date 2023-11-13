import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AnouncementAuthGuard } from 'src/authorization/anouncement-auth.guard';
import { JwtAuthGuard } from 'src/authorization/jwt-auth.guard';
import { AnouncementsService } from './anouncements.service';
import { CreateAnouncementDto } from './dto/create-anouncement.dto';
import { UpdateAnouncementDto } from './dto/update-anouncement.dto';

@Controller('anouncements')
export class AnouncementsController {
  constructor(private readonly anouncementsService: AnouncementsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AnouncementAuthGuard)
  create(@Request() request,  @Body() createAnouncementDto: CreateAnouncementDto) {
    return this.anouncementsService.create(createAnouncementDto, request.user.id);
  }

  @Get()
  findAll() {
    return this.anouncementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anouncementsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AnouncementAuthGuard)
  update(@Request() request, @Param('id') id: string, @Body() updateAnouncementDto: UpdateAnouncementDto) {
    return this.anouncementsService.update(+id, updateAnouncementDto, request.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AnouncementAuthGuard)
  remove(@Request() request,@Param('id') id: string) {
    return this.anouncementsService.remove(+id, request.user.id);
  }
}
