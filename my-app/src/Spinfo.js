import { refreshToken } from './Spauth.js'
const userUrl = "https://api.spotify.com/v1/me"
const playlistUrl = "https://api.spotify.com/v1/me/playlists"
const yoursongsUrl = "https://api.spotify.com/v1/me/tracks"


// Probably unnecessary. Still nice to be able to pull username, though.
/**
 * After calling, [ localStorage.getItem("user_id") ] will asynchronously be stored
 * with the user's public spotify id.
 */
export function fetchUser() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", userUrl, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("access_token"))
  xhr.send()
  xhr.onload = handleUserResponse
}

function handleUserResponse() {
  if (this.status == 200) {
    var data = JSON.parse(this.responseText);
    console.log(data);
    localStorage.setItem("user_id", data.id)
    console.log("User ID: " + localStorage.getItem("user_id"))
  }
  else if (this.status == 401) {
    refreshToken()
  }
}

/**
 * After calling, [ localStorage.getItem("user_playlists") ] will asynchronously be stored
 * with the user's public playlists on their profile.
 */
export function fetchUserPlaylists() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", playlistUrl, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("access_token"))
  xhr.send()
  xhr.onload = handlePlaylistsResponse

  let xhr2 = new XMLHttpRequest();
  xhr2.open("GET", yoursongsUrl + "?limit=50", true)
  xhr2.setRequestHeader('Content-Type', 'application/json')
  xhr2.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("access_token"))
  xhr2.send()
  xhr2.onload = handleYourSongsResponse
}

function handlePlaylistsResponse() {
  if (this.status == 200) {
    var data = JSON.parse(this.responseText);
    //console.log(data);

    for (let i = 0; i < data.items.length; i++) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", data.items[i].tracks.href + "?field=items(track)", true)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("access_token"))
      xhr.send()
      console.log("Attempting to pull tracks at: " + data.items[i].tracks.href)
      xhr.onload = () => {
        if (xhr.status == 200) {
          var trackData = JSON.parse(xhr.responseText);
          //Replaces super annoying track objects with just the tracks we want.
          for (let j = 0; j < trackData.items.length; j++) {
            trackData.items[j] = trackData.items[j].track
          }
          //console.log(trackData);
          data.items[i].tracks = trackData.items

          localStorage.setItem("user_playlists", JSON.stringify(data.items))
          console.log(JSON.parse(localStorage.getItem("user_playlists")))
        }
        else if (this.status == 401) {
          refreshToken()
        }
      }
    }
  }
  else if (this.status == 401) {
    refreshToken()
  }
}

function handleYourSongsResponse() {
  if (this.status == 200) {
    var data = JSON.parse(this.responseText);
    console.log(data);
    for (let i = 0; i < data.items.length; i++) {
      data.items[i] = data.items[i].track
    }

    var toPlaylistJSON = {
      description: "",
      images: [
        {
          height: 300,
          width: 300,
          url: "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
        }],
      name: "Liked Songs",
      type: "playlist",
      tracks: data.items
    }

    localStorage.setItem("user_liked", JSON.stringify(toPlaylistJSON))
    console.log(JSON.parse(localStorage.getItem("user_liked")))
  }
  else if (this.status == 401) {
    refreshToken()
  }
}

/*

IMPORTANT: SEE https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlist
FOR DOCUMENTATION ON WHAT FIELDS PLAYLIST OBJECTS HAVE.

Important fields:

(Let [pl] be some playlist object:)

[pl.tracks.href] returns an a link used to fetch further info of the playlist.
[pl.name] is the name of the playlist.
[pl.images] is an array of images of the form 
  {
    "height":640,
    "url":"https://mosaic.scdn.co/...",
    "width":640
  }
  where url allows you to actually fetch the image.
[pl.tracks.total] returns the total number of tracks in the playlist.

*/