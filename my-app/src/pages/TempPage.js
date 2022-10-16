import ListItem from "../components/ListItem";
import "../styles/pagestyles/TempPage.css";
import { useState } from "react";
import {
  flattenSongs,
  getAllPlaylists,
  getSpecifiedPlaylists,
} from "../Spinfo";
import { bruteForceSearchSongs } from "../search";

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
    const possibleSongs = flattenSongs(getSpecifiedPlaylists(checkedItems));

    console.log(possibleSongs);
    const generatedPlaylist = bruteForceSearchSongs(
      possibleSongs,
      parseInt(localStorage.getItem("goal")),
      100
    );
    console.log(checkedItems);
    console.log(generatedPlaylist);

    localStorage.setItem("gen_playlist", JSON.stringify(generatedPlaylist));
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
      <div className="btn-container" style={{ paddingBottom: 20 }}>
        <button className="btn" onClick={submitChecked}>
          Draw From These Playlists!
        </button>
      </div>
    </div>
  );
};

export default TempPage;
