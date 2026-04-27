"use client";

import { X, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartItem from './CartItem';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CartDrawer() {
  const { state, toggleCart, clearCart } = useCart();

  const handleClose = () => {
    toggleCart(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const currencySymbol =
    state.items[0]?.currency === 'BDT'
      ? '৳'
      : state.items[0]?.currency === 'GBP'
      ? '£'
      : state.items[0]?.currency === 'EUR'
      ? '€'
      : '$';

  return (
    <>
      {/* Overlay */}
      {state.isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-[calc(100%-1rem)] sm:w-[400px] flex flex-col bg-card shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
          state.isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header - Fixed */}
        <div className="flex-shrink-0 bg-card">
          {/* Title Row */}
          <div className="flex items-center justify-between p-5 pb-3">
            <h2 className="text-xl font-bold text-foreground">
              Cart
              {state.totalItems > 0 && (
                <span className="text-base font-normal text-muted-foreground ml-2">
                  {state.totalItems} {state.totalItems === 1 ? 'Item' : 'Items'}
                </span>
              )}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Message */}
          {state.items.length > 0 && (
            <div className="px-5 pb-4">
              <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 px-3 py-2 rounded-lg">
                <Truck className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium">
                  Congratulations! You have reached free shipping
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Cart Items - Scrollable */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12 px-6">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-6 max-w-[240px]">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button
                onClick={handleClose}
                className="w-full max-w-[200px] bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="px-4 py-2 space-y-1">
              {state.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

          {/* Cart Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-border bg-card p-4 space-y-4">
              {/* Cart Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">
                    {currencySymbol}
                    {state.totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Items</span>
                  <span className="font-medium text-foreground">
                    {state.totalItems}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-foreground pt-2 border-t border-border">
                  <span>Total</span>
                  <span>
                    {currencySymbol}
                    {state.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Link href="/cart" onClick={handleClose}>
                  <Button variant="outline" className="w-full">
                    View Cart
                  </Button>
                </Link>
                <Link href="/checkout" onClick={handleClose}>
                  <Button className="w-full bg-foreground hover:bg-foreground/90 text-background">
                    Checkout
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="w-full text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
      </div>
    </>
  );
}