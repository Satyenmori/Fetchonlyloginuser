import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import qs from "qs";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { id } = useParams();

  const { extras, totalPrice } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  // Fetch food item and its extra items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:5151/cart");
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.log("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

  const handleDeleteItem = async (itemId) => {
    try {
      await fetch(`http://localhost:5151/cart/deletecart/${itemId}`, {
        method: "DELETE",
      });
      alert("Item Successfuly Deleted")
      setCartItems(cartItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.log("Error deleting item from cart:", error);
    }
  };

  return (
    <>
      <div className="container w-75 mt-5">
        <div className="span12">
          <div className="well well-small">
            <h1>Cart</h1>
            <hr className="soften" />

            <table className="table table-bordered table-condensed mt-4">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Food Item</th>
                  <th>Description</th>
                  <th>Unit price</th>
                  <th>Extras</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img width="100" src={item.img} alt={item.name} />
                    </td>
                    <td>
                      {item.name}
                      <br />
                      Category: {item.category}
                      <br />
                      Rating: {item.rating}
                    </td>
                    <td>$ {item.price}</td>
                    {/* Render extras for each item */}
                    <td>
                      {extras &&
                        extras.map((extra, index) => (
                          <div key={index}>{extra}</div>
                        ))}
                      <Link
                        to={`/extraitem/${item._id}`}
                        className="btn-large btnSTY"
                      >
                        Edit Extra Item
                      </Link>
                    </td>
                    <td>
                      <div className="input-group">
                        <span className="input-group-btn">
                          <button className="btn btn-danger" type="button">
                            -
                          </button>
                        </span>
                        <input
                          className="form-control text-center spanST"
                          placeholder="1"
                          type="text"
                          value="1"
                          readOnly
                        />
                        <span className="input-group-btn">
                          <button className="btn btn-success" type="button">
                            +
                          </button>
                        </span>
                      </div>
                    </td>
                    <td>$ {item.price}</td>
                    <td
                      className="delete"
                      onClick={() => handleDeleteItem(item._id)}
                    >
                      {
                        <i
                          class="fa-solid fa-trash"
                          style={{ color: "red" }}
                        ></i>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="justify-between">
              <Link to="/" className="btn btn-dark btn-large">
                <span className="icon-arrow-left"></span> Continue Shopping
              </Link>
              <button className="btn btn-primary btn-large btnSTY">
                Order Now <span className="icon-arrow-right"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
