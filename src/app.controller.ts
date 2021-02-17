import { Controller, Get, Param } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/cron/:action')
  manageCron(@Param('action') action: string) {
    const greet = this.schedulerRegistry.getCronJob('greet');

    if (action === 'info') {
      console.log('上一次执行：', greet.lastDate());
      console.log('下一次执行：', greet.nextDates(5));
    }

    if (action === 'stop') {
      greet.stop();
    }

    if (action === 'start') {
      greet.start();
    }
  }
}
