// Galactic Explorer 2D Game Logic
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game world settings
const WORLD = {
  GRAVITY: 0.7,
  GROUND_HEIGHT: 100,
  CHARACTER: {
    WIDTH: 60,
    HEIGHT: 80,
    COLOR: '#29E5FF'
  },
  STARS: {
    COUNT: 50,
    COLOR: 'rgba(255,255,255,0.1)'
  },
  GROUND_COLOR: 'rgba(0,122,255,0.3)'
};

// Player character object
const player = {
  x: 100,
  y: canvas.height - WORLD.GROUND_HEIGHT - WORLD.CHARACTER.HEIGHT,
  width: WORLD.CHARACTER.WIDTH,
  height: WORLD.CHARACTER.HEIGHT,
  color: WORLD.CHARACTER.COLOR,
  velocityX: 0,
  velocityY: 0,
  onGround: false,
  speed: 4,
  jumpHeight: 12,
  maxSpeed: 4,
  friction: 0.9,
  controls: {
    left: false,
    right: false,
    jump: false
  }
};

// Input system
function setupInput() {
  document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyA' || e.code === 'ArrowLeft') player.controls.left = true;
    if (e.code === 'KeyD' || e.code === 'ArrowRight') player.controls.right = true;
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      if (player.onGround) {
        player.velocityY = -player.jumpHeight;
        player.onGround = false;
      }
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.code === 'KeyA' || e.code === 'ArrowLeft') player.controls.left = false;
    if (e.code === 'KeyD' || e.code === 'ArrowRight') player.controls.right = false;
  });
}

// Physics engine
function updatePhysics() {
  // Movement input
  if (player.controls.left) player.velocityX = Math.max(-player.speed, player.velocityX - 0.2);
  if (player.controls.right) player.velocityX = Math.min(player.speed, player.velocityX + 0.2);

  // Natural slowdown
  player.velocityX *= player.friction;
  if (Math.abs(player.velocityX) < 0.1) player.velocityX = 0;

  // Apply gravity
  player.velocityY += WORLD.GRAVITY;
  player.y += player.velocityY;

  // Ground collision
  if (player.y + player.height > canvas.height - WORLD.GROUND_HEIGHT) {
    player.y = canvas.height - player.height - WORLD.GROUND_HEIGHT;
    player.velocityY = 0;
    player.onGround = true;
  } else {
    player.onGround = false;
  }

  // Horizontal movement
  player.x += player.velocityX;

  // Boundary constraints
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) {
    player.x = canvas.width - player.width;
    player.velocityX = 0;
  }
}

// Render engine
function render() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw starfield background
  ctx.fillStyle = WORLD.STARS.COLOR;
  for (let i = 0; i < WORLD.STARS.COUNT; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw ground
  ctx.fillStyle = WORLD.GROUND_COLOR;
  ctx.fillRect(0, canvas.height - WORLD.GROUND_HEIGHT, canvas.width, WORLD.GROUND_HEIGHT);

  // Draw character
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Jump glow effect (only when in mid-air)
  if (!player.onGround) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.arc(
      player.x + player.width / 2,
      player.y + player.height + 4,
      8,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}

// Main game loop
function gameLoop() {
  updatePhysics();
  render();
  requestAnimationFrame(gameLoop);
}

// Initialize and start
function initializeGame() {
  canvas.width = 800;
  canvas.height = 600;
  player.x = 100;
  player.y = canvas.height - WORLD.GROUND_HEIGHT - player.width;
  gameLoop();
}

// Setup input and launch
document.addEventListener('DOMContentLoaded', () => {
  setupInput();
  initializeGame();
});