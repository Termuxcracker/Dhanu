// Poem lines for Dhanu 💕
const poemLines = [
  "Dhanu, my star in the endless night ✨",
  "Your smile lights up my darkest skies 💖",
  "With every heartbeat, I whisper your name 🌸",
  "In you, I found my forever home ❤️",
  "No distance, no time, no storm can break this bond 🌹",
  "Because, my love…",
  "I will always, always love you 💕"
];

const poemElement = document.getElementById("poem");
const bgMusic = document.getElementById("bg-music");
const replayBtn = document.getElementById("replayBtn");
const floatingContainer = document.getElementById("floating-elements");
const finaleCanvas = document.getElementById("finaleCanvas");
const ctx = finaleCanvas.getContext("2d");

let width, height;
function resizeCanvas() {
  width = finaleCanvas.width = window.innerWidth;
  height = finaleCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Floating hearts and petals
function createFloatingElement() {
  const el = document.createElement("div");
  el.classList.add("floating");
  el.innerHTML = Math.random() > 0.5 ? "💖" : "🌸";
  el.style.left = Math.random() * 100 + "vw";
  el.style.animationDuration = 5 + Math.random() * 5 + "s";
  el.style.fontSize = 20 + Math.random() * 20 + "px";
  floatingContainer.appendChild(el);

  setTimeout(() => { el.remove(); }, 10000);
}

setInterval(createFloatingElement, 800);

// Typewriter poem effect
async function typePoem() {
  poemElement.innerHTML = "";
  for (let line of poemLines) {
    for (let char of line) {
      poemElement.innerHTML += char;
      await new Promise(r => setTimeout(r, 80));
    }
    poemElement.innerHTML += "\n";
    await new Promise(r => setTimeout(r, 600));
  }
  triggerFinale();
}

// Music control
function playMusic() {
  bgMusic.play().catch(() => {
    console.log("Music play failed until user interacts.");
  });
}

// Finale effect: raining "I love you Dhanu"
function triggerFinale() {
  let particles = [];
  class Particle {
    constructor(x, y, text) {
      this.x = x;
      this.y = y;
      this.text = text;
      this.dy = 2 + Math.random() * 3;
      this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
      this.size = 20 + Math.random() * 15;
    }
    draw() {
      ctx.font = `${this.size}px Arial`;
      ctx.fillStyle = this.color;
      ctx.fillText(this.text, this.x, this.y);
    }
    update() {
      this.y += this.dy;
      if (this.y > height) this.y = -20;
      this.draw();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => p.update());
    requestAnimationFrame(animate);
  }

  for (let i = 0; i < 60; i++) {
    particles.push(new Particle(Math.random() * width, Math.random() * height, "I love you Dhanu"));
  }
  animate();
}

// Replay button
replayBtn.addEventListener("click", () => {
  typePoem();
  playMusic();
});

// Start everything
window.onload = () => {
  typePoem();
  playMusic();
};
