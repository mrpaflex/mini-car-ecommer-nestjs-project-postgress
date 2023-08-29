import { IsEmail, IsOptional, IsString } from "class-validator";

export class UsersupdateDto{

@IsOptional()
@IsEmail()   
email: string;

@IsString()
@IsOptional()
password: string;
}