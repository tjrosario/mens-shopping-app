import { Characteristic } from './characteristic.model';
import { PriceRange } from './price-range.model';
import { ProductMeasurement } from './product-measurement.model';

export interface ProductCategory {
  characteristics?: Characteristic[];
  code?: string;
  countsTowardMaxOrderItems?: boolean;
  dateCreated?: Date;
  deleted?: boolean;
  id?: string;
  imageUrl?: string;
  lastUpdated?: Date;
  name?: string;
  priceRanges?: PriceRange[];
  productMeasurements?: ProductMeasurement[];
  status?: string;
}
