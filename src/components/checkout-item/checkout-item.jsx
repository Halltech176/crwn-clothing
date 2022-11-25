import "./checkout-item.style.scss";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
const CheckoutItem = ({ cartItem }) => {
  const { imageUrl, name, quantity, price } = cartItem;
  const { increaseQuantity, decreaseQuantity, clearItem } =
    useContext(CartContext);
  const handleIncrease = () => increaseQuantity(cartItem);

  const handleDecrease = () => decreaseQuantity(cartItem);

  const handleItemClear = () => clearItem(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name"> {name} </span>
      <span className="quantity">
        <div className="arrow" onClick={handleDecrease}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={handleIncrease}>
          &#10095;
        </div>
      </span>
      <span className="price"> {price * quantity}</span>
      <div className="remove-button" onClick={handleItemClear}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
