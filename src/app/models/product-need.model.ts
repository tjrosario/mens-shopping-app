import { ProductCategory } from './product-category.model';

export interface ProductNeed {
  dateCreated?: Date;
  deleted?: boolean;
  id?: string;
  lastUpdated?: Date;
  productCategory: ProductCategory;
  specialInstructions?: string;
}
