export interface Address {
  addressLine1?: string;
  addressLine2?: string;
  addresseeEmail?: string;
  addresseeFirstName?: string;
  addresseeLastName?: string;
  addresseePhone?: string;
  city?: string;
  dateCreated?: Date;
  deleted?: boolean;
  id?: string;
  isDefault?: boolean;
  lastUpdated?: Date;
  state?: string;
  type?: string;
  zip?: string;
}
