import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CartItem, Product } from '../types';
import { getPriceForSize } from '../lib/pricing';

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string, flavor?: string) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity = 1, size?: string, flavor?: string) => {
    setItems((prev) => [...prev, { product, quantity, size, flavor }]);
  };

  const removeFromCart = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (sum, item) => sum + getPriceForSize(item.product.price, item.size) * item.quantity,
    0,
  );
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
