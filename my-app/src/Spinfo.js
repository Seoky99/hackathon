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
 * 
 * Also, [ localStorage.getItem("user_liked") ] will asynchronously be stored as one (1) playlist
 * corresponding to the liked songs playlist auto-generated by Spotify for each user.
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
      tracks: data.items,
      id: "muahugahuau my liked stuff..."
    }

    localStorage.setItem("user_liked", JSON.stringify(toPlaylistJSON))
    console.log(JSON.parse(localStorage.getItem("user_liked")))
  }
  else if (this.status == 401) {
    refreshToken()
  }
}

/**
 * @returns A list of all playlists (represented as jsons) to be displayed for this user. Every playlist [pl] has fields:
 * - [pl.images], which returns an array of 3 images represented as jsons. First is 640x640, second is 300x300, last is 60x60. Each json [j] has [j.url] for the image url.
 * - [pl.name], which returns the name of the playlist.
 * - [pl.tracks], which returns an array of all the tracks in the playlist. Thus, [pl.tracks.length] can be used to determine how many tracks are in the playlist.
 */
export function getAllPlaylists() {
  const playlists = [JSON.parse(localStorage.getItem("user_liked"))]
  const otherPlaylists = JSON.parse(localStorage.getItem("user_playlists"))
  for (let i = 0; i < otherPlaylists.length; i++) {
    playlists.push(otherPlaylists[i])
  }

  return playlists
}

/**
 * [ getSpecifiedPlaylists(spec) ] returns a subarray of [ getAllPlaylists() ]
 * consisting of the playlists determined to be kept by [spec].
 * 
 * @param spec A JSON where playlist id's are mapped to either true or false. 
 * [$(p.id): true] means that playlist [p] should be kept.
 */
export function getSpecifiedPlaylists(spec) {
  const playlists = []
  const all = getAllPlaylists()

  for (let i = 0; i < all.length; i++) {
    if (all[i].id in spec && spec[all[i].id] == true) {
      playlists.push(all[i])
    }
  }

  return playlists
}

/**
 * [ flattenSongs(lst) ] returns all the tracks of all the playlists of lst without duplicates. Every track [t] has fields:
 * - [t.duration_ms] is the duration of the song in ms.
 * - [t.album.images] is an array of 3 images just like for playlists.
 * - [t.name] is the name of the track.
 * - [t.uri] is a uri that can be used to play the track w/ Web Playback.
 * - [t.id] is a unique id for the track.
 * 
 * @param {Array<JSON>} playlists A list of playlists whose tracks to get.
 */
export function flattenSongs(playlists) {
  //A set of track ids that have been added to the list.
  const addedSongs = new Set()
  const tracks = []
  for (let i = 0; i < playlists.length; i++) {
    for (let j = 0; j < playlists[i].tracks.length; j++) {
      let track = playlists[i].tracks[j];
      if (!addedSongs.has(track.id)) {
        addedSongs.add(track.id)
        tracks.push(track)
      }
    }
  }

  return tracks
}
