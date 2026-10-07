const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const highEl = document.getElementById("highScore");
const statusEl = document.getElementById("status");

const startOverlay = document.getElementById("startOverlay");
const pauseOverlay = document.getElementById("pauseOverlay");
const gameOverOverlay = document.getElementById("gameOverOverlay");
const finalScore = document.getElementById("finalScore");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");
const resumeBtn = document.getElementById("resumeBtn");
const againBtn = document.getElementById("againBtn");

const GRID = 24;
const CELL = canvas.width / GRID;
let snake, direction, nextDirection, food, bonus, obstacles;
let score = 0, level = 1;
let running = false, paused = false;
let timer = null;
let highScore = Number(localStorage.getItem("neonSnakeHighScore") || 0);
highEl.textContent = highScore;

function resetState() {
  snake = [{x:12,y:12},{x:11,y:12},{x:10,y:12}];
  direction = {x:1,y:0};
  nextDirection = {x:1,y:0};
  score = 0; level = 1; paused = false;
  obstacles = [];
  food = spawnItem();
  bonus = null;
  updateHUD();
}

function spawnItem() {
  let p;
  do {
    p = {x:Math.floor(Math.random()*GRID), y:Math.floor(Math.random()*GRID)};
  } while (
    snake?.some(s => s.x===p.x && s.y===p.y) ||
    obstacles.some(o => o.x===p.x && o.y===p.y)
  );
  return p;
}

function startGame() {
  clearInterval(timer);
  resetState();
  running = true;
  startOverlay.classList.add("hidden");
  gameOverOverlay.classList.add("hidden");
  pauseOverlay.classList.add("hidden");
  pauseBtn.disabled = false;
  statusEl.textContent = "PLAYING";
  setLoop();
  draw();
}

function setLoop() {
  clearInterval(timer);
  const speed = Math.max(70, 155 - (level-1)*15);
  timer = setInterval(tick, speed);
}

function tick() {
  if (!running || paused) return;
  direction = nextDirection;
  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID) return gameOver();
  if (snake.some(s => s.x===head.x && s.y===head.y)) return gameOver();
  if (obstacles.some(o => o.x===head.x && o.y===head.y)) return gameOver();

  snake.unshift(head);
  let ate = head.x===food.x && head.y===food.y;
  let ateBonus = bonus && head.x===bonus.x && head.y===bonus.y;

  if (ate || ateBonus) {
    score += ateBonus ? 50 : 10;
    if (ate) food = spawnItem();
    if (ateBonus) bonus = null;

    const newLevel = Math.min(10, Math.floor(score/50)+1);
    if (newLevel !== level) {
      level = newLevel;
      addObstacles();
      setLoop();
    }
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("neonSnakeHighScore", highScore);
    }
    if (Math.random() < 0.22 && !bonus) bonus = spawnItem();
  } else {
    snake.pop();
  }
  updateHUD();
  draw();
}

function addObstacles() {
  const target = Math.min(12, Math.max(0, level-2)*2);
  while (obstacles.length < target) {
    const p = spawnItem();
    obstacles.push(p);
  }
}

function gameOver() {
  running = false;
  clearInterval(timer);
  pauseBtn.disabled = true;
  statusEl.textContent = "GAME OVER";
  finalScore.textContent = score;
  gameOverOverlay.classList.remove("hidden");
  draw();
}

function togglePause() {
  if (!running) return;
  paused = !paused;
  pauseOverlay.classList.toggle("hidden", !paused);
  statusEl.textContent = paused ? "PAUSED" : "PLAYING";
}

function updateHUD() {
  scoreEl.textContent = score;
  levelEl.textContent = level;
  highEl.textContent = highScore;
}

function setDirection(x,y) {
  if (x === -direction.x && y === -direction.y) return;
  nextDirection = {x,y};
}

document.addEventListener("keydown", e => {
  const k = e.key.toLowerCase();
  if (["arrowup","arrowdown","arrowleft","arrowright"," "].includes(k)) e.preventDefault();
  if (k==="arrowup" || k==="w") setDirection(0,-1);
  if (k==="arrowdown" || k==="s") setDirection(0,1);
  if (k==="arrowleft" || k==="a") setDirection(-1,0);
  if (k==="arrowright" || k==="d") setDirection(1,0);
  if (k===" ") togglePause();
});

startBtn.onclick = startGame;
restartBtn.onclick = startGame;
againBtn.onclick = startGame;
pauseBtn.onclick = togglePause;
resumeBtn.onclick = togglePause;

function draw() {
  ctx.fillStyle = "#05080e";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // grid
  ctx.strokeStyle = "#172236";
  ctx.lineWidth = 1;
  for (let i=1;i<GRID;i++) {
    ctx.beginPath(); ctx.moveTo(i*CELL,0); ctx.lineTo(i*CELL,canvas.height); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0,i*CELL); ctx.lineTo(canvas.width,i*CELL); ctx.stroke();
  }

  // obstacles
  obstacles.forEach(o => {
    ctx.fillStyle = "#a469ff";
    ctx.shadowColor = "#a469ff"; ctx.shadowBlur = 10;
    roundRect(o.x*CELL+3,o.y*CELL+3,CELL-6,CELL-6,5,true);
    ctx.shadowBlur = 0;
  });

  // food
  drawCircle(food, "#ff566e", 0.28);
  if (bonus) drawCircle(bonus, "#ffd350", 0.36);

  // snake
  snake.forEach((s,i) => {
    const pad = 2.5;
    ctx.fillStyle = i===0 ? "#32dcff" : "#39ff8c";
    ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = i===0 ? 15 : 7;
    roundRect(s.x*CELL+pad,s.y*CELL+pad,CELL-pad*2,CELL-pad*2,5,true);
    ctx.shadowBlur = 0;
  });

  // eyes
  const h=snake[0];
  ctx.fillStyle="#05080e";
  let ex = h.x*CELL + CELL*0.66, ey = h.y*CELL + CELL*0.32;
  if(direction.x<0){ex=h.x*CELL+CELL*.32;ey=h.y*CELL+CELL*.32;}
  if(direction.y>0){ex=h.x*CELL+CELL*.32;ey=h.y*CELL+CELL*.66;}
  if(direction.y<0){ex=h.x*CELL+CELL*.32;ey=h.y*CELL+CELL*.32;}
  ctx.beginPath();ctx.arc(ex,ey,2.6,0,Math.PI*2);ctx.fill();
}

function drawCircle(p,color,r) {
  ctx.fillStyle=color; ctx.shadowColor=color; ctx.shadowBlur=15;
  ctx.beginPath();
  ctx.arc(p.x*CELL+CELL/2,p.y*CELL+CELL/2,CELL*r,0,Math.PI*2);
  ctx.fill();
  ctx.shadowBlur=0;
}

function roundRect(x,y,w,h,r,fill) {
  ctx.beginPath();
  ctx.roundRect(x,y,w,h,r);
  if(fill) ctx.fill();
}

resetState();
draw();
