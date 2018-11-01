import { NavItem } from '../models/nav-item.model';

export const USER_GUEST_ITEMS: NavItem[] = [{
    name: 'How it Works',
    link: '/how-it-works'
}, {
    name: 'Sign In',
    link: '/login'
}, {
    name: 'Get Started',
    link: '/signup'
}];

export const USER_MEMBER_ITEMS: NavItem[] = [{
    name: 'Admin <i class="fa fa-cog"></i>',
    link: '/admin',
    id: 'admin',
    admin: true,
    title: 'Admin'
},
{
    name: 'Account <i class="fa fa-caret-down"></i>',
    link: '/account',
    id: 'myaccount',
    title: 'My Account'
}, {
    name: 'My Orders',
    link: '/account/orders',
    title: 'My Orders'
}];
