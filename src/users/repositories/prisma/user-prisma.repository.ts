import { Injectable } from "@nestjs/common";
import { hashSync } from "bcryptjs";
import { plainToInstance } from "class-transformer";
import { PrismaService } from "src/database/prisma.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class UserPrismaRepository{
    constructor(private prismaSvc: PrismaService){};

    async create(userData:CreateUserDto) : Promise<User> {
        const actualUser = new User();
        Object.assign(actualUser, {...userData});

        const createdNewUser = await this.prismaSvc.user.create({
            data:{
                name:actualUser.name,
                email:actualUser.email,
                phone:actualUser.phone,
                birthday:actualUser.birthday,
                description:actualUser.description,
                user_type: actualUser.user_type,
                cpf: actualUser.cpf,
                user_image:actualUser.user_image,
                password:actualUser.password
            }
        });
        return plainToInstance(User, createdNewUser);
    }

    async update(userID:number, userNewData: UpdateUserDto) : Promise<User> {
        const updatedUser = await this.prismaSvc.user.update({where:{id:userID}, data: {...userNewData}});
        return plainToInstance(User, updatedUser);
    };

    async updatePassword(userID:number, newPassword:string) : Promise<void>{
        await this.prismaSvc.user.update({where:{id:userID}, data:{password: hashSync(newPassword,10), reset_token:null}});
    };

    async updateToken(userEmail: string, userToken:string) : Promise <void>{
        await this.prismaSvc.user.update({where:{email:userEmail}, data:{reset_token:userToken}});
    }

    async delete(userID:number) : Promise<void>{
        await this.prismaSvc.user.delete({where:{id:userID}});
    };

    async findAll() {
        const allUsers = await this.prismaSvc.user.findMany();
        return allUsers;
    }

    async findOne(userID: number){
        const findedUser = await this.prismaSvc.user.findUnique({where:{id:userID}});
        return findedUser;
    } 

    async findByEmail(userEmail:string) {
        const findedUser = await this.prismaSvc.user.findFirst({where:{email:userEmail}});
        return findedUser;
    }

    async findByToken(userToken:string){
        const findedUser = await this.prismaSvc.user.findFirst({where:{reset_token:userToken}});
        return findedUser;
    }
}