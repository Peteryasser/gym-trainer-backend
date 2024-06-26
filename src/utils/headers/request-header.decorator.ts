import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const RequestHeaders = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().headers;
    return headers;
  },
);
