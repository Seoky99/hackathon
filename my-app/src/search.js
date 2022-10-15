export function unsafeSearchSongs(songs, times) {
    let time = convertToSecond(times)
    let length = songs.length
    let lengthCopy = songs.length
    let songCopy = [...songs]
    var showerSong = []
    var i = true
    var timer = 0
    var safety = 0
    while (i) {
        var songInt = getRandomInt(0, lengthCopy - 1)
        if (songCopy[songInt].duration_ms / 1000 + timer + 2 < time) {
            showerSong.push(songCopy[songInt])
            songCopy.splice(songInt, 1)
            timer += songs[songInt].duration_ms / 1000
            lengthCopy -= 1
        }
        safety += 1
        if (safety > length * 2) {
            var song = getRandomInt(0, length - 1)
            if (songs[song].duration_ms / 1000 + timer + 2 < time) {
                showerSong.push(songs[song])
                timer += songs[song].duration_ms / 1000
            }
        }
        if (timer + 2 > time && timer - 2 < time) {
            i = false
        }
    }
    return showerSong
}

export function searchSongs(songs, times) {
    let time = convertToSecond(times)
    let length = songs.length
    var showerSong = []
    var i = true
    var timer = 0
    let safety = 0
    while (i) {
        var song = getRandomInt(0, length - 1)
        if (songs[song].duration_ms / 1000 + timer + 2 < time) {
            showerSong.push(songs[song])
            timer += songs[song].duration_ms / 1000
        }
        if (timer + 2 > time && timer - 2 < time) {
            i = false
        }
        safety += 1
        if (safety > time * 10) {
            i = false
        }
    }
    return showerSong
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function convertToSecond(time) {
    return time * 60
}

/**
 * [ getCloserSongs(lst, current, goal) ] returns a subarray of [lst] consisting
 * of tracks you can add such that the current time will be greedily brought
 * closer to the goal.
 * 
 * @param {track[]} lst The lst of songs to consider. 
 * @param {float} current The current time.
 * @param {float} goal The goal time.
 * 
 * @return A list [l] of all songs in [lst] that, if added, would bring the current
 * time closer to the goal. 0 <= l.length <= lst.length
 */
function getCloserSongs(lst, current, goal) {
    const tracks = []
    for (let i = 0; i < lst.length; i++) {
        if (Math.abs(current - goal) > Math.abs(((lst[i].duration_ms / 1000) + current) - goal)) {
            tracks.push(lst[i])
        }
    }
    return tracks
}