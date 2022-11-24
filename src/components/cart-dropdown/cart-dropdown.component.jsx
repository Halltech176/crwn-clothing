import "./cart-dropdown.style.scss";
import Button from "../button/button.component";

const CardDropDown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items"></div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CardDropDown;
