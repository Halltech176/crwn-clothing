import { createContext, useState, useEffect } from "react";

// Add Cart item function
const addCartItem = (cartItems, productToAdd) => {
  // find if the cartItems contains productsToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

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

// Increase Item Quantity function

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

// Decrease Item quantity function

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

// Remove cart item completly

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

// Cart context object
export const CartContext = createContext({
  isCartOpen: false,
  cartCount: 0,
  cartTotal: 0,
  cartItems: [],
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  clearItem: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
    const totals = cartItems.map((data, index) => {
      return data.price * data.quantity;
    });
    if (totals.length) {
      const itemTotals = totals?.reduce((acc, curr) => acc + curr);
      return setCartTotal(itemTotals);
    } else {
      return setCartTotal(0);
    }
  }, [cartItems]);

  useEffect(() => {
    const totals = cartItems.map((data, index) => {
      return data.price * data.quantity;
    });
    if (totals.length) {
      const itemTotals = totals?.reduce((acc, curr) => acc + curr);
      return setCartTotal(itemTotals);
    } else {
      return setCartTotal(0);
    }
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
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
