import { Product } from './product.model';

export interface OrderItem {
  comments?: string;
  cost?: number;
  dateCreated?: Date;
  deleted?: boolean;
  id?: string;
  isVirtual?: boolean;
  lastUpdated?: Date;
  markedForReturn?: boolean;
  orderNumber?: number;
  price?: number;
  product?: Product;
  rejectReasons?: object;
  rejected?: boolean;
  rejectedPreviewNumber?: number;
  returnReasons?: object;
  returned?: boolean;
  sku?: string;
  trackingNumber?: string;
  trackingUrl?: string;
}
