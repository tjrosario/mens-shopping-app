import { Size } from './size.model';

export interface ProductMeasurement {
  allowedSizes?: Size[];
  dateCreated?: Date;
  deleted?: boolean;
  description?: string;
  id?: string;
  lastUpdated?: Date;
  name?: string;
  xProductCategory?: string;
}
