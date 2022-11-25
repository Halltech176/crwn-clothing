import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // find if the cartItems contains productsToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  console.log(existingCartItem);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  //   return new array with modified cart items
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const increaseItemQuantity = (cartItems, productToIncrease) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToIncrease.id
  );

  console.log(existingCartItem);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToIncrease.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
};

const decreaseItemQuantity = (cartItems, productToDecrease) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToDecrease.id
  );

  console.log(existingCartItem);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToDecrease.id
        ? {
            ...cartItem,
            quantity:
              cartItem.quantity <= 1
                ? (cartItem.quantit = 1)
                : cartItem.quantity - 1,
          }
        : cartItem
    );
  }
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  clearItem: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const increaseQuantity = (productToIncrease) => {
    setCartItems(increaseItemQuantity(cartItems, productToIncrease));
  };
  const decreaseQuantity = (productToIncrease) => {
    setCartItems(decreaseItemQuantity(cartItems, productToIncrease));
  };
  const clearItem = (itemToClear) => {
    setCartItems(clearCartItem(cartItems, itemToClear));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    increaseQuantity,
    decreaseQuantity,
    clearItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
