import { useContext } from "react";
import "./checkout.style.scss";
import CheckOutItem from "../../components/checkout-item/checkout-item";
import { CartContext } from "../../context/cart.context";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  console.log(cartItems);
  const renderItems = cartItems.map((data) => {
    return <CheckOutItem key={data.id} cartItem={data} />;
  });
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.length ? renderItems : <h1>No item added to cart yet</h1>}
    </div>
  );
};

export default Checkout;
