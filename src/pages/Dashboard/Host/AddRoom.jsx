import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { imageUpload } from "../../../Api/utilis";
import { addRoom } from "../../../Api/rooms";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import AddRoomForm from "../../../components/Form/AddRoomForm";

const AddRoom = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const category = form.category.value;
    const title = form.title.value;
    const to = dates.endDate;
    const from = dates.startDate;
    const price = parseInt(form.price.value);
    const guests = parseInt(form.total_guest.value);
    const bathrooms = parseInt(form.bathrooms.value);
    const description = form.description.value;
    const bedrooms = parseInt(form.bedrooms.value);
    const image = form.image.files[0];
    const host = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };
    const image_url = await imageUpload(image);

    const roomData = {
      location,
      category,
      title,
      to,
      from,
      price,
      guests,
      bathrooms,
      bedrooms,
      host,
      description,
      image: image_url?.data?.display_url,
    };

    try {
      const data = await addRoom(roomData);
      console.log(data);
      setUploadButtonText("Uploaded!");
      toast.success("Room Added successfully!");
      navigate("/dashboard/my-listings");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }

    console.table(roomData);
    // console.log(roomData);
  };

  // Handle date change from react-date-range calender
  const handleDates = (ranges) => {
    console.log(ranges);
    setDates(ranges.selection);
  };

  // Handle Image button text
  const handleImageChange = (image) => {
    setUploadButtonText(image.name);
  };

  return (
    <div>
      <Helmet>
        <title>Add Room | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddRoomForm
        handleSubmit={handleSubmit}
        handleDates={handleDates}
        dates={dates}
        handleImageChange={handleImageChange}
        loading={loading}
        uploadButtonText={uploadButtonText}
      />
    </div>
  );
};

export default AddRoom;
