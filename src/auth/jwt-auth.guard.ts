import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const tokenAuth = this.reflector.getAllAndMerge<string[]>('token', [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!tokenAuth || tokenAuth.length === 0) {
      return true;
    }

    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Unauthorized');
      }

      const token = authHeader.split(' ')[1];
      const user = this.jwtService.verify(token);

      Reflect.defineMetadata('user', user, req);

      return true;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
