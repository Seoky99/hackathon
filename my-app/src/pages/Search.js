import "../styles/componentstyles/TimeInput.css";
import { fetchCode, fetchToken } from "../Spauth.js";
import React, { useState, useEffect, useRef } from "react";
import TimeInput from "../components/TimeInput";

const Search = () => {
  const [userAuthenticated, setuserAuthenticated] = useState(false);

  useEffect(() => {
    if (window.location.search.length > 0) {
      let code = null;
      const queries = window.location.search;
      if (queries.length > 0) {
        const params = new URLSearchParams(queries);
        code = params.get("code");
        setuserAuthenticated(true);
      }

      fetchToken(code);
    }
  }, []);

  //Return a warning page if not authenticated, the TimeInput if they have.
  //Note: just having this switched for now to test TimeInput, switch the order when done.
  return (
    <div>
      {userAuthenticated ? (
        <h1 className="search-title">Please authenticate first.</h1>
      ) : (
        <TimeInput />
      )}
    </div>
  );
};

export default Search;
