export type CakeCategory = 'chocolate' | 'fruit' | 'birthday' | 'wedding' | 'special' | 'diet';
export type DessertCategory = 'macarons' | 'cupcakes' | 'brownies' | 'cookies' | 'donuts' | 'creamy';

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

export interface CartItem {
  product: Product;
  size?: string;
  flavor?: string;
  quantity: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}
