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
const lifeImg = new Image();
lifeImg.src = "../images/heart.jpeg";
let intervalId;
const modalBox = document.getElementById("modal");
const endGameModalId = document.querySelector("#endGameModal");
const tryAgain = document.getElementById("tryAgain");
const mainDiv = document.querySelector(".mainDiv");

// let livesTab = [];

// "Start the game" button
start.addEventListener("click", () => {
  createInterval();
  canvas.classList.remove("canvas-closed");
  canvas.classList.toggle("canvas-open");
  mainDiv.classList.toggle("mainDivClosed");
  // road.start();
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
const road = new Road(0, 0, 1000, 800);
const carImg = new Image();
carImg.src = "../images/spacecraft.png";

class Car {
  constructor() {
    this.width = 45;
    this.height = 100;
    this.x = 380;
    this.y = 420;
    this.life = 3;
    this.hasBeenHit = false;
  }
  reset() {
    this.x = 380;
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
    car.y -= 10;
  }
  moveDown() {
    this.y += 10;
  }
  moveLeft() {
    this.x -= 10;
  }
  moveRight() {
    this.x += 10;
  }
  losingLife() {
    this.life--;
    // clearLivesImg();
  }
}
const car = new Car();

function updateCanvas() {
  road.clear();
  road.draw();
  move();
  if (!car.hasBeenHit || !(road.frames % 3)) {
    car.draw();
  }
  // livesTab.drawLivesImg();
  updateObstacles();
  road.score();
}
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};
document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      console.log(car.top(), canvas.height);
      keys.ArrowUp = true;
      break;
    case "ArrowDown":
      keys.ArrowDown = true;
      break;
    case "ArrowRight":
      keys.ArrowRight = true;
      break;
    case "ArrowLeft":
      keys.ArrowLeft = true;
      break;
  }
});
document.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "ArrowUp":
      keys.ArrowUp = false;
      break;
    case "ArrowDown":
      keys.ArrowDown = false;
      break;
    case "ArrowRight":
      keys.ArrowRight = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft = false;
      break;
  }
});

function move() {
  if (car.top() > 0 && keys.ArrowUp) {
    car.moveUp();
  }
  if (car.bottom() < canvas.height && keys.ArrowDown) {
    car.moveDown();
  }
  if (car.right() < canvas.width && keys.ArrowRight) {
    car.moveRight();
  }
  if (car.left() > 0 && keys.ArrowLeft) {
    car.moveLeft();
  }
}

class Component {
  constructor(img, x, y, height, width, velocity) {
    this.img = img;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.velocity = velocity;
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
      car.losingLife();
      console.log(car.life);

      setTimeout(() => {
        car.hasBeenHit = false;
      }, 1000);
      return true;
    }
    return false;
  }
}

class life {
  constructor(lifeImg, x, y, width, height) {
    this.lifeImg = lifeImg;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  drawLivesImg() {
    ctx.drawImage(this.lifeImg, this.x, this.y, this.width, this.height);
  }
  // clearLivesImg() {
  //   livesTab.pop();
  // }
}
// function drawLives() {
//   for (let i = 0; livesTab.length < 1; i++) {
//     this.x = 10;
//     livesTab.push(new life(lifeImg, this.x, 65, 30, 30));
//     console.log(livesTab[i]);
//     livesTab[i].drawLivesImg();
//   }
//   livesTab.push(new life(lifeImg, this.x, 65, 30, 30));
//   livesTab.drawLivesImg();
// }

let tabImg = [];
tabImg.push(asteroidImg);
tabImg.push(satelliteImg);
tabImg.push(alienImg);

function updateObstacles() {
  for (let i = 0; i < myObstacles.length; i++) {
    myObstacles[i].y += myObstacles[i].velocity;
    if (myObstacles[i].checkCollision(myObstacles[i]) && car.life === 0) {
      //lose game
      clearInterval(intervalId);
      gameOverScreen();
    }
    myObstacles[i].update();
  }
  road.frames += 1;
  if (road.frames % 60 === 0) {
    // this.velocity = Math.ceil(Math.random() * 20);
    this.x = Math.floor(Math.random() * road.width);
    this.img = tabImg[Math.floor(Math.random() * tabImg.length)];
    myObstacles.push(
      new Component(
        this.img,
        this.x,
        0,
        100,
        100,
        Math.ceil(Math.random() * 20)
      )
    );
  }
}

function gameOverScreen() {
  endGameModalId.innerHTML = `Your score is : ${road.frames + 1}`;
  modalBox.showModal();
}

// const test = new life(lifeImg, 10, 65, 30, 30);
// const livesTab = livesTab.push(test);

// document.addEventListener("keydown", (e) => {
//   switch (e.code) {
//     case "ArrowUp":
//       console.log(car.top(), canvas.height);
//       if (car.top() > 0) {
//         car.moveUp();
//       }
//       break;
//     case "ArrowDown":
//       if (car.bottom() < canvas.height) {
//         car.moveDown();
//       }

//       break;
//     case "ArrowRight":
//       if (car.right() < canvas.width) {
//         car.moveRight();
//       }
//       break;
//     case "ArrowLeft":
//       if (car.left() > 0) {
//         car.moveLeft();
//       }
//       break;
//   }
//   // updateCanvas();
// });
