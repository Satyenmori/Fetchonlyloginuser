// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const Testedit = () => {
//   const { id } = useParams();
//   const [test, setTest] = useState({ img: [] });
//   const [selectedImages, setSelectedImages] = useState([]);
//   const navigate = useNavigate();

//   // Fetch test data by ID
//   const fetchTestById = async () => {
//     try {
//       const response = await fetch(`http://localhost:5151/test/${id}`);
//       const data = await response.json();
//       setTest(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchTestById();
//   }, [id]);

//   // Handle image selection
//   const handleImage = (e) => {
//     const files = e.target.files;
//     const selectedImagesArray = Array.from(files);
//     setSelectedImages((prevImages) => [...prevImages, ...selectedImagesArray]);
//   };

//   // Handle image deletion from selected images
//   const handleDeleteImage = (index) => {
//     setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//   // Handle image deletion from the database
//   const handleDeleteImageDB = async (indexx) => {
    
//   };

//   // Handle input change
//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setTest({ ...test, [name]: value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("name", test.name);
//       formData.append("des", test.des);

//       for (let x of selectedImages) {
//         formData.append("img", x);
//       }

//       const response = await fetch(
//         `http://localhost:5151/test/edit/${id}`,
//         {
//           method: "PUT",
//           body: formData,
//         }
//       );

//       if (response.ok) {
//         alert("Test data updated successfully");
//         navigate("/test");
//       } else {
//         console.log("Test data update failed");
//       }
//     } catch (error) {
//       console.error("Failed to update test data", error);
//     }
//   };

//   return (
//     <>
//       <div className="container-fluid py-5 h-75">
//         <div className="row justify-content-center align-items-center h-100">
//           <div className="col-lg-6">
//             <div className="wow fadeInUp" data-wow-delay="0.2s">
//               <form onSubmit={handleSubmit}>
//                 <div className="row g-3">
//                   <div className="col-md-12">
//                     <div className="form-floating">
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="name"
//                         name="name"
//                         value={test.name || ""}
//                         onChange={handleInput}
//                         placeholder="Test name"
//                         required
//                       />
//                       <label htmlFor="name">Name</label>
//                     </div>
//                   </div>
//                   <div className="col-12">
//                     <div className="form-floating">
//                       <textarea
//                         className="form-control"
//                         placeholder="Description"
//                         id="des"
//                         name="des"
//                         value={test.des || ""}
//                         onChange={handleInput}
//                         required
//                       ></textarea>
//                       <label htmlFor="des">Description</label>
//                     </div>
//                   </div>

//                   {/* Images */}
//                   <div className="col-md-12 d-flex flex-wrap">
//                     <div className="row g-3">
//                       {test.img &&
//                         test.img.map((image, indexx) => (
//                           <div key={indexx} className="col-4 text-center">
//                             <img
//                               className="img-fluid rounded w-100 h-75 wow zoomIn"
//                               data-wow-delay="0.1s"
//                               src={`http://localhost:5151/${image}`}
//                               alt={`Image ${indexx + 1}`}
//                             />
//                             <button
//                               type="button"
//                               className="delete mt-1"
//                               onClick={() => handleDeleteImageDB(indexx)}
//                             >
//                               <i className="fa-solid fa-trash fa"></i>
//                             </button>
//                           </div>
//                         ))}
//                     </div>
//                   </div>

//                   {/* Image Upload */}
//                   <div className="col-md-12">
//                     <div className="form-floating">
//                       <input
//                         type="file"
//                         className="form-control"
//                         id="img"
//                         name="img"
//                         onChange={handleImage}
//                         multiple
//                       />
//                       <label htmlFor="img">Images</label>
//                     </div>
//                   </div>

//                   {/* Display selected images */}
//                   <div className="col-md-12 d-flex flex-wrap">
//                     {selectedImages.map((image, index) => (
//                       <div key={index} className="position-relative">
//                         <img
//                           key={index}
//                           src={URL.createObjectURL(image)}
//                           alt={`Selected Image ${index}`}
//                           style={{
//                             width: "220px",
//                             height: "110px",
//                             margin: "5px",
//                           }}
//                         />
//                         <button
//                           type="button"
//                           className="btn btn-danger btn-sm position-absolute end-0"
//                           onClick={() => handleDeleteImage(index)}
//                         >
//                           <i className="fa-solid fa-trash fa"></i>
//                         </button>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="col-12 mt-5">
//                     <button
//                       className="btn btn-primary w-100 py-3"
//                       type="submit"
//                     >
//                       Edit Test Data
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Testedit;




// new file  image push but existing delete not working plz check
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Testedit = () => {
  const { id } = useParams();
  const [test, setTest] = useState({ img: [] });
  const [selectedImages, setSelectedImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]); // New state to track deleted images
  const navigate = useNavigate();

  const fetchTestById = async () => {
    try {
      const response = await fetch(`http://localhost:5151/test/${id}`);
      const data = await response.json();
      setTest(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTestById();
  }, [id]);

  const handleImage = (e) => {
    const files = e.target.files;
    const selectedImagesArray = Array.from(files);
    setSelectedImages((prevImages) => [...prevImages, ...selectedImagesArray]);
  };

  const handleDeleteImage = (index) => {
    const imageToDelete = test.img[index];
    setDeletedImages((prevImages) => [...prevImages, imageToDelete]);
    setTest((prevTest) => {
      const newImages = [...prevTest.img];
      newImages.splice(index, 1);
      return { ...prevTest, img: newImages };
    });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setTest({ ...test, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", test.name);
      formData.append("des", test.des);
      formData.append("deletedImages", JSON.stringify(deletedImages)); // Include deleted images in form data

      for (let x of selectedImages) {
        formData.append("img", x);
      }

      const response = await fetch(
        `http://localhost:5151/test/edit/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Test data updated successfully");
        navigate("/test");
      } else {
        console.log("Test data update failed");
      }
    } catch (error) {
      console.error("Failed to update test data", error);
    }
  };

  return (
    <>
      <div className="container-fluid py-5 h-75">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-lg-6">
            <div className="wow fadeInUp" data-wow-delay="0.2s">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={test.name || ""}
                        onChange={handleInput}
                        placeholder="Test name"
                        required
                      />
                      <label htmlFor="name">Name</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Description"
                        id="des"
                        name="des"
                        value={test.des || ""}
                        onChange={handleInput}
                        required
                      ></textarea>
                      <label htmlFor="des">Description</label>
                    </div>
                  </div>

                  {/* Images */}
                  <div className="col-md-12 d-flex flex-wrap">
                    {test.img &&
                      test.img.map((image, index) => (
                        <div key={index} className="col-4 text-center">
                          <img
                            className="img-fluid rounded w-100 h-75 wow zoomIn"
                            data-wow-delay="0.1s"
                            src={`http://localhost:5151/${image}`}
                            alt={`Image ${index + 1}`}
                          />
                          <button
                            type="button"
                            className="delete mt-1"
                            onClick={() => handleDeleteImage(index)}
                          >
                            <i className="fa-solid fa-trash fa"></i>
                          </button>
                        </div>
                      ))}
                  </div>

                  {/* Image Upload */}
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="file"
                        className="form-control"
                        id="img"
                        name="img"
                        onChange={handleImage}
                        multiple
                      />
                      <label htmlFor="img">Images</label>
                    </div>
                  </div>

                  {/* Display selected images */}
                  <div className="col-md-12 d-flex flex-wrap">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="position-relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Selected Image ${index + 1}`}
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

                  <div className="col-12 mt-5">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Edit Test Data
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

export default Testedit;
