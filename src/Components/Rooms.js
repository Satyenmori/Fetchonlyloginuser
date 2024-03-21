import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Rooms = () => {
  const [rooms, setRoom] = useState([]);

  const fetchRooms = async () => {
    try {
      const roomResponse = await fetch("http://localhost:5151/room/");
      const roomData = await roomResponse.json();

      const bookingResponse = await fetch("http://localhost:5151/booking/");
      const bookingData = await bookingResponse.json();

      // Compare room data with booking data to set booking status
      const updatedRooms = roomData.map((room) => {
        const isRoomBooked = bookingData.some(
          (booking) => booking.roomname === room.title &&
          new Date(booking.checkout)>new Date()
        );
        return { ...room, isBooked: isRoomBooked };
      });

      setRoom(updatedRooms);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <>
      <div classNameName="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            {/* <h6 className="section-title text-center text-primary text-uppercase">Our Rooms</h6> */}
            <h1 className="mb-5 mt-2">
              Explore Our{" "}
              <span className="text-primary text-uppercase">Rooms</span>
            </h1>
          </div>
          <div className="row g-4">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="room-item shadow rounded overflow-hidden">
                  <div className="position-relative">
                    <img
                      className="img-fluid room-image"
                      src={`http://localhost:5151/${room.images[0]}`}
                      alt="thumbnail"
                    />
                    <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                      $ {room.price} / Per Night
                    </small>
                  </div>
                  <div className="p-4 mt-2">
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">Room No: {room.title}</h5>
                      <div className="ps-2">
                        <small className="fa fa-star text-primary"></small>
                        <small className="fa fa-star text-primary"></small>
                        <small className="fa fa-star text-primary"></small>
                        <small className="fa fa-star text-primary"></small>
                        <small className="fa fa-star text-primary"></small>
                      </div>
                    </div>
                    <div className="d-flex mb-3">
                      <small className="border-end me-3 pe-3">
                        <i className="fa fa-bed text-primary me-2"></i>
                        {room.bed} Bed
                      </small>
                      <small className="border-end me-3 pe-3">
                        <i className="fa fa-bath text-primary me-2"></i>
                        {room.bath} Bath
                      </small>
                      <small>
                        <i className="fa fa-wifi text-primary me-2"></i>Wifi:{" "}
                        {room.wifi}
                      </small>
                    </div>
                    <p className="text-body mb-3">{room.description}</p>
                    <div className="d-flex justify-content-end">
                      {room.isBooked ? (
                        <button className="btn btn-danger align-item-center">This room is Booked.</button>
                      ) : (
                        <Link
                          class="btn btn-sm btn-primary rounded py-2 px-4"
                          to={`/booking/${room._id}`}
                        >
                          View Detil
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Rooms;
