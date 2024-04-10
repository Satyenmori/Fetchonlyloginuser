import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Updateitem = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const { id } = useParams();

  // Fetch food item and its extra items
  const fetchCartById = async () => {
    try {
      const response = await fetch(`http://localhost:5151/cart/${id}`);
      const data = await response.json();
      setCartItems(data.extras);
      // Initialize selectedExtras state with extras from cartItems
      const initialSelectedExtras = data.extras.map((extra) => extra._id);
      setSelectedExtras(initialSelectedExtras);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCartById();
  }, [id]);

  // Function to handle checkbox toggle
  const handleCheckboxChange = (extraId) => {
    // If extraId exists in selectedExtras, remove it; otherwise, add it
    setSelectedExtras((prevSelectedExtras) =>
      prevSelectedExtras.includes(extraId)
        ? prevSelectedExtras.filter((id) => id !== extraId)
        : [...prevSelectedExtras, extraId]
    );
  };

  return (
    <>
      <div className="container mt-5 w-50">
        <div className="card">
          <div className="card-header">
            <h2 className="mb-0 text-primary">Update Extra Items</h2>
          </div>
          <ul className="list-group list-group-flush">
            {cartItems.map((extra) => (
              <li className="list-group-item" key={extra._id}>
                <div className="item-row">
                  <span>{extra.name}</span>
                  <span className="extra-price">+ $ {extra.price}</span>
                  <input
                    type="checkbox"
                    checked={selectedExtras.includes(extra._id)}
                    onChange={() => handleCheckboxChange(extra._id)}
                  />
                </div>
              </li>
            ))}
            <li className="list-group-item mt-3 d-flex justify-content-center">
              <Link className="btn btn-success" to={`/cart/`}>
                Update Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Updateitem;
