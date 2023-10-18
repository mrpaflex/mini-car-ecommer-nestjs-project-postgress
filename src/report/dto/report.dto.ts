import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class ResportsDto{
    
    @IsNumber()
    @Min(0)
    @Max(2000000000)
    price: number;

    @Max(2000000)
    @IsNumber()
    mileage: number

    @IsString()
    @IsNotEmpty()
    model: string

   @IsLatitude()
    lat: number;
    
    @IsLongitude()
    lng: number

    @IsNumber()
    @Min(2000)
    year: number;
  
    @IsString()
    @IsNotEmpty()
    make: string;
}