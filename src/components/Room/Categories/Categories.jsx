import { useSearchParams } from "react-router-dom";
import CategoriesBox from "./CategoriesBox";
import { categories } from "./categoriesData";
import Container from "../../Shared/Container";

const Categories = () => {
  const [params, setParams] = useSearchParams();
  const category = params.get("category");
  return (
    <Container>
      <div className="flex justify-between items-center gap-4 mb-10">
        {categories.map((item) => (
          <CategoriesBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
