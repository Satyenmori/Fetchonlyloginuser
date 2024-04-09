import React from "react";
import { Link } from "react-router-dom";

const Updateitem = () => {
  return (
    <>
      <div className="container mt-5 w-50">
        <div className="card">
          <div className="card-header">
            <h2 className="mb-0 text-primary">Update Extra Items</h2>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="item-row">
                <span>extra name</span>
                <span className="extra-price">+ $ 250</span>
                <input type="checkbox" />
              </div>
            </li>

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
