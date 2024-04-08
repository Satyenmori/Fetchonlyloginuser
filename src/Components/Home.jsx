import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/store";

const Home = () => {
  const [foods, setFood] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState([]);
  const { isAdmin } = useAuth();

  const fetchFood = async (category) => {
    try {
      const response = await fetch(
        `http://localhost:5151/category/filter?category=${category}`
      );
      const data = await response.json();
      setFood(data);
      console.log(foods);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await fetch("http://localhost:5151/food/getfood");
      const data = await response.json();
      //category uniuqly fetch
      const uniqueCategory = [...new Set(data.map((item) => item.category))];
      setCategories(uniqueCategory);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFood(activeCategory);
    fetchCategory();
  }, [activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <>
      <div className="menu-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading-title text-center mb-3 mt-2">
                <h2>Special Menu</h2>
              </div>
            </div>
          </div>
          <div className="row inner-menu-box">
            <div className="col-3">
              <div
                className="nav flex-column nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <div
                  className={`nav-link ${
                    activeCategory === "All" && "active"
                  } pointer`}
                  onClick={() => handleCategoryChange("All")}
                >
                  All
                </div>
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={`nav-link ${
                      activeCategory === category && "active"
                    } pointer`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
            <div className="col-9">
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <div className="col-md-2">
                    {isAdmin && (
                      <Link
                        className="btn btn-sm btn-success rounded px-3 mb-2"
                        to="/addfood"
                      >
                        <i class="fa-solid fa-plus"></i> New Food
                      </Link>
                    )}
                  </div>
                  <div className="row">
                    {foods &&
                      foods.map((food) => (
                        <div
                          key={food.id}
                          className="col-lg-4 col-md-6 wow fadeInUp"
                          data-wow-delay="0.1s"
                        >
                          <div className="room-item shadow rounded overflow-hidden">
                            <div className="position-relative">
                              <img
                                className="img-fluid food-image"
                                src={food.img}
                                alt="thumbnail"
                              />
                              <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                                $ {food.price}
                              </small>
                            </div>
                            <div className="p-4 mt-2">
                              <div className="d-flex justify-content-between mb-3">
                                <h5 className="mb-0">{food.name}</h5>
                                <div className="ps-2 btn-success btn btn-sm">
                                  <small className="fa fa-star text-light">
                                    {food.rating}
                                  </small>
                                </div>
                              </div>
                              <p className="text-body mb-3 scroll">
                                {food.desc}
                              </p>
                              <div className="text-center">
                                {" "}
                                {/* Center align button */}
                                <Link
                                  className="btn btn-primary btn-sm"
                                  to={`/extraitem/${food._id}`}
                                >
                                  Add to Cart
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
