import { Expose, Transform } from "class-transformer";

export class ReportSerilizedDto {

    @Expose() 
    id: number;
  
    @Expose()
    price: number;

    @Expose()
    mileage: number

    @Expose()
    model: number;

    @Expose()
    approved: boolean;
    
    @Expose()
    lat: string;
    
    @Expose()
    lng: string

    @Expose()
    year: number;

    @Expose()
    make: string;


    //this is enable the report to get or show only the id of the user who make the port or report
    //obj is the reference to the original report entity
    @Transform(({obj})=> obj.user.id)
    @Expose()
    userId: number
}