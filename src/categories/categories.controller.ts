import { Controller } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  // create category { admin auth guard }
  // update category { admin auth guard }
  // delete categories { admin auth guard }
  // get all categories { no guard - for customers }
  // get all categories { no guard - for admin - pagination, sorting, filter }
}
