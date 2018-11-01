import { BoxItem } from '../models/box-item.model';

export const BOXES: BoxItem[] = [{
  campaign: 'Box-Pick-99-149-299',
  list: [
    {
      description: 'Up to 4 Items',
      imagePath: '/assets/images/brandingPhotos/box-99.png',
      imagePathAlt: '/assets/images/pricing/box-starter.png',
      imagePathExample: '/assets/images/examples/box-starter.png',
      numCategories: 3,
      price: 99,
      value: 150,
      title: 'Starter',
      slug: 'starter',
      frequency: 1,
      budget: 9900,
      featured: true
    }, 
    {
      description: 'Up to 5 Items',
      imagePath: '/assets/images/brandingPhotos/box-149.png',
      imagePathAlt: '/assets/images/pricing/box-medium.png',
      imagePathExample: '/assets/images/examples/box-essentials.png',
      numCategories: 5,
      price: 149,
      value: 250,
      title: 'Essentials',
      slug: 'essentials',
      bestSeller: true,
      frequency: 1,
      budget: 14900,
      featured: true
    }, 
    {
      description: 'Up to 8 Items',
      imagePath: '/assets/images/brandingPhotos/box-299.png',
      imagePathAlt: '/assets/images/pricing/box-fullkit.png',
      imagePathExample: '/assets/images/examples/box-fullkit.png',
      numCategories: 7,
      price: 299,
      value: 450,
      title: 'Full Kit',
      slug: 'full-kit',
      frequency: 1,
      budget: 29900
    },
    {
      description: 'Up to 12 Items',
      imagePath: '/assets/images/brandingPhotos/box-299.png',
      imagePathAlt: '/assets/images/pricing/box-fullkit.png',
      imagePathExample: '/assets/images/examples/box-fullkit.png',
      numCategories: 7,
      price: 499,
      value: 700,
      title: 'Full Kit Plus',
      slug: 'full-kit',
      frequency: 1,
      budget: 49900,
      featured: true
    }
  ]
}];
