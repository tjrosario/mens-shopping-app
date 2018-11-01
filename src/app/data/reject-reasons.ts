import { OrderReason } from '../models/order-reason.model';

export const REJECT_REASONS: OrderReason[] = [
  {
    text: 'Don\'t like this brand',
    value: 'brand'
  },
  {
    text: 'Color is not for me',
    value: 'color'
  },
  {
    text: 'Currently own similar item',
    value: 'not-needed'
  },
  {
    text: 'Style is not for me',
    value: 'style'
  }
];
