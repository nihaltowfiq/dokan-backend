import { Controller } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  // add single product { auth guard }
  // get single product { no guard }
  // get all products { no guard - pagination, filter, sort }
  // update single product { auth guard }
}
