import { NavItem } from '../models/nav-item.model';

export const ACCOUNT_ITEMS: NavItem[] = [
{
  name: 'Overview',
  link: '/account'
},
{
  name: 'Orders',
  link: '/account/orders'
},
{
  name: 'Subscriptions',
  link: '/account/subscriptions'
},
{
  name: 'Billing Info',
  link: '/account/billing'
},
{
  name: 'Coupons',
  link: '/account/credit'
},
/*
{
  name: 'Referrals',
  link: '/account/referrals'
},*/
{
  name: 'Admin',
  link: '/admin',
  admin: true
}
];
