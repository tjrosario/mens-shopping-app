import { NavSection } from '../models/nav-section.model';
import { NavItem } from '../models/nav-item.model';

export const GLOBAL_ITEMS: NavSection[] = [
  {
    category: 'Our Service',
    items: [
      {
        name: 'How it Works',
        link: '/how-it-works'
      },
      {
        name: 'Examples',
        link: '/examples'
      },
      {
        name: 'Subscriptions',
        link: '/subscriptions'
      },
      {
        name: 'Gift Cards',
        external: true,
        link: 'https://store.mythreadlab.com/collections/gift-cards'
      }
    ]
  },
  {
    category: 'Company',
    items: [
      {
        name: 'About Us',
        link: '/about'
      },
      /*
      {
        name: 'Affiliate Program',
        link: '/affiliates'
      },
      {
        name: 'Referrals',
        external: true,
        link: 'http://threadlab.referralcandy.com'
      }, */
      {
        name: 'In the Lab Blog',
        external: true,
        link: 'http://blog.mythreadlab.com'
      },
    ]
  },
  {
    category: 'Customer Service',
    items: [
      {
        name: 'Contact Us',
        link: '/contact'
      },
      {
        name: 'FAQ',
        link: '/faq'
      }
    ]
  }
];

/*
export const GUEST_ITEMS: NavItem[] = [{
      name: 'Get Started',
      link: '/signup'
  }, {
      name: 'Sign In',
      link: '/login'
  }, {
      //name: 'How it Works',
      link: '/how-it-works'
  }, {
      //name: 'Examples',
      link: '/examples'
  }, {
      //name: 'Boxes',
      link: '/boxes'
  }, {
      //name: 'Subscriptions',
      link: '/subscriptions'
  }, {
      name: 'PerfectFit',
      link: '/perfect-fit'
  }, {
      name: 'Brand Preferences',
      link: '/brand-preferences'
  }, {
      //name: 'About',
      link: '/about'
  }, {
      //name: 'FAQ',
      link: '/faq'
  }, {
      //name: 'Contact Us',
      link: '/contact'
  }, {
      //name: 'Referrals',
      external: true,
      link: 'http://threadlab.referralcandy.com'
  }, {
      //name: 'Affiliates',
      link: '/affiliates'
  }, {
      //name: 'Blog',
      external: true,
      link: 'http://blog.mythreadlab.com'
  }, {
      name: 'Purchase a Gift Card',
      external: true,
      link: 'https://store.mythreadlab.com/collections/gift-cards'
  }, {
      name: 'Terms of Use',
      link: '/terms'
  }, {
      name: 'Privacy Policy',
      link: '/privacy'
}];

export const MEMBER_ITEMS: NavItem[] = [{
      name: 'Boxes',
      link: '/boxes'
  }, {
      name: 'Gift Cards',
      external: true,
      link: 'https://store.mythreadlab.com/collections/gift-cards'
  }, {
      name: 'About',
      link: '/about'
  }, {
      name: 'FAQ',
      link: '/faq'
  }, {
      name: 'Contact Us',
      link: '/contact'
  }, {
      name: 'Referrals',
      external: true,
      link: 'http://threadlab.referralcandy.com'
  }, {
      name: 'Affiliates',
      link: '/affiliates'
  }, {
      name: 'Blog',
      external: true,
      link: 'http://blog.mythreadlab.com'
  }, {
      name: 'Terms of Use',
      link: '/terms'
  }, {
      name: 'Privacy Policy',
      link: '/privacy'
}];
*/
