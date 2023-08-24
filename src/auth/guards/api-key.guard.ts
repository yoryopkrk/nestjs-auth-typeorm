import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

import config from '../../config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const isPublic = this.reflector.get('isPublic', context.getHandler());

    if (isPublic) {
      return true;
    }

    const authHeader = request.header('Auth');
    const isAuth = authHeader === this.configService.apiKey;
    if (!isAuth) {
      throw new UnauthorizedException('not allow');
    }
    return true;
  }
}
