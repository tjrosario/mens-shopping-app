export interface CreditCard {
  address_city?: string;
  address_country?: string;
  address_line1?: string;
  address_line1_check?: string;
  address_line2?: string;
  address_state?: string;
  address_zip?: string;
  address_zip_check?: string;
  brand?: string;
  country?: string;
  customer?: string;
  cvc_check?: string;
  dynamic_last4?: string;
  exp_month?: number;
  exp_year?: number;
  expirationDate?: string;
  fingerprint?: string;
  funding?: string;
  id?: string;
  last4?: string;
  metadata?: object;
  name?: string;
  object?: string;
  tokenization_method?: string;
  isDefault?: boolean;
}
