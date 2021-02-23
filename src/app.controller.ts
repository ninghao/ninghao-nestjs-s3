import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectQueue('app') private appQueue: Queue,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('images')
  async postImages() {
    const job = await this.appQueue.add('resizeImage', {
      file: Date.now(),
    });

    console.log(job);
  }

  @Post('pause-queue')
  async pauseQueue() {
    this.appQueue.pause();
  }

  @Post('resume-queue')
  async resumeQueue() {
    this.appQueue.resume();
  }
}
