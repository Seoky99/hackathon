import { Outlet, Link } from "react-router-dom";
import "../styles/navbar.css";
import "../styles/Home.css";

const Layout = () => {
  return (
    <>
      <nav className="blue">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
