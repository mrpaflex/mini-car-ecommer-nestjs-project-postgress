import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserInterceptors implements NestInterceptor{
    constructor(private userService: UsersService){}
  async   intercept(context: ExecutionContext, next: CallHandler): Promise<any>{
        const request = context.switchToHttp().getRequest()
        const {userId} = request.session || {};
        if (userId) {
            const user = await this.userService.findoneuser(userId);
          request.currentUser = user
        }
        return next.handle();
    }
}