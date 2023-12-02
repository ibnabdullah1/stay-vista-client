import { useEffect, useState } from "react";
import Card from "./card";
import Container from "../Shared/Container";
import { DotLoader } from "react-spinners";
import { useSearchParams } from "react-router-dom";
import Heading from "../Shared/Heading";
import { getAllRooms } from "../../Api/rooms";

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useSearchParams();
  const category = params.get("category");
  useEffect(() => {
    setIsLoading(true);
    getAllRooms().then((data) => {
      if (category) {
        const filtered = data.filter((room) => room.category === category);
        setIsLoading(false);
        setRooms(filtered);
      } else {
        setIsLoading(false);
        setRooms(data);
      }
    });
  }, [category]);
  return (
    <Container>
      {isLoading ? (
        <div className="min-h-[50vh] flex justify-center items-center">
          <DotLoader color="#36d7b7" />
        </div>
      ) : (
        <div>
          {rooms && rooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {rooms.map((room) => (
                <Card key={room._id} room={room} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center min-h-[60vh] items-center">
              <Heading
                center={true}
                title="No Rooms Available In this Category"
                subtitle="Please Select Other Categories"
              />
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default Room;
