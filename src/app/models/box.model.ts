export interface Box {
  description: string;
  imagePath: string;
  imagePathAlt: string;
  imagePathExample: string;
  numCategories: number;
  price: number;
  value: number;
  title: string;
  slug: string;
  bestSeller?: boolean;
  plan_code?: string;
  budget?: number;
  frequency?: number;
  featured?: boolean;
}
