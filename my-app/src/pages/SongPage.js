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
        <div>
            <h1 className="songpage-header">Currently Playing:</h1>
            <br></br>
            <h2 className="songpage-song">
                {currentSong}
                <br></br>
            </h2>
            <h2 className="songpage-artist">
                {songArtist}
                <br></br>
            </h2>
            <h2 className="songpage-albumcover">
                <img src={albumCover} className="cover" alt="album cover" />
            </h2>
            <SpotifyPlayer
                autoPlay={true}
                token={localStorage.getItem("access_token")}
                uris={mapUris(JSON.parse(localStorage.getItem("gen_playlist")))}
                name="Shower Music Player"
            />
        </div>
    );
};

export default SongPage;
