import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Updateitem = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState(new Set()); // Use Set to store selected extra item IDs

  const { id } = useParams();

  const fetchCartById = async () => {
    try {
      const response = await fetch(
        `http://localhost:5151/extraitem/${id}/extra`
      );
      const data = await response.json();
      setCartItems(data.extraitem);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartById();
  }, [id]);

  useEffect(() => {
    // Update selectedExtras when cartItems change
    const selectedExtraIds = new Set(cartItems.map((extra) => extra._id));
    setSelectedExtras(selectedExtraIds);
  }, [cartItems]);

  // Function to handle checkbox toggle
  const handleCheckboxChange = (extraId) => {
    const newSelectedExtras = new Set(selectedExtras);
    if (newSelectedExtras.has(extraId)) {
      newSelectedExtras.delete(extraId);
    } else {
      newSelectedExtras.add(extraId);
    }
    setSelectedExtras(newSelectedExtras);
  };

  const updateCart = async () => {
    try {
      const response = await fetch(
        `http://localhost:5151/cart/updatecart/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ extras: Array.from(selectedExtras) }), // Convert Set to Array
        }
      );
      if (response.ok) {
        console.log("Cart updated successfully");
      } else {
        console.log("Failed to update cart");
      }
    } catch (error) {
      console.log("Error updating cart:", error);
    }
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
                    onChange={() => handleCheckboxChange(extra._id)}
                    checked={
                      selectedExtras.has(extra._id) ||
                      cartItems.find((item) => item._id === extra._id)
                    } // Check if the extra is selected or already in the cart
                  />
                </div>
              </li>
            ))}
            <li className="list-group-item mt-3 d-flex justify-content-center">
              <button className="btn btn-success" onClick={updateCart}>
                Update Cart
              </button>
              <Link className="btn btn-primary ml-2" to={`/cart/`}>
                Back to Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Updateitem;
