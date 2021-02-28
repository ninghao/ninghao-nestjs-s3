import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('admin')
  @Roles('admin', 'manager')
  getAdmin() {
    return '👽';
  }
}
