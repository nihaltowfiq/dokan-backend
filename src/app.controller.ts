import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Root')
@Controller('')
export class AppController {
  @Get('/')
  getAllProcess() {
    return {
      name: '⚡️Welcome to the server!',
    };
  }
}
