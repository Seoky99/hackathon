import "../styles/Search.css";
import { fetchCode, fetchToken } from '../Spauth.js'
import React, { useState, useEffect } from 'react';

const Search = () => {
  useEffect(() => {
    if (window.location.search.length > 0) {
      let code = null;
      const queries = window.location.search
      if (queries.length > 0) {
        const params = new URLSearchParams(queries);
        code = params.get('code')
      }
      fetchToken(code)
    }
  });


  return <h1 className="search-title">Search Page</h1>;
};


export default Search;
