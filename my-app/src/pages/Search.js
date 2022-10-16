import "../styles/componentstyles/TimeInput.css";
import { fetchCode, fetchToken, refreshToken } from "../Spauth.js";
import React, { useState, useEffect, useRef } from "react";
import TimeInput from "../components/TimeInput";
import SpotifyPlayer from "react-spotify-web-playback";
import {
  fetchUser,
  fetchUserPlaylists,
  flattenSongs,
  getAllPlaylists,
  mapUris,
} from "../Spinfo";

const Search = () => {
  const [userAuthenticated, setuserAuthenticated] = useState(false);

  useEffect(() => {
    let code = null;
    const queries = window.location.search;
    if (queries.length > 0) {
      const params = new URLSearchParams(queries);
      code = params.get("code");
      setuserAuthenticated(true);

      if (localStorage.getItem("access_token") != null) {
        fetchUser();
        fetchUserPlaylists();
      } else {
        fetchToken(code);
      }
    } else {
      fetchCode();
    }
  }, []);

  //Return a warning page if not authenticated, the TimeInput if they have.
  //Note: just having this switched for now to test TimeInput, switch the order when done.
  return (
    <div>
      {!userAuthenticated ? (
        <div className="search-header">
          <h1 className="search-title">Authenticating...</h1>
        </div>
      ) : (
        <TimeInput />
      )}
    </div>
  );
};

export default Search;
