import { Size } from './size.model';

export interface MeasurementPreference {
  dateCreated?: Date;
  deleted?: boolean;
  id?: string;
  lastUpdated?: Date;
  size: Size[];
}
