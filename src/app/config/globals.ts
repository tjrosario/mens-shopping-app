import { Injectable } from '@angular/core';

import { META } from '../data/meta';

@Injectable()
export class Globals {

  assetUrl = '';

  auth = {
    expiry: {
      minutes: 60 * 2 //2hrs
    }
  };

  idle = {
    idle: 1200, // seconds
    timeout: 60 // seconds
  };

  companyAddress = {
    name: 'ThreadLab, Inc.',
    address1: '78 John Miller Way',
    address2: 'Suite 437',
    city: 'Kearny',
    state: 'NJ',
    zip: '07032',
    phone: '866.208.5322'
  };

  google = {
    GA_TRACKING_ID: 'UA-31853503-2'
  }

  mailchimp = {
    lists: {
      postSignup: '0f21534432'
    },
    goals: {
      id: '6a303cfff4a8e19ce0b191c36'
    }
  };

  masks = {
    phone: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    zip: [/\d/, /\d/, /\d/, /\d/, /\d/]
  };

  meta = META;

  recurly = {
    publicKey: 'ewr1-qIhMnmGYW4QSon7TAMGjfi',
    fields: {
      // affects all fields
      all: {
        style: {
          borderRadius: '4px',
          fontColor: '#000',
          fontSize: '20px',
          padding: '5px 13px',
          fontFamily: "'Neuton', serif",
          placeholder: {
            color: '#495057 !important'
          }
        }
      },
      // affects the combined card field
      card: {
        displayIcon: true,
        style: {
          fontSize: '20px',
          padding: '13px',
          placeholder: {
            color: '#495057 !important',
            content: {
              number: 'Card Number',
              cvv: 'CVC'
            }
          },
          invalid: {
            fontColor: 'red'
          }
        }
      }
    }
  };

  referrals = {
    campaign: {
      url: 'https://pages.viral-loops.com/ThreadLab-Referral-Plan-Thba997e'
    }
  };

  title = 'ThreadLab.  Men\'s clothing.  Easier.';
}
