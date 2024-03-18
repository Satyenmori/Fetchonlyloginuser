import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RoomEditform = () => {
  const { id } = useParams();
  const [room, setRoom] = useState({});

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

  const deletephotos = () => {};
  return (
    <>
      <div className="container-fluid py-5 h-75">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-lg-6">
            <div className="wow fadeInUp" data-wow-delay="0.2s">
              <form>
                <div className="row g-3">
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={room.title}
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
                              className="delete mt-1"
                              onClick={() => deletephotos(room._id)}
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
                        multiple
                      />
                      <label for="images">images</label>
                    </div>
                  </div>
                  <div className="col-6 mt-5">
                    <button
                      className="btn btn-primary w-100  py-3"
                      type="submit"
                    >
                      Edit Room
                    </button>
                  </div>
                  <div className="col-6 mt-5">
                    <button className="btn btn-danger w-100  py-3" type="Delete">
                      Delete Room
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
