import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
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

  @Post('/cron')
  addCron(@Body() body: any) {
    const { name } = body;
    const job = new CronJob(CronExpression.EVERY_SECOND, () => {
      console.log('你好，', name);
    });

    this.schedulerRegistry.addCronJob(name, job);

    job.start();
  }

  @Delete('/cron/:name')
  deleteCron(@Param('name') name: string) {
    this.schedulerRegistry.deleteCronJob(name);
  }
}
