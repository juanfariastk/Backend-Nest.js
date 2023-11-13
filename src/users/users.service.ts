import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { randomUUID } from 'crypto';
import { EmailService } from 'src/services/mail.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserPrismaRepository } from './repositories/prisma/user-prisma.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserPrismaRepository, private mailSvc:EmailService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const findUser = await this.userRepository.findByEmail(createUserDto.email);
    if (findUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = hashSync(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    
    return this.userRepository.create(createUserDto);
  }

  async findAll(){
    return this.userRepository.findAll();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  
  async findByEmail(email:string){
    const userFinded = await this.userRepository.findByEmail(email);
    return userFinded;
  }

  async update(id: number, updateUserDto: UpdateUserDto, authId: string) {
    if (id !== +authId) {
      throw new UnauthorizedException('Insufficient permission');
    }

    const userAuthorized = await this.userRepository.findOne(+authId);
    if(updateUserDto.email){  
      const findedUser = await this.findByEmail(updateUserDto.email);
      if(findedUser && userAuthorized.email !== updateUserDto.email){
        throw new ConflictException('Email already exists, try a new email.')
      }
    }

    const updatedUser = await this.userRepository.update(id, updateUserDto);
    return updatedUser;
  }

  async remove(id: number, authId: string): Promise<void> {
    if (id!==+authId) {
      throw new UnauthorizedException('Insufficient permission');
    }

    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(id);
  }

  async emailRequestedResetPassword(userEmail:string){
    const findedUser = await this.findByEmail(userEmail);
    if(!findedUser){
      throw new NotFoundException('User Not Founded, please try again.')
    }

    const generatedToken = randomUUID();

    await this.userRepository.updateToken(userEmail, generatedToken);
    const resetPasswordRequested = this.mailSvc.resetPassword(userEmail, findedUser.name, generatedToken );
    await this.mailSvc.sendEmail(resetPasswordRequested);
  }

  async requestResetPassword(newPassword:string, resetToken:string){
    const findedUser = await this.userRepository.findByToken(resetToken);
    if(!findedUser){
      throw new NotFoundException('User Not Founded, please try again.')
    }
    await this.userRepository.updatePassword(findedUser.id, newPassword);
  }

}
