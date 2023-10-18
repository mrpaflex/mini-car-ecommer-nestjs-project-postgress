import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersupdateDto } from './dto/usersUpdate.dto';
import { AuthService } from './auth.services';
import { Serialized } from 'src/interceptors/user.interceptor';
import { userSeriliazeDTO } from './dto/user.serialize.dt';
import { LoginUserDto } from './dto/login.user.dto';
import { CreateUsersDto } from './dto/users.dto';
import { CurrentUser } from './decorators/currentUser.decorator';
import { CurrentUserInterceptors } from './interceptors/user.interceptor';
import { UserEntity } from './entity/user.entity';
import { AuthGuards } from 'src/guards/auth.guards';

@Controller('auth')

export class UsersController {

    constructor(
        private userservice: UsersService,
        private authService: AuthService
        ){}
 

    @Post('signup')
   async createUser(@Body() body: CreateUsersDto, @Session() session: any){//note this body is holding two thing here.. which are the email and password.. so to get it u use body.email, and body.password
        //that is usersDto = email and password
        //return this.userservice.createuserlogic(body)//sign we don't want to sign up with plane password we mute this
        //return `something from service login ${body}`
        //console.log(`this not my real body ${body}`);

        //use this
        //return this.authService.signup(body.email, body.password);
        const user = await this.authService.signup(body);
        session.userId = user.id
        return session.userId;
       
        //return session.userId
        
    }

    @Post('login')
    async login(@Body() logindto: LoginUserDto, @Session() session: any): Promise<any>{
        const user = await this.authService.login(logindto)
        session.userId = user.id;
        return session.userId;
    }

    //this code is not verify yet
    // @Get('who')
    // async whologgedin( @Session() session: any){
    //     const user =  await this.userservice.findoneuser(session.userId);

    //     if(!user){
    //         return undefined
    //     }  
    //     return user
    // }

    @Serialized(userSeriliazeDTO)
    @Get('profile')
    @UseGuards(AuthGuards)
    userProfile( @CurrentUser() user: UserEntity){
        if(user){
            return user
        }
        throw new HttpException('you have not logged in', HttpStatus.UNPROCESSABLE_ENTITY)
    }

//this code is not verify yet
    @Post('logout')
    signOut(@Session() session: any){
        session.userId = null
    }

    @Serialized(userSeriliazeDTO) //you must apply this to any where you don't want to return the password
    @Get(':id')
    async findoneuser(@Param('id') id: string){
        const user =  await this.userservice.findoneuser(parseInt(id));
        if (!user) {
            throw new NotFoundException('user not found')
        }
        return user
    }
    

    
    @Get()
    findsimilarusers(@Query('email') email: string){
        return this.userservice.finduser(email);
    }

    @Delete(':id')
    removeuser(@Param('id') id: string ){
        return this.userservice.reomveuser(parseInt(id));
    }
    @Patch(':id')
    updateuserInfo(@Param('id')id: string, @Body() body: UsersupdateDto){
        return this.userservice.updateuserInfo(parseInt(id), body);
    }
}
