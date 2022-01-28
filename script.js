const playlistcontainerTag = document.getElementsByClassName("playlistcontainer")[0];
const currentandtotalTimeTag = document.getElementsByClassName("currentandtotalTime")[0];
const audioTag = document.getElementsByClassName("audioTag")[0];
const currentProgressTag = document.getElementById("currentProgress");
const playbuttonTag = document.getElementsByClassName("playbuttom")[0];
const pausebuttonTag = document.getElementsByClassName("pausebuttom")[0];
const nextbuttomTag = document.getElementsByClassName("nextbuttom")[0];
const previousbuttomTag = document.getElementsByClassName("previousbuttom")[0];

const tracks = [
    {trackId: "music/t1.mp3", title : "Lady Gaga - 911"},
    {trackId: "music/t2.mp3", title : "Lady Gaga - Rain On Me feat. Ariana Grande"},
    {trackId: "music/t3.mp3", title : "Lady Gaga - Replay"},
    {trackId: "music/t4.mp3", title : "Lady Gaga - Stupid Love"},
    {trackId: "music/t5.mp3", title : "Lady Gaga, BLACKPINK - Sour Candy"},
];
for (let i = 0; i < tracks.length; i++){
    const trackTag = document.createElement("div");
    trackTag.addEventListener("click" , () => {
        playsong();
        currentPlayingIndex = i; 
    })
    trackTag.classList.add("trackItem");
    const title = (i + 1).toString() + ". " + tracks[i].title;
    trackTag.textContent = title;
    playlistcontainerTag.append(trackTag);
}

let duration = 0;
let durationText = "00:00"; 
audioTag.addEventListener("loadeddata", () => {
    duration = Math.floor(audioTag.duration);
    durationText =  createMinuteAndSecondText(duration); 
});

audioTag.addEventListener("timeupdate", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    const CurrentTimeText = createMinuteAndSecondText(currentTime);
    const CurrentTimeTextanddurationText = CurrentTimeText + " / " + durationText;
    currentandtotalTimeTag.textContent = CurrentTimeTextanddurationText;
    updatecurrentprogress(currentTime);
});
audioTag.addEventListener('ended', (event) => {
    currentPlayingIndex += 1;
    playsong();
  });

const updatecurrentprogress =(currentTime) => {
    const currentProgressWidth = (500/duration)*currentTime;
    currentProgressTag.style.width = currentProgressWidth.toString()+"px"
}

const createMinuteAndSecondText = (totalSecond) => {
    const Minutes = Math.floor(totalSecond/60);
    const Seconds = totalSecond % 60;

    const Minutestext = Minutes < 10 ? "0" + Minutes.toString() : Minutes;
    const Secondtext = Seconds < 10 ? "0" + Seconds.toString() : Seconds;

    return Minutestext + ":" + Secondtext;
};

let currentPlayingIndex = 0;
let isPlaying = false;
playbuttonTag.addEventListener("click",() => {
    const currentTime = Math.floor(audioTag.currentTime);
    isPlaying = true
    if (currentTime === 0){
    playsong();
}else {
    audioTag.play();
    updatePlayandPauseButtom();
}
});

pausebuttonTag.addEventListener("click",() => {
    isPlaying = false;
    audioTag.pause();
    updatePlayandPauseButtom(); 
});

previousbuttomTag.addEventListener("click",() => {
    if(currentPlayingIndex===0){
        return;
    }
    currentPlayingIndex -= 1;
    playsong()
});

nextbuttomTag.addEventListener("click",() => {
    if(currentPlayingIndex=== tracks.length - 1){
        return;
    }
    currentPlayingIndex += 1;
    playsong();
});

const updatePlayandPauseButtom = () => {
    if (isPlaying) {
        playbuttonTag.style.display = "none";
        pausebuttonTag.style.display = "inline";
    } else {
        playbuttonTag.style.display = "inline";
        pausebuttonTag.style.display = "none";
    }
}
const playsong = () =>{
    const songIDtoplay = tracks[currentPlayingIndex].trackId;
    audioTag.src = songIDtoplay;
    audioTag.play();
    isPlaying = true;
    updatePlayandPauseButtom();
}