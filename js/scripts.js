const canvas = document.querySelector("#canvas");
const start = document.getElementById("buttonStart");
const ctx = canvas.getContext("2d");
let myObstacles = [];
const scoreP = document.getElementById("score");
const alienImg = new Image();
alienImg.src = "../images/soucoupe.png";
const satelliteImg = new Image();
satelliteImg.src = "../images/asteroide.png";
const asteroidImg = new Image();
asteroidImg.src = "../images/asteroid.png";
let intervalId;
const modalBox = document.getElementById("modal");
const endGameModalId = document.querySelector("#endGameModal");
const tryAgain = document.getElementById("tryAgain");
// "Start the game" button
start.addEventListener("click", () => {
  createInterval();
  canvas.classList.remove("canvas-closed");
  canvas.classList.toggle("canvas-open");
  start.classList.toggle("buttonStart-closed");
  // road.draw();
  // car.draw();
  road.start();
  // updateCanvas();
});
// "Try again ?" button
tryAgain.addEventListener("click", () => {
  road.frames = 0;
  myObstacles = [];
  car.reset();
  createInterval();
});
const roadImg = new Image();
roadImg.src = "../images/space.jpeg";
function createInterval() {
  intervalId = setInterval(updateCanvas, 20);
}
// Implementing gameArea
class Road {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.frames = 0;
  }

  draw() {
    ctx.drawImage(roadImg, this.x, this.y, this.width, this.height);
  }
  clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  score() {
    ctx.font = "20pt Calibri";
    ctx.fillStyle = "white";
    ctx.fillText(`Score : ${road.frames}`, 20, 60);
  }
  start() {
    updateCanvas();
  }
}
const road = new Road(0, 0, 800, 600);
const carImg = new Image();
carImg.src = "../images/spacecraft.png";

class Car {
  constructor() {
    this.width = 45;
    this.height = 100;
    this.x = 300;
    this.y = 420;
    this.life = 3;
    this.hasBeenHit = false;
  }
  reset() {
    this.x = 300;
    this.y = 420;
    this.life = 3;
    this.hasBeenHit = false;
  }
  draw() {
    ctx.drawImage(carImg, this.x, this.y, this.width, this.height);
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
  moveUp() {
    car.y -= 45;
  }
  moveDown() {
    this.y += 45;
  }
  moveLeft() {
    this.x -= 45;
  }
  moveRight() {
    this.x += 45;
  }
  losingLife() {
    this.life--;
  }
}
const car = new Car();

function updateCanvas() {
  road.clear();
  road.draw();
  car.draw();
  updateObstacles();
  road.score();
}

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      console.log(car.top(), canvas.height);
      if (car.top() > 0) {
        car.moveUp();
      }
      break;
    case "ArrowDown":
      if (car.bottom() < canvas.height) {
        car.moveDown();
      }

      break;
    case "ArrowRight":
      if (car.right() < canvas.width) {
        car.moveRight();
      }
      break;
    case "ArrowLeft":
      if (car.left() > 0) {
        car.moveLeft();
      }
      break;
  }
  // updateCanvas();
});

class Component {
  constructor(img, x, y, height, width) {
    this.img = img;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
  update() {
    ctx.drawImage(this.img, this.x, this.y, this.height, this.width);
  }
  checkCollision(component) {
    // returns true if collision
    let checkTop = false;
    let checkBottom = false;
    // console.log(car.bottom());
    checkTop = car.right() > component.left() && car.left() < component.right();
    checkBottom =
      car.top() < component.bottom() && car.bottom() > component.top();
    // console.log(checkTop && checkBottom);
    if (checkTop && checkBottom && !car.hasBeenHit) {
      car.hasBeenHit = true;
      console.log(car.life);
      car.losingLife();
      setTimeout(() => {
        car.hasBeenHit = false;
      }, 1000);
      return true;
    }
    return false;
  }
}

let tabImg = [];
tabImg.push(asteroidImg);
tabImg.push(satelliteImg);
tabImg.push(alienImg);
function updateObstacles() {
  for (let i = 0; i < myObstacles.length; i++) {
    myObstacles[i].y += 1;
    if (myObstacles[i].checkCollision(myObstacles[i]) && car.life === 0) {
      //lose game
      clearInterval(intervalId);
      gameOverScreen();
    }
    myObstacles[i].update();
  }
  road.frames += 1;
  if (road.frames % 240 === 0) {
    this.x = Math.floor(Math.random() * road.width);
    this.img = tabImg[Math.floor(Math.random() * tabImg.length)];
    myObstacles.push(new Component(this.img, this.x, 0, 100, 100));
  }
}

function gameOverScreen() {
  const tryAgainBtn = document.getElementById("tryAgain");
  endGameModalId.innerHTML = `Your score is : ${road.frames + 1}`;
  modalBox.showModal();
}
