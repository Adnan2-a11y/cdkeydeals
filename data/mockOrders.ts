import { Order } from '@/types/auth';

export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    productName: 'Steam Gift Card $50',
    productImage: 'https://images.unsplash.com/photo-1612287223928-6c1f48f8a4b2?w=100&h=100&fit=crop',
    price: 45.99,
    currency: 'USD',
    status: 'delivered',
    date: '2024-01-15',
    quantity: 1,
  },
  {
    id: 'ORD-2024-002',
    productName: 'PlayStation Plus 12-Month Subscription',
    productImage: 'https://images.unsplash.com/photo-1606144041627-5c2f8d6e1b2e?w=100&h=100&fit=crop',
    price: 59.99,
    currency: 'USD',
    status: 'delivered',
    date: '2024-01-12',
    quantity: 1,
  },
  {
    id: 'ORD-2024-003',
    productName: 'Xbox Game Pass Ultimate - 3 Months',
    productImage: 'https://images.unsplash.com/photo-1621255904981-6a497f6f4e2d?w=100&h=100&fit=crop',
    price: 39.99,
    currency: 'USD',
    status: 'pending',
    date: '2024-01-18',
    quantity: 1,
  },
  {
    id: 'ORD-2024-004',
    productName: 'Nintendo eShop Card $25',
    productImage: 'https://images.unsplash.com/photo-1578662996442-48f6d10b6c9d?w=100&h=100&fit=crop',
    price: 22.99,
    currency: 'USD',
    status: 'delivered',
    date: '2024-01-10',
    quantity: 2,
  },
  {
    id: 'ORD-2024-005',
    productName: 'EA Sports FC 24 - Steam Key',
    productImage: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=100&h=100&fit=crop',
    price: 49.99,
    currency: 'USD',
    status: 'processing',
    date: '2024-01-19',
    quantity: 1,
  },
  {
    id: 'ORD-2024-006',
    productName: 'Spotify Premium 6 Months',
    productImage: 'https://images.unsplash.com/photo-1614680376593-902f71a52367?w=100&h=100&fit=crop',
    price: 29.99,
    currency: 'USD',
    status: 'delivered',
    date: '2024-01-08',
    quantity: 1,
  },
  {
    id: 'ORD-2024-007',
    productName: 'Netflix Gift Card $30',
    productImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e5d0?w=100&h=100&fit=crop',
    price: 27.99,
    currency: 'USD',
    status: 'delivered',
    date: '2024-01-05',
    quantity: 1,
  },
  {
    id: 'ORD-2024-008',
    productName: 'Minecraft Java Edition Key',
    productImage: 'https://images.unsplash.com/photo-1587573089734-09cb69c0bc2d?w=100&h=100&fit=crop',
    price: 29.99,
    currency: 'USD',
    status: 'pending',
    date: '2024-01-20',
    quantity: 1,
  },
];

export const getStatusColor = (status: Order['status']): string => {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusLabel = (status: Order['status']): string => {
  switch (status) {
    case 'delivered':
      return 'Delivered';
    case 'pending':
      return 'Pending';
    case 'processing':
      return 'Processing';
    case 'cancelled':
      return 'Cancelled';
    default:
      return status;
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
