import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthorizationService {
  constructor(private userSvc: UsersService,private jwtSvc: JwtService,) {}

  async validateUser(userEmail: string, userPassword: string) {
    const userFinded = await this.userSvc.findByEmail(userEmail);

    if(userFinded){
      const passwdEquals = await compare(userPassword, userFinded.password);
      if(passwdEquals){
        return userFinded;
      }
    }
    return null;
  }

  async login(userEmail: string) {
    const user = await this.userSvc.findByEmail(userEmail);
    return {token: this.jwtSvc.sign({ type: user.user_type, userEmail }, { subject: user.id.toString() }),};
  }
  /*
  create(createAuthorizationDto: CreateAuthorizationDto) {
    return 'This action adds a new authorization';
  }

  findAll() {
    return `This action returns all authorization`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authorization`;
  }

  update(id: number, updateAuthorizationDto: UpdateAuthorizationDto) {
    return `This action updates a #${id} authorization`;
  }

  remove(id: number) {
    return `This action removes a #${id} authorization`;
  }
  */
}