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
const highscoreList = document.getElementById("highScore");
const backToMenu = document.getElementById("backToMenu");
const lifeDiv = document.querySelector(".lifeDiv-closed");
const imgHeart1 = document.querySelector(".imgHeart1");
const imgHeart2 = document.querySelector(".imgHeart2");
const imgHeart3 = document.querySelector(".imgHeart3");

// "Start the game" button
start.addEventListener("click", () => {
  createInterval();
  canvas.classList.remove("canvas-closed");
  canvas.classList.toggle("canvas-open");
  lifeDiv.classList.remove("lifeDiv-closed");
  lifeDiv.classList.add("lifeDiv");
  mainDiv.classList.toggle("mainDivClosed");
});
// "Try again ?" button
tryAgain.addEventListener("click", () => {
  road.frames = 0;
  myObstacles = [];
  car.resetKey();
  car.reset();
  drawLives();
  createInterval();
});

backToMenu.addEventListener("click", () => {
  road.frames = 0;
  myObstacles = [];
  car.reset();
  canvas.classList.add("canvas-closed");
  mainDiv.classList.remove("mainDivClosed");
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
  life() {
    ctx.font = "20pt Calibri";
    ctx.fillStyle = "white";
    ctx.fillText(`Life : ${car.life}`, 20, 100);
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
    this.y -= 10;
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
    if (this.life === 2) {
      imgHeart3.classList.add("imgHeart3-closed");
    }
    if (this.life === 1) {
      imgHeart2.classList.add("imgHeart2-closed");
    }
    if (this.life === 0) {
      imgHeart1.classList.add("imgHeart1-closed");
    }
  }
  resetKey() {
    keys.ArrowUp = false;
    keys.ArrowDown = false;
    keys.ArrowRight = false;
    keys.ArrowLeft = false;
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
  road.life();
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
    return this.x + 10;
  }
  right() {
    return this.x + this.width - 10;
  }
  top() {
    return this.y + 10;
  }
  bottom() {
    return this.y + this.height - 10;
  }
  update() {
    ctx.drawImage(this.img, this.x, this.y, this.height, this.width);
  }
  checkCollision(component) {
    // returns true if collision
    let checkTop = false;
    let checkBottom = false;
    checkTop = car.right() > component.left() && car.left() < component.right();
    checkBottom =
      car.top() < component.bottom() && car.bottom() > component.top();
    if (checkTop && checkBottom && !car.hasBeenHit) {
      car.hasBeenHit = true;
      car.losingLife();
      setTimeout(() => {
        car.hasBeenHit = false;
      }, 1000);
      return true;
    }
    return false;
  }
}

function drawLives() {
  imgHeart1.classList.remove("imgHeart1-closed");
  imgHeart2.classList.remove("imgHeart2-closed");
  imgHeart3.classList.remove("imgHeart3-closed");
}
// class life {
//   constructor(lifeImg, x, y, width, height) {
//     this.lifeImg = lifeImg;
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//   }
// drawLivesImg() {
//   ctx.drawImage(this.lifeImg, this.x, this.y, this.width, this.height);
// }
// clearLivesImg() {
//   livesTab.pop();
// }
// }
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

      let name = window.prompt("Enter your name: ");
      let score = road.frames + 1;
      let objectTest = {
        name: name,
        score: score,
      };
      localStorage.setItem("myObject", JSON.stringify(objectTest));
      clearInterval(intervalId);
      gameOverScreen();
    }
    myObstacles[i].update();
  }
  road.frames += 1;
  if (road.frames % 20 === 0) {
    this.x = Math.floor(Math.random() * road.width);
    this.img = tabImg[Math.floor(Math.random() * tabImg.length)];
    myObstacles.push(
      new Component(
        this.img,
        this.x,
        0,
        100,
        100,
        Math.ceil(Math.random() * 10) + 3
      )
    );
  }
}

function gameOverScreen() {
  endGameModalId.innerHTML = `Your score is : ${road.frames + 1}`;
  modalBox.showModal();
}

function creatingHighscoreList() {
  for (let i = 0; i < localStorage.length; i++) {
    // let keyName = localStorage.key(i);
    // let value = localStorage.getItem(keyName);
    let parsedScore = JSON.parse(localStorage.getItem("myObject"));
    console.log(localStorage);
    // const objTest.keyName = value;
  }
}
creatingHighscoreList();

// function creatingHighscoreList() {
// localStorage.forEach((element) => {
// console.log()
// let createList = document.createElement("li");
// console.log(`${nameUser}, ${localStorage.getItem("nameUser")}`);
// for (let e in localStorage) {
//   console.log(localStorage);
// }
// highscoreList.append(
//   `${nameUser}, ${localStorage.getItem("nameUser")}`,
//   createList
// );

// });
// }

// let createList = document.createElement("li");
// highscoreList.append(createList);

// console.log(value);
// createList.innerHTML = `${localStorage.key(7)}`;
// Object.keys(localStorage).forEach(function (key) {
// console.log(localStorage.getItem(key));
// });
// const test = new life(lifeImg, 10, 65, 30, 30);
// const livesTab = livesTab.push(test);

// Aymeric: "503"
// Hello: "402"
// Hello2: "456"
// Heyo: "2866"
// Test: "497"
// Test2: "466"
// aokda: "322"
// oadod: "339"
// padlada: "356"
// popopo: "973"
