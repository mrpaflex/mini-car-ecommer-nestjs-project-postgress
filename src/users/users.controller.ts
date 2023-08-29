import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { usersDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { UserEntity } from './entity/user.entity';
import { UsersupdateDto } from './dto/usersUpdate.dto';
import { AuthService } from './auth.services';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {

    constructor(
        private userservice: UsersService,
        private authService: AuthService
        ){}
 

    @Post('signup')
    createUser(@Body() body: usersDto){//note this body is holding two thing here.. which are the email and password.. so to get it u use body.email, and body.password
        //that is usersDto = email and password
        //return this.userservice.createuserlogic(body)//sign we don't want to sign up with plane password we mute this
        //return `something from service login ${body}`
        //console.log(`this not my real body ${body}`);

        //use this
        return this.authService.signup(body.email, body.password);

        
    }

    @Post('login')
    login(@Body() email: string, password: string){
        return this.authService.login(email, password)
    }

    @Get(':id')
    findoneuser(@Param('id') id: string){
        return this.userservice.findoneuser(parseInt(id));

    }

    // @Get('user')
    // allusers(){
    //     return this.userservice.allusers();
    // }

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
