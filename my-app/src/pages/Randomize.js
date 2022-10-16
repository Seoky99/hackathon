import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { generatePlaylist } from "../Spinfo";
import ImageItem from "../components/ImageItem.js";
import "../styles/pagestyles/Randomize.css";

const Randomize = () => {
  const navigate = useNavigate();

  let move = () => {
    console.log("test");
    navigate("/songpage");
  };

  let runagain = () => {
    console.log("runagain");
    generatePlaylist();
    setimages(JSON.parse(localStorage.getItem("images_map")));
  };

  const [images, setimages] = useState(
    JSON.parse(localStorage.getItem("images_map"))
  );

  JSON.parse(localStorage.getItem("gen_playlist")).map((elt) =>
    console.log(images)
  );

  return (
    <div>
      <ul className="list-container fade-in">
        {JSON.parse(localStorage.getItem("gen_playlist")).map((elt, i) => (
          <div className="listitem">
            <ImageItem
              key={i + elt["name"]}
              songName={elt["name"]}
              songImage={images[elt["name"]][0]["url"]}
            />
          </div>
        ))}
      </ul>
      <div className="buttons">
        <div className="btn-container" style={{ paddingBottom: 20 }}>
          <button className="btn" onClick={runagain}>
            Randomize Again!
          </button>
        </div>
        <div className="btn-container" style={{ paddingBottom: 20 }}>
          <button className="btn" onClick={move}>
            Select These Songs!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Randomize;
