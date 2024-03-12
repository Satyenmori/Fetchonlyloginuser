const Adminroomadd = () => {
  return (
    
      <div className="container-fluid py-5 h-75">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-lg-6">
            <div className="wow fadeInUp" data-wow-delay="0.2s">
              <form>
                <div className="row g-3">
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Room title"
                      />
                      <label for="name">Room Title</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Special Request"
                        id="description"
                      ></textarea>
                      <label for="description">Room Description</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        placeholder="Price"
                      />
                      <label for="price">Price</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="rating"
                        placeholder="Enter Rating"
                      />
                      <label for="rating">Rating</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="bed"
                        placeholder="Enter Bed"
                      />
                      <label for="bed">Bed</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="bath"
                        placeholder="Enter Bed"
                      />
                      <label for="bath">Bath</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="string"
                        className="form-control"
                        id="wifi"
                        placeholder="Enter Wifi"
                      />
                      <label for="wifi">Wifi</label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="string"
                        className="form-control"
                        id="image"
                        placeholder="Enter image"
                      />
                      <label for="Bed">Image</label>
                    </div>
                  </div>

                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100  py-3"
                      type="submit"
                    >
                      Add Room
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Adminroomadd;
