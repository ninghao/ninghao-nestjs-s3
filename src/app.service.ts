import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  @Cron(CronExpression.EVERY_WEEK)
  handleCron() {
    console.log('您好');
  }
}
