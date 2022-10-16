import ListItem from "../components/ListItem";
import "../styles/pagestyles/TempPage.css";
import { useState } from "react";
import { flattenSongs, getAllPlaylists, getSpecifiedPlaylists } from "../Spinfo";

const TempPage = () => {
  const arrPlayLists = getAllPlaylists();

  const [checkedItems, setcheckedItems] = useState({});

  const handleCheckedChange = (id, checked) => {
    setcheckedItems({
      ...checkedItems,
      [id]: checked,
    });
  };

  console.log(getAllPlaylists());

  const submitChecked = () => {
    console.log(checkedItems);
    console.log(flattenSongs(getSpecifiedPlaylists(checkedItems)))
  };

  return (
    <div>
      <ul className="list-container">
        {arrPlayLists.map((elt, i) => (
          <div className="listitem">
            <ListItem
              key={i}
              id={elt["id"]}
              playlistName={elt["name"]}
              playlistImage={elt["images"][0]["url"]}
              setChange={handleCheckedChange}
            />
          </div>
        ))}
      </ul>
      <div className="btn-container" style={{ "padding-bottom": 20 }}>
        <button className="btn" onClick={submitChecked}>
          Draw From These Playlists!
        </button>
      </div>
    </div>
  );
};

export default TempPage;
