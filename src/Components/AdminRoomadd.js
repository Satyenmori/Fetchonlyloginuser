import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/store";
import axios from "axios";

const Adminroomadd = () => {
  const [room, setRoom] = useState({
    title: "",
    description: "",
    price: "",
    rating: "",
    bed: "",
    bath: "",
    wifi: "",
    images: [],
  });
  const [imge, setImge] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImage = (e) => {
    const files = e.target.files;
    const selectedImagesArray = Array.from(files);
    setImge(prevState => [...prevState, ...selectedImagesArray]); 
    setSelectedImages(selectedImagesArray);
  };

  const Navigate = useNavigate();
  const { token } = useAuth();
  const handlInput = (e) => {
    let { name, value, file } = e.target;

    if (name === "images") {
      value = file;
    }

    setRoom({ ...room, [name]: value });
  };

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", room.title);
      formData.append("description", room.description);
      formData.append("price", room.price);
      formData.append("rating", room.rating);
      formData.append("bed", room.bed);
      formData.append("bath", room.bath);
      formData.append("wifi", room.wifi);
      for (let x of imge) {
        formData.append("images", x);
      }
      const response = await axios.post(
        "http://localhost:5151/admin/addroom",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("New Room Is Add Successfuly");
      setRoom({
        title: "",
        description: "",
        price: "",
        rating: "",
        bed: "",
        bath: "",
        wifi: "",
        images: "",
      });
      setSelectedImages([]);
      Navigate("/rooms");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid py-5 h-75">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-lg-6">
          <div className="wow fadeInUp" data-wow-delay="0.2s">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="row g-3">
                <div className="col-md-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={room.title}
                      onChange={handlInput}
                      placeholder="Room title"
                      required
                    />
                    <label for="title">Room Title</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      placeholder="Special Request"
                      id="description"
                      name="description"
                      value={room.description}
                      onChange={handlInput}
                      required
                    ></textarea>
                    <label for="description">Room Description</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      value={room.price}
                      onChange={handlInput}
                      placeholder="Price"
                      required
                    />
                    <label for="price">Price</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="rating"
                      name="rating"
                      value={room.rating}
                      onChange={handlInput}
                      placeholder="Enter Rating"
                      required
                    />
                    <label for="rating">Rating</label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="bed"
                      name="bed"
                      value={room.bed}
                      onChange={handlInput}
                      placeholder="Enter Bed"
                      required
                    />
                    <label for="bed">Bed</label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="bath"
                      name="bath"
                      value={room.bath}
                      onChange={handlInput}
                      placeholder="Enter Bed"
                      required
                    />
                    <label for="bath">Bath</label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-floating">
                    <input
                      type="string"
                      className="form-control"
                      id="wifi"
                      name="wifi"
                      value={room.wifi}
                      onChange={handlInput}
                      placeholder="Enter Wifi"
                      required
                    />
                    <label for="wifi">Wifi</label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-floating">
                    <input
                      type="file"
                      className="form-control"
                      id="images"
                      name="images"
                      onChange={(e) => handleImage(e)}
                      multiple
                      required
                    />
                    <label for="images">images</label>
                  </div>
                </div>
                {/* Display selected images */}
                <div className="col-md-12">
                  {selectedImages.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Selected Image ${index}`}
                      style={{ width: "200px", height: "auto", margin: "5px" }}
                    />
                  ))}
                </div>
                <div className="col-12">
                  <button className="btn btn-primary w-100  py-3" type="submit">
                    Add Room
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminroomadd;
