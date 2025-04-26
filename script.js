console.log("runnig");
let currentsong=new Audio();
let songs;
async function getsongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}


function formatTimeDisplay(current, total) {
  const format = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return `${format(current)} / ${format(total)}`;
}


async function main() {
   songs = await getsongs();
  console.log(songs);
  let songul = document.getElementById("cardleft");
  for (const song of songs) {
    const card = document.createElement("div");
    card.className = "cardleftchild";
    card.innerHTML = `<img src="box logo.png" alt="">
        <div class="name">
          <div class="songname1" data-song="${song}">${song.replaceAll("%20", " ")}</div>
          <div class="singer">sidhu</div>
        </div>
        <img src="logo2.png" alt="">`;
    songul.appendChild(card);
  }
  Array.from(document.getElementsByClassName("songname1")).forEach(e => {
    e.addEventListener("click", () => {
      const filename = e.getAttribute("data-song");
      console.log("Playing:", filename);
      playMusic(filename);
    });
  })
}
const playMusic=(track)=>{
  // let audio = new Audio("/songs/" +track)
  currentsong.src="http://127.0.0.1:5500/songs/" + track;
  currentsong.play()
   play.src="video-pause-button.png"
   document.querySelector(".songnamm").innerHTML = track.replaceAll("%20", "")
   document.querySelector(".songtime").innerHTML = "00:00/00:00"
}
async function left() {
   songs = await getsongs();
  console.log(songs);
  let songu = document.getElementById("cardright");
  for (const song of songs) {
    const card1 = document.createElement("div");
    card1.className = "cardrightchild";
    card1.innerHTML = `
               <div class="player">
                <img src="alien.jpg" alt="">
                <img src="player icon.ico" alt="" class="logo" data-song="${song}"></div>
                <div class="nameright">
                
                <div class="songname" data-song="${song}">${song.replaceAll("%20", "")}</div>
                <div class="singername">singername</div>
                </div>`;
    songu.appendChild(card1);
   }
   Array.from(document.getElementsByClassName("songname")).forEach(e => {
    e.addEventListener("click", () => {
      const filename = e.getAttribute("data-song");
      console.log("Playing:", filename);
      playMusic(filename);
    });
  })
  Array.from(document.getElementsByClassName("logo")).forEach(e=>{
    e.addEventListener("click",element=>{
      const music1=e.getAttribute("data-song");
      playMusic(music1);
      });
    })

  play.addEventListener("click",()=>{
    if(currentsong.paused){
      currentsong.play()
      play.src="video-pause-button.png"
    }
    else{
      currentsong.pause()
      play.src="play.png"
    }
  })
  next.addEventListener("click",()=>{
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        let l= songs.length
        if ((index+1)>l){
        playMusic(songs[index+1])}
    
  })
  back.addEventListener("click",()=>{
    let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
    if ((index-1)>=0){
    playMusic(songs[index-1])}

})
  currentsong.addEventListener("timeupdate",()=>{
    console.log(currentsong.currentTime,currentsong.duration)
    document.querySelector(".songtime").innerHTML=`${formatTimeDisplay(currentsong.currentTime,currentsong.duration)}`
    document.querySelector(".circle").style.left = (currentsong.currentTime/currentsong.duration)*100+"%";
  })
  document.querySelector(".seek").addEventListener("click",e=>{
    let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100
    document.querySelector(".circle").style.left= percent +"%";
    currentsong.currentTime=((currentsong.duration)*percent)/100;
  })
}

main();
left();
