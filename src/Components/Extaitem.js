import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import qs from "qs";

function Extraitem() {
  const [food, setFood] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [Extra, setExtra] = useState([]);
  const { id } = useParams();
  const fetchFoodById = async () => {
    try {
      const response = await fetch(
        `http://localhost:5151/extraitem/${id}/extra`
      );
      const data = await response.json();

      setFood(data);
      if (data) {
        setTotalPrice(data.price);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFoodById();
  }, [id]);

  //Update totalPrice

  useEffect(() => {
    if (food) {
      const extraPrice = Extra.reduce((total, extra) => total + extra.price, 0);
      setTotalPrice(food.price + extraPrice);
    }
  }, [Extra, food]);

  const handleCheckboxChange = (extra) => {
    const isChecked = Extra.find((item) => item._id === extra._id);
    if (isChecked) {
      setExtra(Extra.filter((item) => item._id !== extra._id));
    } else {
      setExtra([...Extra, extra]);
    }
  };
  const addToCart = async (food, extras) => {
    try {
      const response = await fetch("http://localhost:5151/cart/addtocart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ food, extras }),
      });
      const data = await response.json();
      alert("Data Successfully addToCart");
      console.log(data);
    } catch (error) {
      console.log("Error adding cart", error);
    }
  };
  return (
    <>
      {food && (
        <div className="container mt-5 w-50">
          <div className="card">
            <div className="card-header">
              <h2 className="mb-0">
                {food.name} • $ {food.price}
              </h2>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item h4">Extra Items</li>
              {/* Placeholder for displaying extra items */}
              {food.extraitem.map((extra) => (
                <li key={extra._id} className="list-group-item">
                  <div className="item-row">
                    <span>{extra.name}</span>
                    <span className="extra-price">+ ${extra.price}</span>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(extra)}
                    />
                  </div>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between align-items-center mt-3">
                <h3 className="">Total $ {totalPrice}</h3>
                <Link
                  className="btn btn-success"
                  to={`/cart/${food._id}?${qs.stringify({
                    extras: Extra.map((extra) => extra.name),
                    totalPrice: totalPrice,
                  })}`}
                  onClick={() => addToCart(food, food.extraitem)}
                >
                  Add To Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Extraitem;
