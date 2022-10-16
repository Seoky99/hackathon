import "../styles/pagestyles/Home.css";
import "../styles/pagestyles/Panels.css";
import waterdrop from "../waterdrop.jpg"

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
        <img src={waterdrop} className="home-logo" />
      </div>
    </div>
  );
};

export default Home;
