import { Transform } from "class-transformer";
import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class EstimatedDto{

    @Transform(({value})=> parseInt(value))
    @Max(2000000)
    @IsNumber()
    mileage: number

    @IsString()
    model: string

    @Transform(({value})=> parseFloat(value))
    @IsLatitude()
    lat: number;
    
    @Transform(({value})=> parseFloat(value))
    @IsLongitude()
    lng: number;

    @Transform(({value})=> parseInt(value))
    @IsNumber()
    @Min(2000)
    year: number;
  
    @IsString()
    make: string;
}

   