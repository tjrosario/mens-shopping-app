import { Frequency } from '../models/frequency.model';
import { Budget } from '../models/budget.model';
import { Status } from '../models/status.model';

export const FREQUENCIES: Frequency[] = [
  {
    description: '(every month)',
    name: 'Monthly',
    value: 1,
    enabled: true
  },
  {
    description: '(every two months)',
    name: 'Bimonthly',
    value: 2,
    enabled: true
  },
  {
    description: '(every three months)',
    name: 'Quarterly',
    value: 3,
    enabled: true
  },
  {
    description: '(every six months)',
    name: 'Biannually',
    value: 6,
    enabled: false
  },
  {
    description: '(once per year)',
    name: 'Annually',
    value: 12,
    enabled: false
  }
];

export const BUDGETS: Budget[] = [
  {
    description: '(Up to 6 Items) (Socks, Boxer-briefs, Undershirts)',
    numCategories: 3,
    value: 39.99
  },
  {
    description: '(Up to 3 Items)',
    numCategories: 3,
    value: 59.00
  },
  {
    description: '(Up to 4 Items)',
    numCategories: 3,
    value: 99.00
  },
  {
    description: '(Up to 5 Items)',
    numCategories: 5,
    value: 149.00
  },
  {
    description: '(Up to 8 Items)',
    numCategories: 7,
    value: 299.00
  }
];

export const STATUSES: Status[] = [
  {
    name: 'Active',
    value: 'active'
  },
  {
    name: 'Paused',
    value: 'suspended'
  }
];
