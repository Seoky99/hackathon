import ListItem from "../components/ListItem";
import "../styles/pagestyles/TempPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  flattenSongs,
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
    const possibleSongs = flattenSongs(getSpecifiedPlaylists(checkedItems));

    console.log(possibleSongs);
    const generatedPlaylist = bruteForceSearchSongs(
      possibleSongs,
      parseInt(localStorage.getItem("goal")),
      100
    );
    console.log(checkedItems);
    console.log(generatedPlaylist);

    let imagesJSON = {}
    generatedPlaylist.forEach(song => {
      imagesJSON[song.id] = song.album.images
    })

    localStorage.setItem("images_map", JSON.stringify(imagesJSON))
    localStorage.setItem("gen_playlist", JSON.stringify(generatedPlaylist));

    navigate("/songpage");
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
