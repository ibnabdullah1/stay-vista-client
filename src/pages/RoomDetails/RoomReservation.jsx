import { useState } from "react";
import Calender from "./Calender";
import Button from "../../components/Button/Button";
import { formatDistance } from "date-fns";
import BookingModal from "../../components/Modal/BookingModal";
import useAuth from "../../hooks/useAuth";

const RoomReservation = ({ room }) => {
  let [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const [value, setValue] = useState({
    startDate: new Date(room?.from),
    endDate: new Date(room?.to),
    key: "selection",
  });

  const totalDays = parseInt(
    formatDistance(new Date(room?.to), new Date(room?.from)).split(" ")[0]
  );
  const totalPrice = totalDays * room?.price;
  const handleSelect = (ranges) => {
    setValue({ ...value });
  };
  const [bookingInfo, setBookingInfo] = useState({
    guest: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    },
    host: room?.host?.email,
    location: room?.location,
    price: totalPrice,
    to: value.endDate,
    from: value.startDate,
    title: room?.title,
    roomId: room?._id,
    image: room?.image,
  });
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {room?.price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <div className="flex justify-center">
        <Calender handleSelect={handleSelect} value={value} />
      </div>

      <hr />
      <div className="p-4">
        <Button
          disabled={room?.booked === true}
          onClick={() => setIsOpen(true)}
          label="Reserve"
        />
        {room?.booked === true && (
          <p className="text-rose-400 font-semibold text-lg">
            Room is not available
          </p>
        )}
      </div>
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
      <BookingModal
        closeModal={closeModal}
        isOpen={isOpen}
        bookingInfo={bookingInfo}
      />
    </div>
  );
};

export default RoomReservation;
