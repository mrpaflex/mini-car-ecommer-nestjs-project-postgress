import { IsString, IsEmail } from "class-validator";


export class CreateUsersDto{

    @IsString()
    @IsEmail()
    email: string;

    
    @IsString()
    password: string;
}