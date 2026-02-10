const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const cols = Math.floor(w / 20);
const drops = Array(cols).fill(0);

function draw() {
  ctx.fillStyle = 'rgba(11,15,20,0.15)';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#4fd1c5';
  ctx.font = '14px monospace';

  drops.forEach((y, i) => {
    const text = Math.random() > 0.5 ? '1' : '0';
    const x = i * 20;
    ctx.fillText(text, x, y);
    drops[i] = y > h || Math.random() > 0.98 ? 0 : y + 20;
  });
}

setInterval(draw, 50);
