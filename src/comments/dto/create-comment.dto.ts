import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    comment:string;

    @IsString()
    @IsNotEmpty()
    user_id:string;

    @IsString()
    @IsNotEmpty()
    anouncement_id:string;
}
