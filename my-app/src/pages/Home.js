import logo from "../logo.svg";
import "../styles/Home.css";
import "../styles/Panels.css";

const Home = () => {
  return (
    <div className="flex-parent-element">
      <div className="flex-child-element">
        <h1 className="home-title">Title</h1>
        <h2 className="home-header">
          Shower sustainably with your favorite songs
        </h2>
      </div>
      <div className="flex-child-element">
        <img src={logo} className="logo" alt="logo" />
      </div>
    </div>
  );
};

export default Home;
