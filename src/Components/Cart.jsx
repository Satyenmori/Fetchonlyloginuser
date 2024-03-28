import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Cart = () => {
  const [foods, setFood] = useState([]);
  const [Qty, setQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();

  // fetch food by id
  const fetchFoodById = async () => {
    try {
      const response = await fetch(`http://localhost:5151/food/${id}`);
      const data = await response.json();
      setFood([data]);

      console.log(foods);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFoodById();
  }, [id]);

  // QTY handle onclick fn
  const qtyIncriment = () => {
    setQty(Qty + 1);
  };

  const qtyDecriment = () => {
    if (Qty > 1) {
      setQty(Qty - 1);
    } else {
      setQty(1);
    }
  };

  useEffect(() => {
    
    setTotalPrice(foods.reduce((total, food) => total + (food.price * Qty), 0));
  }, [Qty, foods]);

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
                  <th>No.</th>
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
                    <tr key={index}>
                      <td>{index + 1}</td>
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
                        <div className="input-group">
                          <span className="input-group-btn">
                            <button
                              className="btn btn-danger"
                              type="button"
                              onClick={qtyDecriment}
                            >
                              -
                            </button>
                          </span>
                          <input
                            className="form-control text-center spanST"
                            placeholder="1"
                            type="text"
                            value={Qty}
                            readOnly
                          />
                          <span className="input-group-btn">
                            <button
                              className="btn btn-success"
                              type="button"
                              onClick={qtyIncriment}
                            >
                              +
                            </button>
                          </span>
                        </div>
                      </td>
                      <td>$ {food.price * Qty}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td colspan="5" className="alignR">
                    Total products:
                  </td>
                  <td className="label label-primary">$ {totalPrice}</td>
                </tr>
              </tbody>
            </table>
            <div>
              <Link to="/" className="btn btn-dark btn-large">
                <span className="icon-arrow-left"></span> Continue Shopping
              </Link>
              <Link to="#" className="btn btn-primary  btn-large btnSTY">
                {" "}
                Order Now <span className="icon-arrow-right"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
