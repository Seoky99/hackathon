function unsafeSearchSongs(songs, times) {
    let time = convertToSecond(times)
    let length = songs.length
    let lengthCopy = songs.length
    let songCopy = songs
    var showerSong = []
    var i = true
    var timer = 0
    var safety = 0
    var safety2 = 0
    while(i) {
        var songInt = getRandomInt(0, lengthCopy-1)
        if(songCopy[songInt].duration_ms/1000+timer+2<time) {
            showerSong.push(songCopy[songInt])
            songCopy.splice(songInt,1)
            timer += songs[songInt].duration_ms/1000
            lengthCopy -= 1
        }
        safety2 += 1
        if (safety2>length*2) {
            var song = getRandomInt(0, length-1)
            if(songs[song].duration_ms/1000+timer+2<time) {
                showerSong.push(songs[song])
                timer += songs[song].duration_ms/1000
            }    
        }
        if(timer+2>time && timer-2<time) {
            i = false
        }
        safety += 1
        if(safety>time*10) {
            i = false
        }
    }
    return showerSong
}

function searchSongs(songs, times) {
    let time = convertToSecond(times)
    let length = songs.length
    var showerSong = []
    var i = true
    var timer = 0
    let safety = 0
    while(i) {
        var song = getRandomInt(0, length-1)
        if(songs[song].duration_ms/1000+timer+2<time) {
            showerSong.push(songs[song])
            timer += songs[song].duration_ms/1000
        }
        if(timer+2>time && timer-2<time) {
            i = false
        }
        safety += 1
        if(safety>time*10) {
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
    return time*60
}