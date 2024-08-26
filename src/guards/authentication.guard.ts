import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export default class AuthenticationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const rq = context.switchToHttp().getRequest();
    if (rq.headers.authorization.split(' ')[1] === 'admin') {
      return true;
    }
    throw new UnauthorizedException("Only admins can create a course.");;
  }
}
