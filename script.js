const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// Four Music Choices
const songs = [
  {
    name: 'spotify-Kilby_Girl',
    displayName: 'KilbyGirl',
    artist: 'The Backseat Lovers',
  },
  {
    name: 'spotify-Riptide',
    displayName: 'Riptide',
    artist: 'Vance Joy',
  },
  {
    name: 'spotify-Rude',
    displayName: 'Rude',
    artist: 'MAGIC!',
  },
  {
    name: 'spotify-Snooze',
    displayName: 'Snooze',
    artist: 'SZA',
  },
];

//Music is Paused at Launch
 let isPlaying = false;

// Play's Music
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

//Pauses Music
function pauseSong(){
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

//adds clickable pause and play
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update's Song
function loadSong(song){
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong(){
  songIndex--;
  //goes to last song if previous is first song
  if (songIndex < 0){
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong(){
  songIndex++;
  //goes back to first song if on the last song
  if (songIndex > songs.length - 1){
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//On Load - select first song
loadSong(songs[songIndex]);

//update Progress Bar & Time
function updateProgressBar(e){
  if(isPlaying){
    const {duration, currentTime} = e.srcElement;
    // Update Progress Bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width =  `${progressPercent}%`;
    // Calculate display for duration, Minutes
    const durationMinutes = Math.floor(duration/60);
    //Calcualte display for duration, Seconds
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10){
      durationSeconds =  `0${durationSeconds}`;
    }
    //to get rid of delayed change in time 
    if (durationSeconds){
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //Calculate display for current, Minutes
    const currentMinutes = Math.floor(currentTime/60);
    //Calcualte display for current, Seconds
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10){
      currentSeconds =  `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
 } 
}
//Set Progress Bar
function setProgressBar(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const{duration} = music;
  music.currentTime = (clickX / width) * duration;
}
// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

