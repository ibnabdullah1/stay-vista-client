import { Helmet } from "react-helmet-async";
import Categories from "../../components/Room/Categories/Categories";
import Room from "../../components/Room/Room";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>StayVista | Vacation Homes & Condo Rentals</title>
      </Helmet>
      <Categories />
      <Room />
    </div>
  );
};

export default Home;
