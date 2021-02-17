import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  @Cron(CronExpression.EVERY_WEEK)
  handleCron() {
    console.log('您好');
  }

  @Interval(1000)
  handleInterval() {
    console.log('嘀嗒');
  }

  @Timeout(3000)
  handleTimeout() {
    console.log('卡嘣');
  }
}
