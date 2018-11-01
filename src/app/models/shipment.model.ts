export interface Shipment {
  dateCreated?: Date;
  dateDelivered: Date;
  dateOrdered: Date;
  dateShipped: Date;
  deleted?: boolean;
  id?: string;
  lastUpdated?: Date;
  orderNumber?: number;
  returnLabel?: string;
  returnStatus?: string;
  returnTrackingNumber?: string;
  returnTrackingUrl?: string;
  shippingLabel?: string;
  shippingStatus?: string;
  shippingTrackingNumber?: string;
  shippingTrackingUrl?: string;
  vendorOrderNumber?: string;
  xShipper?: string;
}
