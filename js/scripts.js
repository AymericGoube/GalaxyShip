const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

class Road {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
  draw() {
    const roadImg = new Image();
    roadImg.src = "../images/road.png";
    roadImg.onload = () => {
      ctx.drawImage(roadImg, this.width, this.height, this.x, this.y);
    };
  }
}
const road = new Road(0, 0, 500, 700);

class Car {
  constructor() {
    this.width = 75;
    this.height = 150;
    this.x = 240;
    this.y = 520;
  }
  draw() {
    const carImg = new Image();
    carImg.src = "../images/car.png";
    carImg.onload = () => {
      ctx.drawImage(carImg, this.x, this.y, this.width, this.height);
    };
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
// function updateCanvas() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   road.draw();
//   car.draw();
//   //   requestAnimationFrame(updateCanvas);
// }

document.getElementById("buttonStart").addEventListener("click", () => {
  road.draw();
  car.draw();
});

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      car.moveUp;
      console.log("up", car);
      break;
    case "ArrowDown":
      car.moveDown;
      console.log("down", car);
      break;
    case "ArrowRight":
      car.moveRight;
      console.log("right", car);
      break;
    case "ArrowLeft":
      car.moveLeft;
      console.log("left", car);
      break;
  }
  //   updateCanvas();
});
