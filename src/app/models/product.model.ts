export interface Product {
  cost?: number;
  dateCreated?: Date;
  deleted?: boolean;
  description?: string;
  id?: string;
  imageUrl?: string;
  isVirtual?: boolean;
  lastUpdated?: Date;
  name?: string;
  notes?: string;
  overrideDesignDescription?: boolean;
  retailPrice?: number;
  sellingPrice?: number;
  sku?: string;
  statedColor?: string;
  statedSize?: string;
  status?: string;
  stockLevel?: number;
  upc?: string;
  vendorAvailability?: number;
  weight?: number;
  xBrand?: string;
  xDesign?: string;
  xProductCategory?: string;
  xVendor?: string;
}
