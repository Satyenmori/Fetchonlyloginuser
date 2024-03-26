import { useEffect, useState } from "react";

const Home = () => {
  const [foods, setFood] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState([]);

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
      const response = await fetch("http://localhost:5151/category/");
      const data = await response.json();
      setCategories(data);
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
                <a
                  className={`nav-link ${
                    activeCategory === "All" && "active"
                  } pointer`}
                  onClick={() => handleCategoryChange("All")}
                >
                  All
                </a>
                {categories.map((category) => (
                  <a
                    key={category._id}
                    className={`nav-link ${
                      activeCategory === category.label && "active"
                    } pointer`}
                    onClick={() => handleCategoryChange(category.label)}
                  >
                    {category.label}
                  </a>
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
                                <div className="ps-2">
                                  <small className="fa fa-star text-primary">
                                    {food.rating}
                                  </small>
                                </div>
                              </div>
                              <p className="text-body mb-3 scroll">
                                {food.desc}
                              </p>
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
