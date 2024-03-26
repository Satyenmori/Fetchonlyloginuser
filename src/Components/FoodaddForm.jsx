import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Foodadd = () => {
  const [food, setFood] = useState({
    name: "",
    desc: "",
    price: "",
    rating: "",
    category: "",
    img: "",
  });
  const Navigate = useNavigate();
  const handlInput = (e) => {
    let { name, value } = e.target;

    setFood({ ...food, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5151/food/addfood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(food),
      });
      if (response.ok) {
        alert("Food Menu Successfuly Add");
        setFood({
          name: "",
          desc: "",
          price: "",
          rating: "",
          category: "",
          img: "",
        });
        Navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container-fluid py-5 h-75">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-lg-6">
            <div className="wow fadeInUp" data-wow-delay="0.2s">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row g-3">
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={food.name}
                        onChange={handlInput}
                        placeholder="Food name"
                        required
                      />
                      <label for="title">Food Name</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Special Request"
                        id="desc"
                        name="desc"
                        value={food.desc}
                        onChange={handlInput}
                        required
                      ></textarea>
                      <label for="description">Food Description</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={food.price}
                        onChange={handlInput}
                        placeholder="Price"
                        required
                      />
                      <label for="price">Price</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="rating"
                        name="rating"
                        value={food.rating}
                        onChange={handlInput}
                        placeholder="Enter Rating"
                        required
                      />
                      <label for="rating">Rating</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="category"
                        name="category"
                        value={food.bed}
                        onChange={handlInput}
                        placeholder="Enter Bed"
                        required
                      />
                      <label for="bed">Category</label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="img"
                        name="img"
                        value={food.img}
                        onChange={handlInput}
                        placeholder="Enter Images"
                        required
                      />
                      <label for="images">images</label>
                    </div>
                  </div>

                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100  py-3"
                      type="submit"
                    >
                      Add Food
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Foodadd;
