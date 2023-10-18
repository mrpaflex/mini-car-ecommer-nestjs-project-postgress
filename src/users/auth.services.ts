import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt} from "crypto";
import { promisify } from "util";
//import { usersDto } from "./dto/users.dto";
import { LoginUserDto } from "./dto/login.user.dto";
import { CreateUsersDto } from "./dto/users.dto";
import { UserEntity } from "./entity/user.entity";


const scryptkey = promisify(_scrypt);

@Injectable()
export class AuthService{
    constructor(private usersService: UsersService){}

   async signup(userdto: CreateUsersDto){
        const users = await this.usersService.finduser(userdto.email);
        if (users.length) {
            throw new HttpException('user with same email already exist', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        ///to hash a password
        ///1. generate a salt
        const salt = randomBytes(4).toString('hex');        
        //2. convert the generated salt to string
       //const stringSalt = salt.toString('hex')//.toString('hex') convert the salt to a string

        //3. hash the salt and the passport and store it in hash bucket
        const hash = (await scryptkey(userdto.password, salt, 5)) as Buffer;

        //4. convert the hash password to a string 
        //const hashString = hash.toString('hex');

        //here we passed in the password from the user and hash it.. the scriptkey is what hashed the password.. also hash the salt since the salt is also passed in...
        //so to make typescript understand it.. we put the >as buffer<

        //5. join or add the salt and hashpassword together

        const hashpassword = salt + "." + hash.toString('hex');

        userdto.password= hashpassword

         //now create a new user since you have finish the password
         //omo this password hashing no easy
         const newuser = await this.usersService.createuser(userdto);

         return newuser;

    }

    async login(logindto: LoginUserDto): Promise<any>{

       // const [user] = await this.usersService.findoneuser(id);
        const [user] = await this.usersService.finduser(logindto.email);


        if (!user) {
            throw new NotFoundException(`user does'nt exit`);
            
        }

        const [salt, storedHashPassword] = user.password.split('.');
        
        const loginPasswordhash = (await scryptkey(logindto.password, salt, 5)) as Buffer;


        const loginPasswordhashToString = loginPasswordhash.toString('hex');

        if (storedHashPassword !== loginPasswordhashToString){
           
         throw new BadRequestException(`Bad Password Combination`);
        }
        return  user
    }
}