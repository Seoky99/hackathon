import { fetchUser, fetchUserPlaylists } from "./Spinfo.js"
const authorizeUrl = "https://accounts.spotify.com/authorize?";
const tokenURL = "https://accounts.spotify.com/api/token";
const redirect = "http://localhost:3000/search";
const querystring = require("querystring");
const client_id = "081f734e46c44148a7d08dc1007ba8eb";
const client_secret = "f0868f3ef7474734a5c5af35bd2cbd04";

export function fetchCode() {
  window.location.href = authorizeUrl + querystring.stringify({
    client_id: "081f734e46c44148a7d08dc1007ba8eb",
    response_type: "code",
    scope: 'user-read-private user-read-email playlist-read-private user-library-read streaming user-read-playback-state user-modify-playback-state',
    state: "AAAAAAAAAAAAAAAA",
    redirect_uri: redirect
  })
}

export function fetchToken(code) {
  let body = "grant_type=authorization_code";
  body += "&code=" + code;
  body += "&redirect_uri=" + encodeURI(redirect);
  body += "&client_id=" + client_id;
  body += "&client_secret=" + client_secret;

  makeTokenRequest(body);
}

function makeTokenRequest(body) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", tokenURL, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader(
    "Authorization",
    "Basic " + btoa(client_id + ":" + client_secret)
  );
  xhr.send(body);
  xhr.onload = handleAuthorizationResponse;
}

export function refreshToken() {
  let rtoken = localStorage.getItem("refresh_token");
  let body = "grant_type=refresh_token";
  body += "&refresh_token=" + rtoken;
  body += "&client_id=" + client_id;
  makeTokenRequest(body);
}

function handleAuthorizationResponse() {
  if (this.status === 200) {
    var data = JSON.parse(this.responseText);
    console.log(data);
    localStorage.setItem("access_token", data.access_token);
    console.log("Access Token: " + localStorage.getItem("access_token"));
    localStorage.setItem("refresh_token", data.refresh_token);
    console.log("Refresh Token: " + localStorage.getItem("refresh_token"));

    fetchUser()
    fetchUserPlaylists()
  }
}
