"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '@/types/product';

// Wishlist item (stores minimal product info)
export interface WishlistItem {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  image?: string;
  category?: string;
  badge?: string;
  badgeColor?: string;
}

// Wishlist state interface
export interface WishlistState {
  items: WishlistItem[];
  totalItems: number;
}

// Wishlist action types
export type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; payload: WishlistItem }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number }
  | { type: 'TOGGLE_WISHLIST'; payload: WishlistItem }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; payload: WishlistItem[] };

// Initial state
const initialState: WishlistState = {
  items: [],
  totalItems: 0,
};

// Wishlist reducer
function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) return state;

      const newItems = [...state.items, action.payload];
      return {
        ...state,
        items: newItems,
        totalItems: newItems.length,
      };
    }

    case 'REMOVE_FROM_WISHLIST': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: newItems,
        totalItems: newItems.length,
      };
    }

    case 'TOGGLE_WISHLIST': {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        const newItems = state.items.filter(item => item.id !== action.payload.id);
        return {
          ...state,
          items: newItems,
          totalItems: newItems.length,
        };
      } else {
        const newItems = [...state.items, action.payload];
        return {
          ...state,
          items: newItems,
          totalItems: newItems.length,
        };
      }
    }

    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: [],
        totalItems: 0,
      };

    case 'LOAD_WISHLIST':
      return {
        ...state,
        items: action.payload,
        totalItems: action.payload.length,
      };

    default:
      return state;
  }
}

// Wishlist context interface
interface WishlistContextType {
  state: WishlistState;
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  toggleWishlist: (product: WishlistItem) => void;
  clearWishlist: () => void;
  isInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Wishlist provider component
export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist);
        dispatch({ type: 'LOAD_WISHLIST', payload: parsedWishlist });
      }
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [state.items]);

  const addToWishlist = (product: WishlistItem) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  const removeFromWishlist = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  };

  const toggleWishlist = (product: WishlistItem) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (id: number): boolean => {
    return state.items.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        state,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// Hook to use wishlist context
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

// Helper function to convert Product to WishlistItem
export function productToWishlistItem(product: Product): WishlistItem {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    originalPrice: product.originalPrice,
    currency: product.currency,
    image: product.image,
    category: product.category,
    badge: product.badge,
    badgeColor: product.badgeColor,
  };
}
