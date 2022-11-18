import CategoryItem from "../category-item.component";
import "./Directory.style.scss";
import { categoriesData } from "../../../data";
const Directory = () => {
  return (
    <div className="directory-container">
      <CategoryItem category={categoriesData} />
    </div>
  );
};
export default Directory;
