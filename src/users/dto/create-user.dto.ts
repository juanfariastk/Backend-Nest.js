import { hashSync } from "bcryptjs";
import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { userType } from "../enum/UserType";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    phone:string;

    @IsString()
    @IsNotEmpty()
    birthday:string;
    
    @IsString()
    @IsNotEmpty()
    description:string;

    @IsEnum(userType)
    @IsNotEmpty()
    user_type: userType;

    @IsString()
    @IsNotEmpty()
    @MinLength(12)
    @Transform(({value})=> hashSync(value, 10), {groups: ["password"]})
    password:string;

    @IsString()
    @IsNotEmpty()
    cpf:string;

    @IsString()
    @IsNotEmpty()
    user_image:string;
};