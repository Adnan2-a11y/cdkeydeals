"use client";

import { Order } from '@/types/auth';
import { getStatusColor, getStatusLabel, formatDate } from '@/data/mockOrders';
import { Package, ExternalLink } from 'lucide-react';

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
          {order.productImage ? (
            <img
              src={order.productImage}
              alt={order.productName}
              className="w-full h-full object-cover"
            />
          ) : (
            <Package className="w-8 h-8 text-gray-400" />
          )}
        </div>

        {/* Order Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3 className="font-semibold text-gray-900 truncate">
                {order.productName}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Order ID: <span className="font-mono">{order.id}</span>
              </p>
            </div>
            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                order.status
              )}`}
            >
              {getStatusLabel(order.status)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
            <div>
              <span className="text-gray-500">Price:</span>{' '}
              <span className="font-semibold text-gray-900">
                ${order.price.toFixed(2)}
              </span>
              {order.quantity && order.quantity > 1 && (
                <span className="text-gray-500"> x {order.quantity}</span>
              )}
            </div>
            <div>
              <span className="text-gray-500">Date:</span>{' '}
              <span className="text-gray-900">{formatDate(order.date)}</span>
            </div>
          </div>

          {/* View Details Button */}
          <div className="mt-4">
            <button className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium">
              View Details
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
