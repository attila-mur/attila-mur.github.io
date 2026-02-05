const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const mouse = {
  x: null,
  y: null,
  radius: 120
};

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

class Particle {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 1;
  }

  update() {
    if (mouse.x !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.vx += (dx / dist) * force * 0.6;
        this.vy += (dy / dist) * force * 0.6;
      }
    }

    this.x += this.vx;
    this.y += this.vy;

    // Soft wrap-around
    if (this.x < 0) this.x = w;
    if (this.x > w) this.x = 0;
    if (this.y < 0) this.y = h;
    if (this.y > h) this.y = 0;

    // Gentle damping
    this.vx *= 0.98;
    this.vy *= 0.98;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(180, 200, 255, 0.8)";
    ctx.fill();
  }
}

const particles = [];
const PARTICLE_COUNT = Math.min(120, Math.floor((w * h) / 15000));

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, w, h);

  for (const p of particles) {
    p.update();
    p.draw();
  }

  requestAnimationFrame(animate);
}

animate();

