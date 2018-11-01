export interface Payment {
  comments?: string;
  dateCreated?: Date;
  deleted?: boolean;
  id?: string;
  lastUpdated?: Date;
  paymentAmount?: number;
  paymentMethod?: string;
  transactionId?: string;
}
