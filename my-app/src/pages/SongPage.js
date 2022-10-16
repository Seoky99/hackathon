import "../styles/pagestyles/SongPage.css";

const SongPage = ({currentSong, songArtist, albumCover}) => {    
    return(
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
            <img src={albumCover} className="cover" />
        </h2>
        </div>

    );
};

export default SongPage;