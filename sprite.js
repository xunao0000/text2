const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const grid = 20;
const count = canvas.width / grid;

let snake = [{ x: 160, y: 160 }];
let apple = { x: 320, y: 320 };
let dx = grid;
let dy = 0;

function getRandomPos() {
  return Math.floor(Math.random() * count) * grid;
}

function gameLoop() {
  requestAnimationFrame(gameLoop);

  if (++frame % 8 !== 0) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || snake.some(seg => seg.x === head.x && seg.y === head.y)) {
    alert("游戏结束！");
    snake = [{ x: 160, y: 160 }];
    dx = grid;
    dy = 0;
    apple = { x: getRandomPos(), y: getRandomPos() };
    return;
  }

  snake.unshift(head);

  if (head.x === apple.x && head.y === apple.y) {
    apple = { x: getRandomPos(), y: getRandomPos() };
  } else {
    snake.pop();
  }

  ctx.fillStyle = "lime";
  snake.forEach(part => ctx.fillRect(part.x, part.y, grid - 2, grid - 2));

  ctx.fillStyle = "red";
  ctx.fillRect(apple.x, apple.y, grid - 2, grid - 2);
}

let frame = 0;
requestAnimationFrame(gameLoop);

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      if (dx === 0) [dx, dy] = [-grid, 0];
      break;
    case "ArrowUp":
      if (dy === 0) [dx, dy] = [0, -grid];
      break;
    case "ArrowRight":
      if (dx === 0) [dx, dy] = [grid, 0];
      break;
    case "ArrowDown":
      if (dy === 0) [dx, dy] = [0, grid];
      break;
  }
});
