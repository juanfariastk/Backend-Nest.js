import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateImageDto {
    @IsString()
    @IsNotEmpty()
    image_url: string;

    @IsNumber() 
    @IsNotEmpty()
    anouncement_id: number;
}
