import { useContext } from "react";
import { ProductContext } from "../../context/product.context";
import ProductCard from "../../components/product-card/product-card";
import "./shop.style.scss";

const Shop = () => {
  const { products } = useContext(ProductContext);

  const renderData = products.map((product) => {
    return <ProductCard key={product.id} product={product} />;
  });
  return <div className="products-container">{renderData}</div>;
};

export default Shop;
