import { useAuth } from "../store/store";

const Home = () => {
  const{user}=useAuth();
  return (
    <>
      <div className="container card h-50 w-50 mt-5 ">
        <h2>Hello, <span className="username">{user.username}</span> </h2>
        <h4>Welcome Our WebSite</h4>
      </div>
    </>
  );
};

export default Home;
