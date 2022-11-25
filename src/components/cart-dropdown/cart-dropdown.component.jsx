import { useContext } from "react";
import "./cart-dropdown.style.scss";
import Button from "../button/button.component";
import { CartContext } from "../../context/cart.context";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";

const CardDropDown = () => {
  const navigate = useNavigate();
  const { cartItems, isCartOpen, setIsCartOpen } = useContext(CartContext);
  const GoToCheckout = () => {
    navigate("/shop/checkout");
    setIsCartOpen(!isCartOpen);
  };

  const renderCarts = cartItems.map((item) => {
    return <CartItem key={item?.id} cartItem={item} />;
  });

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">{renderCarts}</div>
      <Button onClick={GoToCheckout}> CHECKOUT</Button>
    </div>
  );
};

export default CardDropDown;
