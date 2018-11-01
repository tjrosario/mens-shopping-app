import { OrderReason } from '../models/order-reason.model';

export const RETURN_REASONS: OrderReason[] = [
  {
    text: 'Too big',
    value: 'size-big'
  },
  {
    text: 'Too small',
    value: 'size-small'
  },
  {
    text: 'Too tight',
    value: 'fit-tight'
  },
  {
    text: 'Too baggy',
    value: 'fit-baggy'
  },
  {
    text: 'Not my style',
    value: 'style-general'
  },
  {
    text: 'Not my color',
    value: 'color-general'
  },
  {
    text: 'Damaged',
    value: 'condition-damaged'
  }
];
