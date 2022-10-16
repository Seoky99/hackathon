import ListItem from "../components/ListItem";
import "../styles/pagestyles/TempPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/componentstyles/Animation.css";
import {
  flattenSongs,
  generatePlaylist,
  getAllPlaylists,
  getSpecifiedPlaylists,
} from "../Spinfo";
import { bruteForceSearchSongs } from "../search";

const TempPage = () => {
  const navigate = useNavigate();

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
    localStorage.setItem("checks", JSON.stringify(checkedItems));

    generatePlaylist();

    navigate("/randomizepage");
  };

  return (
    <div>
      <ul className="list-container fade-in">
        {arrPlayLists.map((elt, i) => (
          <div className="listitem">
            <ListItem
              key={elt["id"] + i}
              id={elt["id"]}
              playlistName={elt["name"]}
              playlistImage={elt["images"][0]["url"]}
              setChange={handleCheckedChange}
            />
          </div>
        ))}
      </ul>
      <div className="btn-container" style={{ paddingBottom: 20 }}>
        <button className="btn" onClick={submitChecked}>
          Draw From These Playlists!
        </button>
      </div>
    </div>
  );
};

export default TempPage;
