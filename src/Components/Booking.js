import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/store";

const Booking = () => {
  const { id } = useParams();
  const [rooms, setRoom] = useState([]);
  const [book, setBook] = useState({
    username: "",
    email: "",
    checkin: "",
    checkout: "",
    adult: "",
    child: "",
    roomname: "",
    request: "",
  });
  const { user } = useAuth();
  const Navigate=useNavigate()

  const fetchRoomsById = async () => {
    try {
      const response = await fetch(`http://localhost:5151/room/${id}`);
      const data = await response.json();
      setRoom(data);
      console.log(rooms);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRoomsById();
  }, [id]);

  // Booking Room

  const handlInput = (e) => {
    console.log(e);
    let { name, value } = e.target;

    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5151/booking/bookroom", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      if (response.ok) {
        alert("Thenk You Your Room Is Booking !!!!");
        const res_data = await response.json();
        setBook({
          username: "",
          email: "",
          checkin: "",
          checkout: "",
          adult: "",
          child: "",
          roomname: "",
          request: "",
        });
        Navigate("/rooms")
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">
              Room Booking
            </h6>
            <h1 className="mb-5">
              Book A{" "}
              <span className="text-primary text-uppercase">Luxury Room</span>
            </h1>
          </div>
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="row g-3">
                {rooms.images &&
                  rooms.images.slice(1).map((image, index) => (
                    <div key={index} className="col-6 text-end">
                      <img
                        className="img-fluid rounded w-100 h-100 wow zoomIn"
                        data-wow-delay="0.1s"
                        src={`http://localhost:5151/${image}`}
                        alt={`Image ${index + 1}`}
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="wow fadeInUp" data-wow-delay="0.2s">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          id="username"
                          placeholder="Your Name"
                          value={book.username}
                          onChange={handlInput}
                          required
                        />
                        <label for="name">{user.username}</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="Your Email"
                          value={book.email}
                          onChange={handlInput}
                          required
                        />
                        <label for="email">{user.email}</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="form-floating date"
                        id="date3"
                        data-target-input="nearest"
                      >
                        <input
                          type="date"
                          className="form-control datetimepicker-input"
                          name="checkin"
                          id="checkin"
                          placeholder="Check In"
                          data-target="#date3"
                          data-toggle="datetimepicker"
                          value={book.checkin}
                          onChange={handlInput}
                          required
                        />
                        <label for="checkin">Check In</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="form-floating date"
                        id="date4"
                        data-target-input="nearest"
                      >
                        <input
                          type="date"
                          className="form-control datetimepicker-input"
                          name="checkout"
                          id="checkout"
                          placeholder="Check Out"
                          data-target="#date4"
                          data-toggle="datetimepicker"
                          value={book.checkout}
                          onChange={handlInput}
                          required
                        />
                        <label for="checkout">Check Out</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          name="adult"
                          id="adult"
                          value={book.adult}
                          onChange={handlInput}
                          required
                        >
                          <option value="1">Adult 1</option>
                          <option value="2">Adult 2</option>
                          <option value="3">Adult 3</option>
                        </select>
                        <label for="select1">Select Adult</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          name="child"
                          id="child"
                          value={book.child}
                          onChange={handlInput}
                          required
                        >
                          <option value="1">Child 1</option>
                          <option value="2">Child 2</option>
                          <option value="3">Child 3</option>
                        </select>
                        <label for="select2">Select Child</label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="roomname"
                          id="roomname"
                          placeholder="Room Name"
                          value={rooms.roomname}
                          onChange={handlInput}
                          required
                        />
                        <label for="name">{rooms.title}</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Special Request"
                          name="request"
                          id="request"
                          value={book.request}
                          onChange={handlInput}
                        ></textarea>
                        <label for="message">Special Request</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
