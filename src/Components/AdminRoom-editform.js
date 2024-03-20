import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RoomEditform = () => {
  const { id } = useParams();
  const [room, setRoom] = useState({});
  const [image, setImge] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const Nevigate = useNavigate();

  // fetch Room dataById
  const fetchRoomsById = async () => {
    try {
      const response = await fetch(`http://localhost:5151/room/${id}`);
      const data = await response.json();
      setRoom(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRoomsById();
  }, [id]);

  // edit logic

  const handleImage = (e) => {
    const files = e.target.files;
    const selectedImagesArray = Array.from(files);
    setSelectedImages((prevImages) => [...prevImages, ...selectedImagesArray]);
  };
  // Images Delete Logic
  const handleDeleteImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  const handleInput = (e) => {
    const { name, value, file } = e.target;

    if (name === "images") {
      value = file;
    }

    setRoom({ ...room, [name]: value });
  };

  const handleSubmit = async (e) => {
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
      for (let x of selectedImages) {
        formData.append("images", x);
      }
      const response = await fetch(
        `http://localhost:5151/admin/editroom/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (response.ok) {
        alert("Room update Successfuly");
        Nevigate("/rooms");
      } else {
        console.log("Room Update Faild");
      }
    } catch (error) {
      console.error("Faild Room Update", error);
    }
  };

  return (
    <>
      <div className="container-fluid py-5 h-75">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-lg-6">
            <div className="wow fadeInUp" data-wow-delay="0.2s">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={room.title}
                        onChange={handleInput}
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
                        onChange={handleInput}
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
                        onChange={handleInput}
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
                        onChange={handleInput}
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
                        onChange={handleInput}
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
                        onChange={handleInput}
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
                        onChange={handleInput}
                        placeholder="Enter Wifi"
                        required
                      />
                      <label for="wifi">Wifi</label>
                    </div>
                  </div>

                  {/* Images..................... */}
                  <div className="col-md-12 d-flex flex-wrap">
                    <div className="row g-3">
                      {room.images &&
                        room.images.map((image, index) => (
                          <div key={index} className="col-4 text-center">
                            <img
                              className="img-fluid rounded w-100 wow zoomIn"
                              data-wow-delay="0.1s"
                              src={`http://localhost:5151/${image}`}
                              alt={`Image ${index + 1}`}
                            />
                            <button
                            type="button"
                              className="delete mt-1"
                              onClick={() => handleDeleteImage(index)}
                            >
                              <i className="fa-solid fa-trash fa"></i>
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="file"
                        className="form-control"
                        id="images"
                        name="images"
                        onChange={handleImage}
                        multiple
                      />
                      <label for="images">images</label>
                    </div>
                  </div>
                  {/* Display selected images */}
                  <div className="col-md-12 d-flex flex-wrap">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="position-relative">
                        <img
                          key={index}
                          src={URL.createObjectURL(image)}
                          alt={`Selected Image ${index}`}
                          style={{
                            width: "220px",
                            height: "110px",
                            margin: "5px",
                          }}
                        />
                        <button
                          type="button"
                          className="btn btn-danger btn-sm position-absolute  end-0"
                          onClick={() => handleDeleteImage(index)}
                        >
                          <i className="fa-solid fa-trash fa"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="col-12 mt-5">
                    <button
                      className="btn btn-primary w-100  py-3"
                      type="submit"
                    >
                      Edit Room
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomEditform;
