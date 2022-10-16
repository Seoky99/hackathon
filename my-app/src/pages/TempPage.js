import ListItem from "../components/ListItem";
import "../styles/pagestyles/TempPage.css";
import { useState } from "react";
import { getAllPlaylists } from "../Spinfo";

const TempPage = () => {
  const arrPlayLists = getAllPlaylists();

  const [checkedItems, setcheckedItems] = useState({});

  const handleCheckedChange = (name, checked) => {
    setcheckedItems({
      ...checkedItems,
      [name]: checked,
    });
  };

  console.log(getAllPlaylists());

  const submitChecked = () => {
    console.log(checkedItems);
  };

  return (
    <div>
      <ul className="list-container">
        {arrPlayLists.map((elt, i) => (
          <div className="listitem">
            <ListItem
              key={i}
              playlistName={elt["name"]}
              playlistImage={elt["images"][0]["url"]}
              setChange={handleCheckedChange}
            />
          </div>
        ))}
      </ul>
      <div className="btn-container">
        <button className="btn" onClick={submitChecked}>
          Draw From These Playlists!
        </button>
      </div>
    </div>
  );
};

export default TempPage;
