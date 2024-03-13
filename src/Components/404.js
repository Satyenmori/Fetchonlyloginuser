import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="container card w-25 mt-5">
        <h1 className="mt-5 mb-5 text-center">404 Not Found</h1>
        <Link className="btn btn-primary rounded mb-5" to="/">Back To Home Page</Link>
      </div>
    </>
  );
};
export default PageNotFound;
