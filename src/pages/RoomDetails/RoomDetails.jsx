import { useLoaderData } from "react-router-dom";
import Container from "../../components/Shared/Container";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import RoomInfo from "./RoomInfo";
import RoomReservation from "./RoomReservation";

const RoomDetails = () => {
  const room = useLoaderData();
  return (
    <Container>
      <Helmet>
        <title>{room?.title}</title>
      </Helmet>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col mb-6 gap-6">
          <Header room={room} />
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-7">
          <RoomInfo room={room} />

          <div className="md:col-span-3 order-first md:order-last">
            <RoomReservation room={room} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RoomDetails;
