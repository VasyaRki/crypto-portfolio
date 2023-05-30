import { CanActivate, ExecutionContext } from '@nestjs/common/interfaces';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const tokenAuth = this.reflector.getAllAndMerge('token', [
      context.getClass(),
      context.getHandler(),
    ]);    
    
    console.log('JwtAuthGuard');

    if (!tokenAuth || tokenAuth.length === 0){
      console.log('test');
      
      return true;
    }

    try {
      const authHeader = req.headers.authorization;
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Unauthorized' });
      }

      const user = this.jwtService.verify(token);      

      Reflect.defineMetadata('user', user, req);

      return true;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
