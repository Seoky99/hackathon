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

const SongPage = ({ song, songArtist, albumCover }) => {
    const [currentImage, setCurrentImage] = useState(albumCover)
    const [currentSong, setCurrentSong] = useState(song)
    const [currentArtist, setCurrentArtist] = useState(songArtist)
    const [timeUp, setTimeUp] = useState(false)
    const imagesJSON = JSON.parse(localStorage.getItem("images_map"))

    const callback = (state) => {
        console.log(imagesJSON)
        console.log(imagesJSON[state.track.name])
        console.log(state.track.name)

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
            (new Audio(sound)).play()
            setTimeUp(true)
        }
    }


    return (
        <div className="flex-containerw">
            {currentSong != null &&
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
            {currentSong == null &&
                <div>
                    <div className="header-container">
                        <h1>Loading Spotify...</h1>
                    </div>
                </div>}

            <div className="spotify-player">
                <SpotifyPlayer
                    callback={callback}
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
