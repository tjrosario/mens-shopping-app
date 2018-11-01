export interface Coupon {
  coupon_code?: string;
  coupon_type?: string;
  name?: string;
  description?: string;
  discount_in_cents?: object;
  discount_percent?: object;
  discount_type?: string;
  state?: string;
}
