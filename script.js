const photoData = [
  { src: "assets/photo1.jpg", caption: "I miss this smile❤️", rot: -3 },
  { src: "assets/photo2.jpg", caption: "I miss seeing you happy.", rot: 2.5 },
  { src: "assets/photo3.jpg", caption: "I miss your presence.", rot: -2 },
  { src: "assets/photo4.jpg", caption: "I miss your random little things. 😭", rot: 3 },
  { src: "assets/photo5.jpg", caption: "I miss your natkhat rashile nitamb🫦", rot: -3.5 },
  { src: "assets/photo6.jpg", caption: "I miss your moans", rot: 2 },
  { src: "assets/photo7.jpg", caption: "Okay…maybe I miss you a little too much.", rot: -2.5 },
  { src: "assets/photo8.jpg", caption: "Actually…definitely too much 🥺", rot: 3 },
  { src: "assets/photo9.jpg", caption: "Okay, I think you get it now.", rot: 0 }
];

let currentPhotoIndex = 0;
let songStarted = false;
const bgSong = document.getElementById("bgSong");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

bgSong.volume = 0.65;

function startMusicSilently() {
  if (!songStarted) {
    bgSong.play().then(() => {
      songStarted = true;
      musicIcon.textContent = "🔊";
    }).catch(() => {});
  }
}

window.addEventListener("click", startMusicSilently);
window.addEventListener("touchstart", startMusicSilently);

musicToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  if (bgSong.paused) {
    bgSong.play().then(() => {
      musicIcon.textContent = "🔊";
      songStarted = true;
    }).catch(() => {});
  } else {
    bgSong.pause();
    musicIcon.textContent = "🔇";
  }
});

function goToScreen(screenNumber) {
  document.querySelectorAll(".screen").forEach(screen => screen.classList.remove("active"));
  const target = document.getElementById(`screen${screenNumber}`);
  if (target) target.classList.add("active");

  if (screenNumber === 2) animateMeter();
  else if (screenNumber === 5) triggerFinalSequence();
}

function animateMeter() {
  const meterFill = document.getElementById("meterFill");
  const meterPercent = document.getElementById("meterPercent");
  meterFill.style.width = "0%";
  meterPercent.innerText = "0%";

  setTimeout(() => {
    meterFill.style.width = "100%";
    let count = 0;
    const duration = 2000;
    const stepTime = duration / 100;
    const timer = setInterval(() => {
      count++;
      meterPercent.innerText = `${count}%`;
      if (count >= 100) clearInterval(timer);
    }, stepTime);
  }, 400);
}

function startPhotoScreen() {
  goToScreen(3);
  currentPhotoIndex = 0;
  displayPhoto(0);
}

function displayPhoto(index) {
  const polaroid = document.getElementById("polaroidCard");
  const img = document.getElementById("polaroidImg");
  const caption = document.getElementById("polaroidCaption");
  const counter = document.getElementById("photoCounter");
  const finalMsg = document.getElementById("photoFinalMsg");
  const nextBtn = document.getElementById("nextPhotoBtn");

  finalMsg.classList.add("hidden");
  nextBtn.style.display = "inline-flex";

  const data = photoData[index];
  counter.innerText = `${index + 1} / ${photoData.length}`;

  polaroid.style.opacity = "0";
  polaroid.style.transform = `scale(0.85) rotate(${data.rot * 2}deg)`;

  setTimeout(() => {
    img.src = data.src;
    caption.innerText = data.caption;
    polaroid.style.opacity = "1";
    polaroid.style.transform = `scale(1) rotate(${data.rot}deg)`;
  }, 250);
}

function nextPhoto() {
  currentPhotoIndex++;
  if (currentPhotoIndex < photoData.length) {
    displayPhoto(currentPhotoIndex);
  } else {
    document.getElementById("nextPhotoBtn").style.display = "none";
    document.getElementById("photoFinalMsg").classList.remove("hidden");
  }
}

let envelopeOpened = false;

function openEnvelope() {
  if (envelopeOpened) return;
  envelopeOpened = true;
  document.getElementById("envelopeWrapper").classList.add("open");
  setTimeout(startTypewriter, 1200);
}

const letterParagraph =
`Mikkuuuu I'm missing you so much.....Bahut zayda yaad aa li🥺🥺\n
And today you are going to be busy the whole day....aur tu faltu ka yeh mast soch kr ki aisa ho rha toh teri kya glti and all😭😭\n
I love you so so much baccha❤️\n
You are just mine💋💋💋`;

function startTypewriter() {
  const container = document.getElementById("typewriterText");
  const followup = document.getElementById("letterFollowup");
  container.innerText = "";

  let i = 0;
  const speed = 40;

  function type() {
    if (i < letterParagraph.length) {
      container.innerText += letterParagraph.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      followup.classList.remove("hidden");
    }
  }
  type();
}

function triggerFinalSequence() {
  const blocks = document.querySelectorAll(".final-content .msg-block");
  blocks.forEach(b => b.classList.remove("visible"));
  setTimeout(() => blocks[0]?.classList.add("visible"), 500);
  setTimeout(() => blocks[1]?.classList.add("visible"), 2000);
  setTimeout(() => blocks[2]?.classList.add("visible"), 3500);
  setTimeout(() => blocks[3]?.classList.add("visible"), 4800);
}

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * width;
    this.y = height + Math.random() * 20;
    this.size = Math.random() * 9 + 6;
    this.speedY = Math.random() * 0.9 + 0.5;
    this.speedX = Math.sin(Math.random() * Math.PI) * 0.6;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.isHeart = Math.random() > 0.4;
  }
  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    if (this.y < -30) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = "#ff6b8b";
    if (this.isHeart) {
      const d = this.size;
      ctx.translate(this.x, this.y);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-d / 2, -d / 2, -d, d / 3, 0, d);
      ctx.bezierCurveTo(d, d / 3, d / 2, -d / 2, 0, 0);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size / 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

const particles = Array.from({ length: 28 }, () => new Particle());

function renderLoop() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(renderLoop);
}
renderLoop();
