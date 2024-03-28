import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Cart = () => {
  const [foods, setFood] = useState([]);
  const { id } = useParams();

  // fetch food by id
  const fetchFoodById = async () => {
    try {
      const response = await fetch(`http://localhost:5151/food/${id}`);
      const data = await response.json();
      setFood(data);
      console.log(foods);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFoodById();
  }, [id]);

  // const totalItems = foods.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {};
  const handleRemove = (e, id) => {};

  return (
    <>
      <div className="container w-75 mt-5">
        <div className="span12">
          <div className="well well-small">
            {/* Checkout content */}
            <h1>Cart</h1>
            <hr className="soften" />

            <table className="table table-bordered table-condensed mt-4">
              <thead>
                <tr>
                  <th>Food Item</th>
                  <th>Description</th>
                  <th>Unit price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {foods.map((food, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>
                          <img width="100" src={food.img} alt={food.name} />
                        </td>
                        <td>
                          {food.name}
                          <br />
                          Category : {food.category}
                          <br />
                          Rataing : {food.rating}
                        </td>

                        <td>$ {food.price}</td>
                        <td>
                          <input
                            className="span1 spanST"
                            placeholder="1"
                            id="appendedInputButtons"
                            size="16"
                            type="text"
                            value="2"
                          />
                          <div className="input-append">
                            <button className="btn btn-mini" type="button">
                              -
                            </button>
                            <button className="btn btn-mini" type="button">
                              +
                            </button>
                            <button
                              className="btn btn-mini btn-danger"
                              type="button"
                            >
                              <span className="icon-remove"></span>
                            </button>
                          </div>
                        </td>
                        <td>$100.00</td>
                      </tr>

                      <tr>
                        <td colspan="4" className="alignR">
                          Total products:
                        </td>
                        <td>$448.42</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
