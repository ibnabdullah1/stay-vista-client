import { useNavigate, useSearchParams } from "react-router-dom";
import qs from "query-string";
const CategoriesBox = ({ label, icon: Icon, selected }) => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const handleClick = () => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
      const updateQuery = { ...currentQuery, category: label };
      const url = qs.stringifyUrl({
        url: "/",
        query: updateQuery,
      });
      navigate(url);
    }
  };
  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center p-3 border-b-2
      justify-center gap-2 hover:text-neutral-800  transition cursor-pointer
      ${selected ? "border-b-neutral-800  text-neutral-800" : ""} `}
    >
      <Icon className="text-3xl" />

      <div className="font-semibold text-sm"> {label}</div>
    </div>
  );
};

export default CategoriesBox;
