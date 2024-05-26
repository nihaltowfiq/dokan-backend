import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Customer')
@ApiBearerAuth()
@Controller('customer')
export class CustomerController {}
