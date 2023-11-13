import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { fuelType } from "../enum/fuelType";

export class CreateAnouncementDto {
    @IsString()
    @IsNotEmpty()
    brand:string;

    @IsString()
    @IsNotEmpty()
    model:string

    @IsString()
    @IsNotEmpty()
    year:string

    @IsEnum(fuelType)
    @IsNotEmpty()
    fuel:fuelType;

    @IsString()
    @IsNotEmpty()
    mileage: string;

    @IsString()
    @IsNotEmpty()
    color:string

    @IsString()
    @IsNotEmpty()
    fipe_price:string

    @IsString()
    @IsNotEmpty()
    price:string

    @IsString()
    @IsNotEmpty()
    description:string

    @IsString()
    @IsNotEmpty()
    cover_image:string
}
