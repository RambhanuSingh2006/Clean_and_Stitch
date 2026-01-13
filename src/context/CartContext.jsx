import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  /* ✅ ADD ITEM (STRICT FORMAT) */
  const addItem = (item) => {
    setCart((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        itemName: item.itemName,
        serviceType: item.serviceType,
        quantity: Number(item.quantity),
        pricePerItem: Number(item.pricePerItem),
        totalPrice: Number(item.quantity) * Number(item.pricePerItem),
      },
    ]);
  };

  /* REMOVE ITEM */
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  /* CLEAR CART */
  const clearCart = () => setCart([]);

  /* TOTAL AMOUNT */
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeFromCart,
        clearCart,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);








