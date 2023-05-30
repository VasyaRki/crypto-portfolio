import {
  ExecutionContext,
  createParamDecorator,
  SetMetadata,
  applyDecorators,
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

const useAdminAuth = () => {
  return applyDecorators(UseToken(), SetMetadata('Admin', true));
};
