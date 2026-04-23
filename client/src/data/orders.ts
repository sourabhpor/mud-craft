import { Order } from '@/types';
import { products } from './products';

export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    items: [
      { product: products[0], quantity: 2 },
      { product: products[3], quantity: 1 },
    ],
    total: 897,
    status: 'delivered',
    date: '2024-12-15',
    address: {
      fullName: 'Rahul Sharma',
      street: '42 MG Road, Sector 12',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302001',
      phone: '9876543210',
    },
    trackingUpdates: [
      { status: 'Order Placed', date: '2024-12-15', description: 'Your order has been confirmed.' },
      { status: 'Packed', date: '2024-12-16', description: 'Items carefully wrapped in protective packaging.' },
      { status: 'Shipped', date: '2024-12-17', description: 'On the way via BlueDart Express.' },
      { status: 'Delivered', date: '2024-12-20', description: 'Delivered to your doorstep.' },
    ],
  },
  {
    id: 'ORD-2024-002',
    items: [
      { product: products[2], quantity: 1 },
    ],
    total: 499,
    status: 'shipped',
    date: '2024-12-28',
    address: {
      fullName: 'Rahul Sharma',
      street: '42 MG Road, Sector 12',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302001',
      phone: '9876543210',
    },
    trackingUpdates: [
      { status: 'Order Placed', date: '2024-12-28', description: 'Your order has been confirmed.' },
      { status: 'Packed', date: '2024-12-29', description: 'Items carefully wrapped.' },
      { status: 'Shipped', date: '2024-12-30', description: 'On the way via DTDC.' },
    ],
  },
  {
    id: 'ORD-2025-003',
    items: [
      { product: products[5], quantity: 2 },
      { product: products[4], quantity: 1 },
    ],
    total: 1497,
    status: 'processing',
    date: '2025-01-02',
    address: {
      fullName: 'Priya Patel',
      street: '15 Lakeview Apartments',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380001',
      phone: '9123456780',
    },
    trackingUpdates: [
      { status: 'Order Placed', date: '2025-01-02', description: 'Your order has been confirmed.' },
    ],
  },
];
