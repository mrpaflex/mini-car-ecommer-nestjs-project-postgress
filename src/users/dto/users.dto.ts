import { IsString, IsEmail } from "class-validator";


export class usersDto{

    @IsString()
    @IsEmail()
    email: string;

    
    @IsString()
    password: string;
}