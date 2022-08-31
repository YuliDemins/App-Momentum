import playList from './playList.js';

let CurrentAudio = document.querySelector('.current-audio')
let audioRunTime = document.querySelector('.current-time-run')
let audioShowTime = document.querySelector('.current-time-show')

let isPlay = false;
let playNum = 0;

    CurrentAudio.textContent = playList[0].title;
    audioShowTime.textContent = playList[0].duration;
    audioRunTime.textContent = `00:00`

const audio = document.querySelector('audio');
const player = document.querySelector('.player');
const playPrev = document.querySelector('.play-prev')
const play = document.querySelector('.play')
const playNext = document.querySelector('.play-next')

const playListContainer = document.querySelector('.play-list')

let timeAudio = document.querySelector(".audiotime");
let audioLength = document.querySelector(".audio-track");

let arrPlayList = playListContainer.childNodes;

playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('play-item')
    li.innerHTML = `<span class='play-title'>${el.title}</span><span class='time-run'>${el.duration}</span> `;
    playListContainer.append(li)
  })


function playPrevAudio () {
    playNum == 0 ? playNum = playList.length - 1 : playNum--;
    
    isPlay = true;
    playAudio();
    play.classList.add('pause');
}

function playNextAudio () {
    playNum == playList.length - 1 ? playNum = 0 : playNum++;

    isPlay = true;
    playAudio();
    play.classList.add('pause');
}

function togglePlay() {
    play.classList.toggle('pause');
    isPlay = !isPlay
    isPlay ? playAudio() : pauseAudio()
}

function playAudio() {
    if (audio.src.indexOf(playList[playNum].src) === -1) audio.src = playList[playNum].src;
    for (let item of arrPlayList){
        item.classList.remove('item-active');
        item.classList.remove('paused')
    }
    arrPlayList[playNum].classList.add('item-active')
    arrPlayList[playNum].classList.add('paused')
    audioShowTime.textContent = ''+playList[playNum].duration
    CurrentAudio.textContent = playList[playNum].title
    audio.play();
    isPlay = true;
    arrPlayList[playNum].scrollIntoView({ behavior: "smooth", block: "center" })
    getAudioLength ()
    changeAudioTime ()
}

function pauseAudio() {
    arrPlayList[playNum].classList.remove('item-active')
    arrPlayList[playNum].classList.remove('paused')
    audio.pause();
    isPlay = false;
}

arrPlayList.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        playNum = index;
        if (e.currentTarget.classList.contains('item-active')) {
            arrPlayList[index].classList.remove('paused')
            item.classList.remove('item-active')
            play.classList.remove('pause');

            isPlay = false;
           pauseAudio()  
        } else {
            for (item of arrPlayList) {
                item.classList.remove('item-active')
                item.classList.remove('paused')
            }
            arrPlayList[index].classList.add('paused')
                arrPlayList[index].classList.add('item-active')
                play.classList.add('pause');
                isPlay = true;
                playAudio();
        }

    })

})

const timeRun = document.querySelectorAll('.time-run')

    function getAudioLength () {
        setInterval(function(){
            let audioTime = Math.floor(audio.currentTime);
            let audioDuration = Math.floor(audio.duration);
            timeAudio.style.width = audioTime / audioDuration * 100 + "%";
            audioRunTime.textContent = `${(''+Math.floor(audioTime/60)).padStart(2, '0')}:${(''+Math.floor(audioTime%60)).padStart(2, '0')}`;
            timeRun[playNum].textContent = `${(''+Math.floor((playList[playNum].length - audioTime)/60)).padStart(2, '0')}:${(''+Math.floor((playList[playNum].length - audioTime)%60)).padStart(2, '0')}`;
            if (audioTime == audioDuration) {
                timeRun[playNum].innerHTML = `${(''+Math.floor(audioTime/60)).padStart(2, '0')}:${(''+Math.floor(audioTime%60)).padStart(2, '0')}`
            playNextAudio();
            }
        }, 10)

}


playPrev.addEventListener('click', playPrevAudio)
playNext.addEventListener('click', playNextAudio)


play.addEventListener('click', () => {
    togglePlay ()
    getAudioLength ()
    
})


function changeAudioTime () {
    audioLength.addEventListener ('mousedown', (e) => {
        slideDurationLine(e)
    }, false);
    audioLength.addEventListener('mousemove', (e) => {

        if (e.buttons == 1) {
            slideDurationLine (e);
        }
    });
    audioLength.addEventListener('mouseup', (e) => {
        slideDurationLine(e);
    })
}

function slideDurationLine (e) {
    const audioWidth = window.getComputedStyle(audioLength).width;
    const newLength = e.offsetX / parseInt(audioWidth) * audio.duration;
    audio.currentTime = newLength;
    if (newLength == audioWidth) playNextAudio();
}

audioLength.addEventListener('click', e => {
    const audioWidth = window.getComputedStyle(audioLength).width;
    const newLength = e.offsetX / parseInt(audioWidth) * audio.duration;
    audio.currentTime = newLength;
    if (newLength == audioWidth) playNextAudio();
  }, false)



//=== Volume===

const btnVolume = document.querySelector('.volume-icon');
const muteVolume = document.querySelector('.volume-mute')
const volumeLine = player.querySelector(".volume-line")


function toogleVolume () {
    muteVolume.classList.toggle('_change-volume');
    if (muteVolume.classList.contains('_change-volume')) {
        audio.muted = true
    } else audio.muted = false
}

btnVolume.addEventListener ('click', toogleVolume)

audio.volume = 0.9;

let Volume = document.querySelector('.volume');
volumeLine.value = 90 
function changeVolume () {
    const newVolume = parseInt(volumeLine.value);
    audio.volume = newVolume/100;

    if (parseInt(newVolume) == 0){
        muteVolume.classList.add('_change-volume');
        audio.muted = true
    }
    if (parseInt(newVolume) > 0){
        volumeLine .classList.add('_change-volume');
        muteVolume.classList.remove('_change-volume');
        audio.muted = false
    }
  }
  for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
    e.style.setProperty('--value', e.value);
    e.style.setProperty('--min', e.min == '' ? '0' : e.min);
    e.style.setProperty('--max', e.max == '' ? '100' : e.max);
    e.addEventListener('input', () => e.style.setProperty('--value', e.value));
  }

  Volume.addEventListener('change', changeVolume)

export { togglePlay, pauseAudio, player, play}
  export default './player.js'
