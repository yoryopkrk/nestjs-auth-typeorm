import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    //@Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getEnvs(): string {
    const apiKey = this.configService.apiKey;
    const dbType = this.configService.database.type;
    const database =
      dbType === 'postgres'
        ? this.configService.postgres.dbName
        : this.configService.mysql.dbName;

    return `Envs: ${apiKey} ${database}`;
  }
}
