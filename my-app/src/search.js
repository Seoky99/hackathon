/**
 * Randomly generates one (1) subarray of songs with a greedy algorithm that attempts to
 * (but is not guaranteed to be) within 1 minute of the goal.
 *
 * @param {song[]} songs List of songs to select from.
 * @param {float} goal Duration goal to meet in minutes.
 * @returns
 */
export function searchSongs(songs, goal) {
  goal = convertToSecond(goal);
  let resultSongs = [];

  let currentTime = 0.0;
  let currentSongs = [...songs];
  while (true) {
    let betterSongs = getCloserSongsClamp(currentSongs, currentTime, goal, 1);
    // We have met a point where no songs in the entire original list can work.
    if (betterSongs.length === 0 && currentSongs.length === songs.length) break;
    // We have run out of better songs, but we can still replenish the list.
    else if (betterSongs.length == 0) {
      currentSongs = [...songs];
      continue;
    }

    // Postcondition: betterSongs.length > 0:
    // We can be certain randomSong will bring us closer by the postcondition of getCloserSongs.
    let randomSong = betterSongs[getRandomInt(0, betterSongs.length - 1)];
    resultSongs.push(randomSong);
    currentSongs.splice(currentSongs.indexOf(randomSong), 1);
    currentTime += randomSong.duration_ms / 1000;
  }
  return resultSongs;
}

/**
 * Finds the best playlist by repeating [searchSongs(songs, goal)] [rep] times.
 *
 * @param {song[]} songs List of songs to select from.
 * @param {float} goal Duration goal to meet in minutes.
 * @param {int} rep Number of times to repeat the search to refine a result.
 * @returns An array of songs that was the closest in duration.
 */
export function bruteForceSearchSongs(songs, goal, rep) {
  let possiblePlaylists = [];
  for (let i = 0; i < rep; i++) {
    possiblePlaylists.push(searchSongs(songs, goal));
  }
  goal = convertToSecond(goal);

  if (possiblePlaylists.length === 0) return [];

  // Postc: possiblePlaylists.length > 0

  let bestPlaylist = possiblePlaylists[0];
  let bestDur = 0;
  bestPlaylist.forEach((e) => {
    bestDur += e.duration_ms / 1000;
  });

  for (let i = 1; i < possiblePlaylists.length; i++) {
    let duration = 0;
    possiblePlaylists[i].forEach((e) => {
      duration += e.duration_ms / 1000;
    });

    if (Math.abs(duration - goal) < Math.abs(bestDur - goal)) {
      bestPlaylist = possiblePlaylists[i];
      bestDur = duration;
    }
  }

  return bestPlaylist;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function convertToSecond(time) {
  return time * 60;
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
  const tracks = [];
  for (let i = 0; i < lst.length; i++) {
    if (
      Math.abs(current - goal) >
      Math.abs(lst[i].duration_ms / 1000 + current - goal)
    ) {
      tracks.push(lst[i]);
    }
  }
  return tracks;
}

/**
 * [ getCloserSongs(lst, current, goal) ] returns a subarray of [lst] consisting
 * of tracks you can add such that the current time will be greedily brought
 * closer to the goal.
 *
 * @param {track[]} lst The lst of songs to consider.
 * @param {float} current The current time.
 * @param {float} goal The goal time.
 * @param {float} clamp The highest amount that the playlist duration can go OVER the goal.
 *
 * @return A list [l] of all songs in [lst] that, if added, would bring the current
 * time closer to the goal while under the clamp constraint. 0 <= l.length <= lst.length
 */
function getCloserSongsClamp(lst, current, goal, clamp) {
  const tracks = [];
  for (let i = 0; i < lst.length; i++) {
    if (
      Math.abs(current - goal) >
      Math.abs(lst[i].duration_ms / 1000 + current - goal)
    ) {
      // If new duration falls within the clamp
      if (lst[i].duration_ms / 1000 + current - goal <= clamp)
        tracks.push(lst[i]);
    }
  }
  return tracks;
}
