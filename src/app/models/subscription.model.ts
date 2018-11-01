import { ProductCategory } from './product-category.model';

export interface Subscription {
  budget?: number;
  dateCreated?: Date;
  deleted?: boolean;
  frequency?: number;
  id?: string;
  lastOrderDate?: Date;
  lastUpdated?: Date;
  notes?: string;
  productCategories?: ProductCategory[];
  shipWithoutPreview?: boolean;
  startDate?: Date;
  status?: string;
  subscritionNumber?: string;
}
