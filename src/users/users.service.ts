import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsersDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>){}
// createuserlogic(body: usersDto){
//     const userhold = this.repo.create(body);
//     return this.repo.save(userhold);

   async createuser(userdto: CreateUsersDto): Promise<UserEntity>{
        const createuser = this.repo.create(userdto);
        return  await this.repo.save(createuser);
}

// async allusers(){
//     const allusers = await this.repo.find();
//     if (!allusers) {
//         throw new Error(`no user in the database yet`);
//     }
//     return allusers;
// }

async findoneuser(id: number) {
    //this is the best way to structure code to make logout request work..
    //because if you use findOne by id it will loop and return the first user with id 1
    
    if(!id){
        return null
    }
    return  await this.repo.findOne({where: {id:id}});
   
}

 finduser(email: string){
    return  this.repo.find({where: {email: email}});
}

async updateuserInfo(id: number, body: Partial<UserEntity>){
    const userfind =  await this.repo.findOneBy({id});

    if(!userfind){
        throw new NotFoundException(`user not found with such id to update`);
    }
   const updateduser =  Object.assign(userfind, body);
    return this.repo.save(updateduser);
}

async reomveuser(id: number){
    const finduser = await this.repo.findOneBy({id});
    if (!finduser) {
        throw new NotFoundException(`user doesn't exit`);
    }
    return await this.repo.remove(finduser);
}

}
