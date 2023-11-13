import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAddressDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(9)
    CEP:string;

    @IsString()
    @IsNotEmpty()
    state:string;

    @IsString()
    @IsNotEmpty()
    city:string;

    @IsString()
    @IsNotEmpty()
    street:string;

    @IsString()
    @IsNotEmpty()
    number:string;

    @IsString()
    complement:string;

}
