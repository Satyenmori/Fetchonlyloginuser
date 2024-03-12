import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Adminroomadd = () => {
  const [room, setRoom] = useState({
    title: "",
    description: "",
    price: "",
    rating: "",
    bed: "",
    bath: "",
    wifi: "",
    images: "",
  });
  const Navigate = useNavigate();
  const handlInput = (e) => {
    let { name, value } = e.target;

    setRoom({ ...room, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5151/room/addroom", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room),
      });
      if (response.ok) {
        alert("New Room Is Add Successfuly");
        const res_data = await response.json();
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
        Navigate("/rooms");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
                      type="string"
                      className="form-control"
                      id="images"
                      name="images"
                      value={room.images}
                      onChange={handlInput}
                      placeholder="Enter image"
                      required
                    />
                    <label for="images">Image</label>
                  </div>
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