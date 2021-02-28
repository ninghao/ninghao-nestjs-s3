import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Permissions } from './permissions.decorator';
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

  @Get('jurassic-park')
  @Permissions('visit_jurassic_park')
  getJurassicPark() {
    return '🦖';
  }
}
