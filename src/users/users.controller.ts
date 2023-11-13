import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/authorization/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard) 
  update(@Request() request, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto, request.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) 
  remove(@Request() request, @Param('id') id: string) {
    return this.usersService.remove(+id, request.user.id);
  }

  @HttpCode(200)
  @Post('resetPassword')
  async sendEmailRequestResetpassword(@Body("email") email:string){
    await this.usersService.emailRequestedResetPassword(email);
    return {message:"Token sended for your email."}
  }

  @Patch('resetPassword/:token')
  async resetPassword(@Param("token") token:string, @Body("password") password:string){
    console.log(password)
    await this.usersService.requestResetPassword(password, token);
    return {message:"This password are changed with success."}
  }
}
