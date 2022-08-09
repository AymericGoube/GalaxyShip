const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const myObstacles = [];
const scoreP = document.getElementById("score");
const alienImg = new Image();
alienImg.src = "../images/soucoupe.png";
const satelliteImg = new Image();
satelliteImg.src = "../images/asteroide.png";
const asteroidImg = new Image();
asteroidImg.src = "../images/asteroid.png";
let interval = setInterval(updateCanvas, 20);

document.getElementById("buttonStart").addEventListener("click", () => {
  // road.draw();
  // car.draw();
  updateCanvas();
});

const roadImg = new Image();
roadImg.src = "../images/space.jpeg";

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
  score() {}
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
    car.y -= 25;
  }
  moveDown() {
    this.y += 25;
  }
  moveLeft() {
    this.x -= 25;
  }
  moveRight() {
    this.x += 25;
  }
}
const car = new Car();

function updateCanvas() {
  road.clear();
  road.draw();
  car.draw();
  updateObstacles();
}

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      car.moveUp();
      break;
    case "ArrowDown":
      car.moveDown();
      break;
    case "ArrowRight":
      car.moveRight();
      break;
    case "ArrowLeft":
      car.moveLeft();
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
    return checkTop && checkBottom;
  }
}

let tabImg = [];
tabImg.push(asteroidImg);
tabImg.push(satelliteImg);
tabImg.push(alienImg);
function updateObstacles() {
  for (let i = 0; i < myObstacles.length; i++) {
    myObstacles[i].y += 1;
    if (myObstacles[i].checkCollision(myObstacles[i])) {
      //lose game
      clearInterval(interval);
    }
    myObstacles[i].update();
  }
  road.frames += 1;
  if (road.frames % 240 === 0) {
    this.x = Math.floor(Math.random() * road.width);
    this.img = tabImg[Math.floor(Math.random() * tabImg.length)];
    myObstacles.push(new Component(this.img, this.x, 0, 100, 100));
    console.log(myObstacles);
  }
}
