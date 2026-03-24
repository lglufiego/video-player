const video_player = document.querySelector("#video_player")
const mainVideo = video_player.querySelector("#main_video")
const progressAreaTime = video_player.querySelector(".progressAreaTime")
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
const playback = video_player.querySelectorAll(".playback li")

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
});

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
});

progressArea.addEventListener('click', (e) => {
  let videoDuration = mainVideo.duration;
  let progressWidthval = progressArea.clientWidth;
  let ClickOffsetX = e.offsetX;
  mainVideo.currentTime = (ClickOffsetX / progressWidthval) * videoDuration;
});

// Video ended
mainVideo.addEventListener('ended', () => {
  play_pause.innerHTML = "play_arrow";
  play_pause.title = "play";
  video_player.classList.remove("paused");
});

// change volume
function changeVolume() {
  mainVideo.volume = volume_range.value / 100;
  if (volume_range.value == 0) {
    volume.innerHTML = 'volume_off';
  } else if (volume_range.value < 40) {
    volume.innerHTML = 'volume_down';
  } else {
    volume.innerHTML = 'volume_up';
  }
}

function muteVolume() {
  if (volume_range.value == 0) {
    volume_range.value = 80;
    mainVideo.volume = 0.8;
    volume.innerHTML = 'volume_up';
  } else {
    volume_range.value = 0;
    mainVideo.volume = 0;
    volume.innerHTML = 'volume_off';
  }
}

volume_range.addEventListener('change', () => {
  changeVolume();
});

volume.addEventListener('click', () => {
  muteVolume();

});

// update progress area time and display block on mouse
progressArea.addEventListener('mousemove', (e) => {
  let progressWidthval = progressArea.clientWidth;
  let x = e.offsetX;
  progressAreaTime.style.setProperty('--x', `${x}px`);
  progressAreaTime.style.display = 'block';

  let videoDuration = mainVideo.duration;
  let progressTime = Math.floor((x / progressWidthval) * videoDuration);
  let currentMin = Math.floor(progressTime / 60);
  let currentSec = Math.floor(progressTime % 60);
  currentSec < 10 ? currentSec = "0" + currentSec : currentSec;
  progressAreaTime.innerHTML = `${currentMin} : ${currentSec}`;
});

progressArea.addEventListener('mouseleave', () => {
  progressAreaTime.style.display = 'none';
});


//autoplay
auto_play.addEventListener('click', () => {
  auto_play.classList.toggle('active');
  if (auto_play.classList.contains('active')) {
    auto_play.title = "Autoplay is on";
  } else {
    auto_play.title = "Autoplay is off";
  }
});

mainVideo.addEventListener('ended', () => {
  if (auto_play.classList.contains('active')) {
    playVideo();
  }
  else {
    play_pause.innerHTML = "replay";
    play_pause.title = "Replay";

  }
})

// picture in picture


picture_in_picture.addEventListener('click', () => {
  mainVideo.requestPictureInPicture();
});

// fullscreen

fullscreen.addEventListener('click', () => {
  if (!video_player.classList.contains('openFullScreen')) {
    video_player.classList.add('openFullScreen');
    fullscreen.innerHTML = 'fullscreen_exit';
    video_player.requestFullscreen();
  } else {
    video_player.classList.remove('openFullScreen');
    fullscreen.innerHTML = 'fullscreen';
    document.exitFullscreen();
  }
});


// open settings

settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('active');
  settingsBtn.classList.toggle('active');
});


// playback rate

playback.forEach((event) => {
  event.addEventListener('click', () => {
    removeActiveClasses();
    event.classList.add('active');
    let speed = event.getAttribute('data-speed');
    mainVideo.playbackRate = speed;
  })
})

function removeActiveClasses() {
  playback.forEach(event => {
    event.classList.remove('active');
  });
}


// store video duration and video path in local storage

window.addEventListener('unload', () => {
  let setDuration = localStorage.setItem('duration', `${mainVideo.duration}`);
  let setSrc = localStorage.setItem('src', `${mainVideo.getAttribute('src')}`);
});

window.addEventListener('load', () => {
  let getDuration = localStorage.getItem('duration');
  let getSrc = localStorage.getItem('src');
  if (getSrc) {
    mainVideo.src = getSrc;
    mainVideo.currentTime = getDuration;
  }
});


mainVideo.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});


// mouse over settings

video_player.addEventListener('mouseover', () => {
  controls.classList.add('active');
});

video_player.addEventListener('mouseleave', () => {
  if (video_player.classList.contains('paused')) {
    if (settingsBtn.classList.contains('active')) {
      controls.classList.add('active');
    } else {
      controls.classList.remove('active');
    }
  } else {
    controls.classList.remove('active');
  }
});

if (video_player.classList.contains('paused')) {
  if (settingsBtn.classList.contains('active')) {
    controls.classList.add('active');
  } else {
    controls.classList.remove('active');
  }
} else {
  controls.classList.remove('active');
}

// mobile touch controls

video_player.addEventListener('touchstart', () => {
  controls.classList.add('active');
  setTimeout(() => {
    controls.classList.remove('active');
  }, 3000);
});

video_player.addEventListener('touchmove', () => {
  if (video_player.classList.contains('paused')) {
    controls.classList.remove('active');
  } else {
    controls.classList.add('active');
  }
});