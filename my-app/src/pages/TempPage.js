import ListItem from "../components/ListItem";
import "../styles/pagestyles/TempPage.css";
import { useState } from "react";

const TempPage = () => {
  const arrNames = [
    ["exampleID1", "examplePIC1"],
    ["exampleID2", "examplePIC2"],
    ["exampleID3", "examplePIC3"],
    ["exampleID4", "examplePIC4"],
    ["exampleID5", "examplePIC5"],
    ["exampleID6", "examplePIC6"],
  ];

  const [checkedItems, setcheckedItems] = useState({});

  const handleCheckedChange = (name, checked) => {
    setcheckedItems({
      ...checkedItems,
      [name]: checked,
    });
  };

  const submitChecked = () => {
    console.log(checkedItems);
  };

  return (
    <div>
      <ul className="list-container">
        {arrNames.map((elt, i) => (
          <ListItem
            key={i}
            playlistName={elt[0]}
            playlistImage={elt[1]}
            setChange={handleCheckedChange}
          />
        ))}
      </ul>
      <button className="btn" onClick={submitChecked}>
        Draw From These Playlists!
      </button>
    </div>
  );
};

export default TempPage;
