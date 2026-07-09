import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    //@Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHome(): string {
    const home = {
      name: 'NestJS Auth TypeORM API',
      status: 'ok',
      login: {
        url: '/auth/login',
        method: 'POST',
        body: {
          email: this.configService.demoUser.email || 'demo@example.com',
          password: this.configService.demoUser.password || 'demo-password',
        },
      },
      docs: {
        title: 'Swagger',
        url: 'https://nestjs-auth-typeorm.up.railway.app/docs',
      },
    };

    return JSON.stringify(home, null, 2);
  }
}
