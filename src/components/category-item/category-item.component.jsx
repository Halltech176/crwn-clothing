import { render } from "react-dom";
import "./category-item.styles.scss";

const CategoryItem = ({ category }) => {
  const { imageUrl, title, id } = category;
  const renderCategories = category.map(({ title, id, imageUrl }) => {
    return (
      <div key={id} className="category-container">
        <div
          className="background-image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="category-body-container">
          <h2>{title}</h2>
          <p>Show Now</p>
        </div>
      </div>
    );
  });

  return <>{renderCategories}</>;
};

export default CategoryItem;
