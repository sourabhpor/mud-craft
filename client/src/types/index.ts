export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  specifications: Record<string, string>;
  featured?: boolean;
}

export type Category = 'tea-cups' | 'plates' | 'water-pots' | 'kadai' | 'decorative';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  date: string;
  address: Address;
  trackingUpdates: TrackingUpdate[];
}

export interface TrackingUpdate {
  status: string;
  date: string;
  description: string;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  isAdmin?: boolean;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  'tea-cups': 'Tea Cups',
  'plates': 'Plates',
  'water-pots': 'Water Pots',
  'kadai': 'Kadai',
  'decorative': 'Decorative Items',
};
