import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AnouncementAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean  {
        const request = context.switchToHttp().getRequest()
        const user = request.user
        if(user.type.toUpperCase() !== "ANUNCIANTE"){
            throw new UnauthorizedException('Unauthorized to complete this action!');
        }

        return true
    }
}
