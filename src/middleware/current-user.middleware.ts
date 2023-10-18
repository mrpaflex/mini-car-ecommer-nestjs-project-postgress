import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserEntity } from "src/users/entity/user.entity";
import { UsersService } from "src/users/users.service";


declare global{
    namespace Express{
        interface Request{
            currentUser: UserEntity;
        }
    }
}


@Injectable()
export class CurrentUserMidlleWare implements NestMiddleware{
    constructor(private userService: UsersService){}
    async use(req: Request, res: Response, next: NextFunction){
        const {userId} = req.session || {};

        if(userId){
            const user = await this.userService.findoneuser(userId);
            
            req.currentUser = user;
        }
        next();
    }
}