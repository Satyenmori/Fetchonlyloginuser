import { NavLink, Outlet } from "react-router-dom";
export const AdminLayout = () => {
  return (
    <>
      <div className="container">
        <nav>
          <ul>
            <li>
              <NavLink to="/admin/rooms">Rooms</NavLink>
            </li>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
};
