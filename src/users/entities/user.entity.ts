import { Exclude } from "class-transformer";
import { userType } from "../enum/UserType";
export class User {
    readonly id:number;
    name:string;
    email:string;
    phone:string;
    birthday:string;
    description:string;
    user_type: userType;
    cpf:string;
    user_image:string;
    @Exclude()
    password:string;
}
