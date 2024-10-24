import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TestDataadd = () => {
  const { register, handleSubmit, reset } = useForm();
  const [selectedImages, setSelectedImages] = useState([]);
  const [singleImage, setSingleImage] = useState(null);
  const Navigate = useNavigate();

  // Handle multiple image selection
  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  // Handle single image selection
  const handleSingleImg = (e) => {
    const file = e.target.files[0];
    setSingleImage(file);
  };

  // Handle image deletion
  const handleDeleteImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("des", data.des);

      selectedImages.forEach((image) => formData.append("img", image));
      if (singleImage) formData.append("singleImg", singleImage);

      await axios.post("http://localhost:5151/test/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("New Test Data Added Successfully");
      reset(); // Reset the form
      setSelectedImages([]); // Clear selected images
      setSingleImage(null);  // Clear single image
      // Navigate("/rooms"); // Uncomment if navigation is needed
    } catch (error) {
      console.error("Error adding data", error);
    }
  };

  return (
    <div className="container-fluid py-5 h-75">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-lg-6">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="row g-3">
              <div className="col-md-12">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    {...register("name", { required: true })}
                    placeholder="Name"
                  />
                  <label>Name</label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    {...register("des", { required: true })}
                    placeholder="Description"
                  ></textarea>
                  <label>Description</label>
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-floating">
                  <input
                    type="file"
                    className="form-control"
                    multiple
                    onChange={handleImage}
                  />
                  <label>Images</label>
                </div>
              </div>

              {/* Display selected images */}
              <div className="col-md-12 d-flex flex-wrap">
                {selectedImages.map((image, index) => (
                  <div key={index} className="position-relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Selected Image ${index}`}
                      style={{
                        width: "220px",
                        height: "110px",
                        margin: "5px",
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute end-0"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <i className="fa-solid fa-trash fa"></i>
                    </button>
                  </div>
                ))}
              </div>

              <div className="col-md-12">
                <div className="form-floating">
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleSingleImg}
                  />
                  <label>Single Image</label>
                </div>
              </div>

              <div className="col-12">
                <button className="btn btn-primary w-100 py-3" type="submit">
                  Add Testing Data
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestDataadd;
