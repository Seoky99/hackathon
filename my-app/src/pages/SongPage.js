import "../styles/pagestyles/SongPage.css";
import SpotifyPlayer from "react-spotify-web-playback";
import {
  fetchUser,
  fetchUserPlaylists,
  flattenSongs,
  getAllPlaylists,
  mapUris,
} from "../Spinfo";

const SongPage = ({ currentSong, songArtist, albumCover }) => {
  return (
    <div className="flex-containerw">
      <div className="header-container">
        <h1>Currently Playing:</h1>
      </div>
      <div className="header-container2">
        <h2>{currentSong}</h2>
      </div>

      <div className="header-container3">
        <h2>{songArtist}</h2>
      </div>

      <div className="header-container4">
        <h2>
          <img src={albumCover} className="cover" alt="album cover" />
        </h2>
      </div>

      <div className="spotify-player">
        <SpotifyPlayer
          autoPlay={true}
          token={localStorage.getItem("access_token")}
          uris={mapUris(JSON.parse(localStorage.getItem("gen_playlist")))}
          name="Shower Music Player"
        />
      </div>
    </div>
  );
};

export default SongPage;
