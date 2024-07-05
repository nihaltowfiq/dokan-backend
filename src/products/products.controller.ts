import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Product Management')
@Controller('products')
export class ProductsController {
  // add single product { admin auth guard }
  // get single product { no guard }
  // get all products { no guard - pagination, filter, sort }
  // update single product { admin auth guard }
}
