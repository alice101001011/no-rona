const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 600;

const splashScreen = document.querySelector(".splash-screen");
const gameScreen = document.querySelector(".game");
const gameOverScreen = document.querySelector(".game-over");
const gameWonScreen = document.querySelector(".game-won");
const levelNumber = document.querySelector("#level");
const timeLeft = document.querySelector("#time-left");
const healthPoints = document.querySelector("#health");
const scorePoints = document.querySelector("#score");

document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("tryagain-button").addEventListener("click", startGame);
document
  .getElementById("playagain-button")
  .addEventListener("click", startGame);
document.getElementById("play-button").addEventListener("click", playGame);
document.getElementById("quit-button").addEventListener("click", quitGame);

let background,
  player,
  virusesArr = [],
  boostersArr = [],
  score = 0,
  levelTimeLeft = 30,
  levelTimeLeftId,
  intervalId,
  timer,
  levels = [
    {
      level: 1,
      virusesNumber: 4,
      virusXspeed: 2,
      //virusYspeed: -2,
      boostersNumber: 3,
      bgImg: "assets/bg-level-1.png",
    },
    {
      level: 2,
      virusesNumber: 5,
      virusXspeed: 3,
      //virusYspeed: -4,
      boostersNumber: 2,
      bgImg: "assets/bg-level-2.png",
    },
    {
      level: 3,
      virusesNumber: 6,
      virusXspeed: 3,
      //virusYspeed: -5,
      boostersNumber: 1,
      bgImg: "assets/bg-level-3.png",
    },
  ];

timeLeft.innerHTML = levelTimeLeft;
levelNumber.innerHTML = 1; //levels[0].level;
scorePoints.innerHTML = score;

function playerControls() {
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight":
        player.moveRight();
        break;
      case "ArrowLeft":
        player.moveLeft();
        break;
      case "ArrowUp":
        player.moveUp();
        break;
      case "ArrowDown":
        player.moveDown();
        break;
      default:
        break;
    }
  });
}

playerControls();

function startGame() {
  splashScreen.classList.add("hidden");
  gameWonScreen.classList.add("hidden");
  gameOverScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  reset();
  instructionsCanvas();
}

function instructionsCanvas() {
  let instruction1 = "Press PLAY to start game!";
  let instruction2 = "Move with the arrow keys.";
  let instruction3 = "Dodge the viruses, otherwise you lose health points.";
  let instruction4 = "Collect the booster shots to win health points.";
  let instruction5 =
    "To win, reach the green door on the right before time runs out.";
  ctx.fillStyle = "black";
  ctx.font = "24px Courier New";
  ctx.textAlign = "center";
  ctx.fillText(instruction1, canvas.width / 2, 100);
  ctx.font = "20px Courier New";
  ctx.fillText(instruction2, canvas.width / 2, 140);
  ctx.fillText(instruction3, canvas.width / 2, 170);
  ctx.fillText(instruction4, canvas.width / 2, 200);
  ctx.fillText(instruction5, canvas.width / 2, 230);
}

function playGame() {
  reset();
  clear();
  clearInterval(levelTimeLeftId);
  levelTimeLeftId = setInterval(levelTimer, 1000);
  levelTimer();
  game(levels[0]);
}

function quitGame() {
  reset();
  clear();
  clearInterval(levelTimeLeftId);
  instructionsCanvas();
}

function levelTimer() {
  levelTimeLeft--;
  if (levelTimeLeft >= 0) {
    timeLeft.innerHTML = levelTimeLeft;

    scorePoints.innerHTML = score;
    score += 10;
  } else {
    clearInterval(levelTimeLeftId);
  }
}

function game(level) {
  initializeGame(levels[0]);

  update();

  function update() {
    clear();
    draw();

    animateViruses();

    collectingBooster();
    losingHealthPoints(level);
    //levelEnd();
    checkWin();

    intervalId = requestAnimationFrame(update);
  }

  function initializeGame(level) {
    background = new Background(canvas, ctx, level);
    goal = new Goal(canvas, ctx);
    player = new Player(canvas, ctx);
    healthPoints.innerHTML = `${player.health}`;
    createViruses(level);
    createBoosters(level);
  }

  function createViruses(level) {
    for (let i = 0; i < level.virusesNumber; i++) {
      virusesArr.push(new Virus(canvas, ctx, level));
    }
  }

  function createBoosters(level) {
    for (let i = 0; i < level.boostersNumber; i++) {
      boostersArr.push(new Booster(canvas, ctx));
    }
  }

  function animateViruses() {
    for (var i = 0; i < virusesArr.length; i++) {
      if (
        virusesArr[i].x + virusesArr[i].xSpeed < 0 ||
        virusesArr[i].x + virusesArr[i].xSpeed >
          canvas.width - virusesArr[i].width
      ) {
        virusesArr[i].xSpeed = -virusesArr[i].xSpeed;
      }

      if (
        virusesArr[i].y + virusesArr[i].ySpeed < 0 ||
        virusesArr[i].y + virusesArr[i].ySpeed >
          canvas.height - virusesArr[i].height
      ) {
        virusesArr[i].ySpeed = -virusesArr[i].ySpeed;
      }

      virusesArr[i].x += virusesArr[i].xSpeed;
      virusesArr[i].y += virusesArr[i].ySpeed;
    }
  }

  function draw() {
    background.draw();
    goal.draw();
    player.draw();
    virusesArr.forEach((virus) => {
      virus.draw();
    });
    boostersArr.forEach((booster) => {
      booster.draw();
    });
  }

  function collisionDetection(player, element) {
    let areColliding = false;
    if (
      player.x < element.x + element.width &&
      player.x + player.width > element.x &&
      player.y < element.y + element.height &&
      player.height + player.y > element.y
    ) {
      areColliding = true;
    }

    return areColliding;
  }

  function collectingBooster() {
    boostersArr.forEach((booster, index) => {
      if (collisionDetection(player, booster)) {
        booster.boosterShot();
        boostersArr.splice(index, 1);
        player.health += booster.healthPlus;
        healthPoints.innerHTML = player.health;
        player.drawHealthPoint();
      }
    });
  }

  function losingHealthPoints(level) {
    virusesArr.forEach((virus, index) => {
      if (collisionDetection(player, virus)) {
        virus.sneeze();
        virusesArr.splice(index, 1);
        player.health -= virus.damage;
        healthPoints.innerHTML = player.health;
        virusesArr.push(new Virus(canvas, ctx, level));
      }
    });
  }


  function checkWin() {
    if (
      collisionDetection(player, goal) &&
      player.health > 0 &&
      levelTimeLeft >= 0
    ) {
      player.win();
      gameWon();
    }
    if (
      (levelTimeLeft >= 0 &&
        !collisionDetection(player, goal) &&
        player.health === 0) ||
      (levelTimeLeft === 0 &&
        !collisionDetection(player, goal) &&
        player.health > 0)
    ) {
      player.lose();
      gameOver();
    }
  }
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function reset() {
  cancelAnimationFrame(intervalId);
  background = null;
  player = null;
  virusesArr = [];
  boostersArr = [];
  score = 0;
  levelTimeLeft = 30;
}
// Game Over
function gameOver() {
  gameScreen.classList.add("hidden");
  gameOverScreen.classList.remove("hidden");
  clearInterval(levelTimeLeftId);
  reset();
  clear();
}

// Game Won
function gameWon() {
  gameScreen.classList.add("hidden");
  gameWonScreen.classList.remove("hidden");
  clearInterval(levelTimeLeftId);
  reset();
  clear();
}
