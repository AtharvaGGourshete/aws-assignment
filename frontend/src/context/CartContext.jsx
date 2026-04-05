import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem("sporty_cart");
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem("sporty_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems((currentItems) => {
      const existing = currentItems.find((item) => item.id === product.id);

      if (existing) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock || 99) }
            : item
        );
      }

      return [...currentItems, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length > 0 ? 12 : 0;
  const total = subtotal + shipping;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const summary = { subtotal, shipping, total, itemCount };

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQuantity, removeFromCart, clearCart, summary }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
