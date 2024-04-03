import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import qs from "qs";

const Cart = () => {
  const [food, setFood] = useState(null);
  //const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();

  const { extras, totalPrice } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  // Fetch food item and its extra items
  const fetchFoodById = async () => {
    try {
      const response = await fetch(
        `http://localhost:5151/extraitem/${id}/extra`
      );
      const data = await response.json();

      setFood(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFoodById();
  }, [id]);

  return (
    <>
      {food && (
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
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <img width="100" src={food.img} alt={food.name} />
                    </td>
                    <td>
                      {food.name}
                      <br />
                      Category: {food.category}
                      <br />
                      Rating: {food.rating}
                    </td>
                    <td>$ {food.price}</td>
                    <td>
                      {extras.map((extra, index) => (
                        <div key={index}>{extra}</div>
                      ))}
                      <Link className="btn-large btnSTY">
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
                    <td>$ {totalPrice}</td>
                  </tr>
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
      )}
    </>
  );
};

export default Cart;
