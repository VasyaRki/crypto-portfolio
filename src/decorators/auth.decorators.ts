import {
  ExecutionContext,
  createParamDecorator,
  SetMetadata,
} from '@nestjs/common';

export const ArgUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return Reflect.getMetadata('user', req);
  }
);

export const UseToken = () => {
  return SetMetadata('token', true);
};