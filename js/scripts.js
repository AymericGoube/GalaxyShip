const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const myObstacles = [];

document.getElementById("buttonStart").addEventListener("click", () => {
  road.draw();
  car.draw();
});

const roadImg = new Image();
roadImg.src = "../images/space.jpeg";

class Road {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.frames = 0;
  }

  draw() {
    ctx.drawImage(roadImg, this.width, this.height, this.x, this.y);
  }
  clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
const road = new Road(0, 0, 800, 600);
const carImg = new Image();
carImg.src = "../images/spacecraft.png";

class Car {
  constructor() {
    this.width = 75;
    this.height = 150;
    this.x = 300;
    this.y = 420;
  }
  draw() {
    ctx.drawImage(carImg, this.x, this.y, this.width, this.height);
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
  //   requestAnimationFrame(updateCanvas);
}

this.interval = setInterval(updateCanvas, 20);

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
  updateCanvas();
});

class Component {
  constructor(height, width, color, x, y) {
    this.height = height;
    this.width = width;
    this.color = color;
    this.x = x;
    this.y = y;
  }
  update() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// const obstacle = new Component(30, 30, "red", 0, 110);

function updateObstacles() {
  const obstacle = new Component(30, 30, "red", 0, 110);
  for (i = 0; i < myObstacles.length; i++) {
    myObstacles[i].y -= -1;
    myObstacles[i].update();
  }
  road.frames += 1;
  //   console.log(road.frames);
  if (road.frames % 120 === 0) {
    console.log(myObstacles);
    // let x = road.width;
    // let minHeight = 20;
    // // let maxHeight = 200;
    // let height = Math.floor(
    //   Math.random() * (maxHeight - minHeight + 1) + minHeight
    // );
    // let minGap = 50;
    // let maxGap = 200;
    // let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    // myObstacles.push(new Component(50, height, "red", x, 0));
    // const test = new Component(50, 50, "red", 50, 50);
    // myObstacles.push(test);
    // myObstacles.push(new Component(105, 150, "blue", 200, 200));
    // myObstacles.push(
    //   new Component(50, x - height - gap, "red", x, height + gap)
    // );
  }
}
