const video_player = document.querySelector("#video_player")
const mainVideo = video_player.querySelector("#main-video")
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
const duration = video_player.querySelector(".duration")
const auto_play = video_player.querySelector(".auto-play")
const settingsBtn = video_player.querySelector(".settingsBtn")
const picture_in_picture = video_player.querySelector(".picture_in_picture")
const fullscreen = video_player.querySelector(".fullscreen")
const settings = video_player.querySelector("#settings")
const playback = video_player.querySelector("#playback")

function playVideo() {
  play_pause.innerHTML = "pause";
  play_pause.title = "play";
  video_player.classList.add("paused");
  mainVideo.play();
}

function pauseVideo() {
  play_pause.innerHTML = "play_arrow";
  play_pause.title = "pause";
  video_player.classList.remove("paused");
  mainVideo.pause();
}

play_pause.addEventListener("click", () => {
  playVideo()
});

// 41:31