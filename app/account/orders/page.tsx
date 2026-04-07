"use client";

import { useState } from 'react';
import { mockOrders, getStatusColor, getStatusLabel } from '@/data/mockOrders';
import { Order } from '@/types/auth';
import OrderCard from '@/components/account/OrderCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Filter } from 'lucide-react';

export default function OrdersPage() {
  const [filter, setFilter] = useState<Order['status'] | 'all'>('all');

  const filteredOrders =
    filter === 'all'
      ? mockOrders
      : mockOrders.filter((order) => order.status === filter);

  const filterOptions: { value: Order['status'] | 'all'; label: string }[] = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-500 mt-1">View and track your order history</p>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-400" />
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                variant={filter === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(option.value)}
                className={
                  filter === option.value
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : ''
                }
              >
                {option.label}
                {option.value !== 'all' && (
                  <span className="ml-1 text-xs opacity-70">
                    ({mockOrders.filter((o) => o.status === option.value).length})
                  </span>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-500 mb-6">
                {filter === 'all'
                  ? "You haven't placed any orders yet."
                  : `No ${filter} orders found.`}
              </p>
              <div className="flex items-center justify-center gap-3">
                {filter !== 'all' && (
                  <Button variant="outline" onClick={() => setFilter('all')}>
                    View All Orders
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Order Summary */}
      {filteredOrders.length > 0 && (
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-4">
                <span className="text-gray-500">
                  Showing {filteredOrders.length} of {mockOrders.length} orders
                </span>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${getStatusColor('delivered').split(' ')[0]}`} />
                  Delivered: {mockOrders.filter((o) => o.status === 'delivered').length}
                </span>
                <span className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${getStatusColor('pending').split(' ')[0]}`} />
                  Pending: {mockOrders.filter((o) => o.status === 'pending').length}
                </span>
                <span className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${getStatusColor('processing').split(' ')[0]}`} />
                  Processing: {mockOrders.filter((o) => o.status === 'processing').length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
