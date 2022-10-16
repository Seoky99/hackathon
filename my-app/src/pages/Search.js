import "../styles/componentstyles/Search.css";
import { fetchCode, fetchToken, refreshToken } from "../Spauth.js";
import React, { useState, useEffect, useRef } from "react";
import TimeInput from "../components/TimeInput";
import SpotifyPlayer from "react-spotify-web-playback";
import "../styles/componentstyles/Animation.css";

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

      localStorage.setItem("most_recent_code", code);

      setuserAuthenticated(true);

      if (localStorage.getItem("access_token") != null) {
        fetchUser();
        fetchUserPlaylists();
      } else {
        fetchToken(code);
      }
    } else {
      setTimeout(() => {
        fetchCode();
      }, 1500);
    }
  }, []);

  //Return a warning page if not authenticated, the TimeInput if they have.
  //Note: just having this switched for now to test TimeInput, switch the order when done.
  return (
    <div>
      {!userAuthenticated ? (
        <div className="search-header fade-in">
          <h1 className="search-title">Authenticating...</h1>
          <div className="loader"></div>
        </div>
      ) : (
        <TimeInput />
      )}
    </div>
  );
};

export default Search;
