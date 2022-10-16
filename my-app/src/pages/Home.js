import "../styles/pagestyles/Home.css";
import "../styles/pagestyles/Panels.css";
import waterdrop from "../waterdrop.png";
import "../styles/pagestyles/TempPage.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const navigateToList = (event) => {
    navigate("/search");
  };

  return (
    <div>
      <div className="flex-parent-element">
        <div className="flex-left-child-element">
          <h1 className="home-title">Shower.fy</h1>
          <h2 className="home-header">
            Shower sustainably with your favorite songs
          </h2>
        </div>
        <div className="flex-right-child-element">
          <img src={waterdrop} className="home-logo" />
        </div>
      </div>

      <div className="flex-parent-element" style={{ width: "100%" }}>
        <button className="btn" style={{ margin: "auto", marginTop: 50 }} onClick={navigateToList}>
          Try it out!
        </button>
      </div>

    </div>
  );
};

export default Home;
