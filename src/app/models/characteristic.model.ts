import { Attribute } from './attribute.model';

export interface Characteristic {
  allowedAttributes?: Attribute[];
  dateCreated?: Date;
  deleted?: boolean;
  description?: string;
  id?: string;
  lastUpdated?: Date;
  name?: string;
  xProductCategory?: string;
}
