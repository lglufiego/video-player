const video_player = document.querySelector("#video_player")
const mainVideo = video_player.querySelector("#main_video")
const pogressionAreaTime = video_player.querySelector(".progressAreaTime")
const controls = video_player.querySelector(".controls")
const progressArea = video_player.querySelector(".progress-area")
const progress_Bar = video_player.querySelector(".progress-bar")
const fast_rewind = video_player.querySelector(".fast-rewind")
const play_pause = video_player.querySelector(".play_pause")
const fast_forward = video_player.querySelector(".fast-forward")
const volume = video_player.querySelector(".volume")
const volume_range = video_player.querySelector(".volume_range")
const current = video_player.querySelector(".current")
const totalDuration = video_player.querySelector(".duration")
const auto_play = video_player.querySelector(".auto-play")
const settingsBtn = video_player.querySelector(".settingsBtn")
const picture_in_picture = video_player.querySelector(".picture_in_picture")
const fullscreen = video_player.querySelector(".fullscreen")
const settings = video_player.querySelector("#settings")
const playback = video_player.querySelector("#playback")

// Play video function
function playVideo() {
  play_pause.innerHTML = "pause";
  play_pause.title = "play";
  video_player.classList.add("paused");
  mainVideo.play();
}

// Play video function
function pauseVideo() {
  play_pause.innerHTML = "play_arrow";
  play_pause.title = "pause";
  video_player.classList.remove("paused");
  mainVideo.pause();
}

// Play video function
play_pause.addEventListener("click", () => {
  const isVideoPaused = video_player.classList.contains("paused");

  isVideoPaused ? pauseVideo() : playVideo();
});


// fast_rewind video function
fast_rewind.addEventListener("click", () => {
  mainVideo.currentTime -= 10;
});

// fast_forward video function
fast_forward.addEventListener("click", () => {
  mainVideo.currentTime += 10;
});

// Load video duration
mainVideo.addEventListener("loadeddata", (e) => {
  let videoDuration = e.target.duration;
  let totalMin = Math.floor(videoDuration / 60);
  let totalSec = Math.floor(videoDuration % 60);

  // if seconds are less than 10 then add 0 at thes beginning
  totalSec < 10 ? totalSec = "0" + totalSec : totalSec;
  totalDuration.innerHTML = `${totalMin} : ${totalSec}`
})

//current video duration
mainVideo.addEventListener('timeupdate', (e) => {
  let currentVideoTime = e.target.currentTime;
  let currentMin = Math.floor(currentVideoTime / 60);
  let currentSec = Math.floor(currentVideoTime % 60);
  //if seconds are less than 10 add 0 at the beginning
  currentSec < 10 ? currentSec = "0" + currentSec : currentSec;
  current.innerHTML = `${currentMin} : ${currentSec}`

  videoDuration = e.target.duration
  //progression bar width change
  let progressWidth = (currentVideoTime / videoDuration) * 100;
  progress_Bar.style.width = `${progressWidth}%`;
})

// Video ended
mainVideo.addEventListener('ended', () => {
  play_pause.innerHTML = "play_arrow";
  play_pause.title = "play";
  video_player.classList.remove("paused");
})

// Update video based on progress bar
progressArea.addEventListener("click", (e) => {
  let videoDuration = mainVideo.duration;
  let progressWidthVal = progressArea.clientWidth;
  let clickOffsetX = progressArea.offsetX;

  mainVideo.currentTime = (clickOffsetX / progressWidthVal) * videoDuration;
})