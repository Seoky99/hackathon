import { Outlet, NavLink } from "react-router-dom";
import "../styles/componentstyles/navbar.css";
import "../styles/pagestyles/Home.css";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink
              end
              to="/"
              style={({ isActive }) => ({
                borderBottom: isActive ? "1px solid white" : "0px",
              })}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => ({
                borderBottom: isActive ? "1px solid white" : "0px",
              })}
              to="/search"
            >
              Search
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              style={({ isActive }) => ({
                borderBottom: isActive ? "1px solid white" : "0px",
              })}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/temppage"
              style={({ isActive }) => ({
                borderBottom: isActive ? "1px solid white" : "0px",
              })}
            >
              TempPage
            </NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
