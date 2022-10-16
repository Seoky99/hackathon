import "../styles/pagestyles/SongPage.css";
import SpotifyPlayer from "react-spotify-web-playback";
import {
    fetchUser,
    fetchUserPlaylists,
    flattenSongs,
    getAllPlaylists,
    mapUris,
} from "../Spinfo";
import sound from "../alarm.mp3"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const SongPage = ({ song, songArtist, albumCover }) => {
    const [currentImage, setCurrentImage] = useState(albumCover)
    const [currentSong, setCurrentSong] = useState(song)
    const [currentArtist, setCurrentArtist] = useState(songArtist)
    const [active, setActive] = useState(false)
    const [timeUp, setTimeUp] = useState(false)
    const imagesJSON = JSON.parse(localStorage.getItem("images_map"))
    const navigate = useNavigate();
    const audio = new Audio(sound)

    const navigateHome = (event) => {
        navigate("/");
    };

    const callback = (state) => {
        setActive(state.status === "READY")

        if (imagesJSON[state.track.name].length > 1)
            setCurrentImage(imagesJSON[state.track.name][1].url)
        else
            setCurrentImage(imagesJSON[state.track.name][0].url)

        setCurrentSong(state.track.name)
        let artistString = ""
        console.log(state.track.artists)
        for (let i = 0; i < state.track.artists.length; i++) {
            artistString += state.track.artists[i].name + ", "
            console.log(artistString)
        }
        if (artistString.length > 0) {
            artistString = artistString.substring(0, artistString.length - 2)
        }
        setCurrentArtist(artistString)

        if (state.isActive && state.progressMs == 0 && !state.isPlaying && state.nextTracks.length == 0) {
            (audio).play()
            setTimeUp(true)
        }
    }


    return (
        <div className="flex-containerw">
            {(currentSong != null && !timeUp) &&
                <div>
                    <div className="header-container">
                        <h1>Currently Playing:</h1>
                    </div>
                    <div className="header-container2">
                        <h2 style={{ margin: 0 }}>{currentSong}</h2>
                    </div>

                    <div className="header-container3">
                        <h2 style={{ margin: 0 }}>{currentArtist}</h2>
                    </div>

                    <div className="header-container4">
                        <h2>
                            <img src={currentImage} className="cover" alt="album cover" />
                        </h2>
                    </div>
                </div>}
            {(currentSong == null && !timeUp) &&
                <div>
                    <div className="header-container">
                        {!active &&
                            <h1>Compiling your playlist...</h1>
                        }
                        {active &&
                            <h1 style={{ fontSize: "48px", color: "rgb(63, 186, 242)", textShadow: "2px 2px black" }}>
                                Press Play & Begin your shower!
                            </h1>
                        }
                        {active &&
                            <h1 style={{ fontSize: "24px", color: "rgb(63, 186, 242)", textShadow: "2px 2px black" }}>
                                {"Duration: " + localStorage.getItem("final_duration")}
                            </h1>
                        }
                    </div>
                </div>}
            {timeUp && <div>
                <div className="header-container">
                    <h1 style={{ fontSize: "48px", color: "rgb(63, 186, 242)", textShadow: "2px 2px black" }}>Times up!</h1>
                    <button className="btn" style={{ margin: "auto", marginTop: 50 }} onClick={navigateHome}>
                        Back to Home
                    </button>
                </div>

            </div>}

            {!timeUp && <div className="spotify-player">
                <SpotifyPlayer
                    callback={callback}
                    autoPlay={false}
                    token={localStorage.getItem("access_token")}
                    uris={mapUris(JSON.parse(localStorage.getItem("gen_playlist")))}
                    name="Shower Music Player"
                />
            </div>}

        </div>
    );
};

export default SongPage;
