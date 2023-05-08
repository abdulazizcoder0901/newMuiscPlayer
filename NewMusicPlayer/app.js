let nowPlaying = document.querySelector('.now-playing')
let trackArt = document.querySelector('.track-art')
let trackName = document.querySelector('.track-name')
let trackArtist = document.querySelector('.track-artist')

let playPauseBtn = document.querySelector('.playpause-track')
let nextBtn = document.querySelector('.next-track') 
let prevtBtn = document.querySelector('.prev-track') 

let seekSlider = document.querySelector('.seek-slider')
let volumeSlider = document.querySelector('.volume-slider')
let currentTime = document.querySelector('.current-time')
let totalDuration = document.querySelector('.total-duration')
let wave = document.querySelector('#wave')
let randomIcon = document.querySelector('.fa-random')
let repeatIcon = document.querySelector('.fa-repeat')
let currentTrack = document.createElement('audio')

let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const musicList = [
    {
        img:'box/images/Guitar.png',
        name:'Ketavering Yalinmayman',
        artist:'Jaloliddin Ahmadaliyev',
        music:'box/musics/jalol.mp3'
    },
    {
        img:'box/images/Panda.jpg',
        name:'Holimga Qara',
        artist:'Hamdam Sobirov',
        music:'box/musics/hamdam.mp3'
    },
    {
        img:'box/images/all.png',
        name:'Omad Yor Bolsin',
        artist:'Nilufar Usmonova & Khan',
        music:'box/musics/Omad Yor Boolsin.mp3'
    },
    {
        img:'box/images/Pod.jpg',
        name:'Just Music',
        artist:'Nobody',
        music:'box/musics/song 1.mp3'
    },
    {
        img:'box/images/olddisk.png',
        name:'Just Music',
        artist:'Nobody',
        music:'box/musics/song 2.mp3'
    },
    {
        img:'box/images/phone.png',
        name:'Just Music',
        artist:'Nobody',
        music:'box/musics/song 3.mp3'
    },
    {
        img:'box/images/Pod.jpg',
        name:'Just Music',
        artist:'Nobody',
        music:'box/musics/song 4.mp3'
    },
    {
        img:'box/images/sky.png',
        name:'Just Music',
        artist:'Nobody',
        music:'box/musics/song 5.mp3'
    },
    {
        img:'box/images/redpeople.png',
        name:'Just Music',
        artist:'Nobody',
        music:'box/musics/song 6.mp3'
    },
    {
        img:'box/images/guitar2.png',
        name:'Just Music',
        artist:'Nobody',
        music:'box/musics/song 7.mp3'
    },
    {
        img:'box/images/microfon.png',
        name:'Tor Kocha',
        artist:'Ziyoda',
        music:'box/musics/Tor Kocha.m4a'
    },
    {
        img:'box/images/peoplee.png',
        name:'Abu Bandit',
        artist:'New Artist',
        music:'box/musics/Bandit.mp3'
    },
    {
        img:'box/images/Guitar.png',
        name:'Jaylan',
        artist:'Jasur Mavlonov & Gulinur',
        music:'box/musics/Jaylan.mp3'
    },
    {
        img:'box/images/digey.png',
        name:'Siqnal Italyaniski',
        artist:'Nobody',
        music:'box/musics/Siqnal.m4a'
    },
    {
        img:'box/images/all.png',
        name:'Jinnivoyim',
        artist:'Not Know',
        music:'box/musics/Jinnivoyim.mp3'
    },
    {
        img:'box/images/headphones.png',
        name:'Popuri',
        artist:'Uzeyr',
        music:'box/musics/Uzeyir Mehdizade.mp3'
    },
    {
        img:'box/images/disk.png',
        name:'Ogridi Dil',
        artist:'Uzmir',
        music:'box/musics/uzmir.m4a'
    },
    {
        img:'box/images/phone.png',
        name:'Yonimda',
        artist:'Ulugbek Rahmatullayev',
        music:'box/musics/Yonimda.mp3'
    },
    {
        img:'box/images/headphones.png',
        name:'Song 8',
        artist:'Not Know',
        music:'box/musics/Song 8.mp3'
    },
    {
        img:'box/images/sky.png',
        name:'Yiglama Muhabbat',
        artist:'Jahongir & Shahriyor & Shohruhxon',
        music:'box/musics/Muhabbat.mp3'
    },
]

loadTrack(trackIndex);

function loadTrack(trackIndex){
    clearInterval(updateTimer)
    reset();

    currentTrack.src = musicList[trackIndex].music;
    currentTrack.load();
    
    trackArt.style.backgroundImage = "url(" + musicList[trackIndex].img + ")";
    trackName.textContent = musicList[trackIndex].name;
    trackArtist.textContent = musicList[trackIndex].artist;
    nowPlaying.textContent = `Playing music ${trackIndex + 1} of ${musicList.length}`;
    
    updateTimer = setInterval(setUpdate, 1000);

    currentTrack.addEventListener('ended', nextTrack)
    randomBgColor();
}

function randomBgColor (){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i = 0; i < 6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x]
            a += y
        }
        return a
    }
    let color1 = populate('#')
    let color2 = populate('#')
    let angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + color1 + ',' + color2 + ')';

    document.body.style.background = gradient;
}

function reset(){
    currentTime.textContent = '00:00';
    totalDuration.textContent = '00:00';
    seekSlider.value = 0;
}

function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive')
}

function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive')
}

function repeatTrack(){
        let currentIndex = trackIndex;
        loadTrack(currentIndex)
        playTrack()
}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack()
}

function playTrack(){
    currentTrack.play()
    isPlaying = true;
    trackArt.classList.add('rotate')
    wave.classList.add('loader')
    playPauseBtn.innerHTML = '<i class = "fa fa-pause-circle fa-3x"></i>';
}

function pauseTrack(){
    currentTrack.pause()
    isPlaying = false;
    trackArt.classList.remove('rotate')
    wave.classList.remove('loader')
    playPauseBtn.innerHTML = '<i class = "fa fa-play-circle fa-3x"></i>';
}

function nextTrack(){
    if(trackIndex < musicList.length -1 && isRandom === false){
        trackIndex++;
    }else if(trackIndex < musicList.length -1 && isRandom === true){
        let randomIndex = Number.parseInt(Math.random() * musicList.length);
        trackIndex = randomIndex;
    }else{
        trackIndex = 0;
    }

    loadTrack(trackIndex)
    playTrack()
}

function prevTrack(){
    if(trackIndex <= 0){
        trackIndex = musicList.length -1;
    }else{
        trackIndex--
    }
    loadTrack(trackIndex)
    playTrack()
}

function seekTo(){
    let seekto = currentTrack.duration * (seekSlider.value / 100);
    currentTrack.currentTime = seekto;
}

function setVolume(){
    currentTrack.volume = volumeSlider.value / 100;
}

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(currentTrack.duration)){
        seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
        seekSlider.value = seekPosition;

        let currentMinutes = Math.floor(currentTrack.currentTime / 60);
        let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);
        let durationTime = Math.floor(currentTrack.duration / 60);
        let durationSeconds = Math.floor(currentTrack.duration - durationTime * 60)

        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes}
        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds}
        if(durationTime < 10) {durationTime = "0" + durationTime}
        if(durationSeconds < 10) {durationSeconds = "0" + durationSeconds}

        currentTime.textContent = currentMinutes + ":" + currentSeconds;
        totalDuration.textContent = durationTime + ":" + durationSeconds;
    }
}