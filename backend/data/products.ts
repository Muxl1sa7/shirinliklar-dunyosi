export type CakeCategory = 'chocolate' | 'fruit' | 'birthday' | 'wedding' | 'special' | 'diet';
export type DessertCategory = 'macarons' | 'cupcakes' | 'brownies' | 'cookies' | 'donuts' | 'creamy' | 'diet';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  type: 'cake' | 'dessert';
  category: CakeCategory | DessertCategory;
  description: string;
  sizes?: string[];
  flavors?: string[];
  dietFriendly: boolean;
  healthNote: string;
  ingredients: string[];
  storage: string;
}
