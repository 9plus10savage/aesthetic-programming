let player1;
let player2;
let playerMarginX = 50;
let playerMarginY = 50;
let ball;
let mapDetails;
let boundsCheck = true;
let paddleSound;
let wallSound;
let scoreSound;
let myInterval;
let countDownVar = 3

function preload() {
  soundFormats('mp3');
  paddleSound = loadSound('paddle');
  wallSound = loadSound('wall');
  scoreSound = loadSound('score')
  paddleSound.setVolume(0.3);
  wallSound.setVolume(0.3);
  scoreSound.setVolume(0.2);
  pixelFont = loadFont('pixelfont2.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  player1 = new Player(playerMarginX, playerMarginY, 87, 83)
  player2 = new Player(windowWidth - player1.rectWidth - playerMarginX, playerMarginY, 73, 75)
  ball = new Ball()
  mapDetails = new MapDetails()
}

function draw() {
  background(0, 0, 0, 120);

  mapDetails.displayLine()
  mapDetails.displayHitCounter()
  mapDetails.displayPlayer1Score()
  mapDetails.displayPlayer2Score()

  player1.display()
  player1.move()
  player1.boundsDetection()


  player2.display()
  player2.move()
  player2.boundsDetection()

  ball.display()
  ball.move()
  ball.boundsDetection()

  randomBallStart()

  collisionDetection(player1)
  collisionDetection(player2)

  outOfBounds()
  startingPos()
  textCountDown()
  gameEnd()
}

function collisionDetection(player) {
  if (ball.ballX + ball.ballSize + ball.ballSpeedX > player.rectX &&
      ball.ballX + ball.ballSpeedX < player.rectX + player.rectWidth &&
      ball.ballY + ball.ballSize > player.rectY - 10 &&
      ball.ballY < player.rectY + player.rectHeight + 15) {
      ball.ballSpeedX *= -1.1;
      ball.ballSpeedY *= 1.1
      mapDetails.hitCounter += 1
      paddleSound.play()
  }

  if (ball.ballX + ball.ballSize + ball.ballSpeedX > player.rectX &&
      ball.ballX + ball.ballSpeedX < player.rectX + player.rectWidth &&
      ball.ballY + ball.ballSize > player.rectY - 10 &&
      ball.ballY < player.rectY + player.rectHeight + 15) {
      ball.ballSpeedX *= -1.1;
      ball.ballSpeedY *= 1.1
      mapDetails.hitCounter += 1
  }

  if (ball.ballX + ball.ballSize > player.rectX &&
      ball.ballX < player.rectX + player.rectWidth &&
      ball.ballY + ball.ballSize + ball.ballSpeedY > player.rectY - 10 &&
      ball.ballY + ball.ballSpeedY < player.rectY + player.rectHeight + 15) {
      ball.ballSpeedY *= -1.1;
      ball.ballSpeedX *= 1.1
      mapDetails.hitCounter += 1
  }

  if (ball.ballX + ball.ballSize > player.rectX &&
      ball.ballX < player.rectX + player.rectWidth &&
      ball.ballY + ball.ballSize + ball.ballSpeedY > player.rectY - 10 &&
      ball.ballY + ball.ballSpeedY < player.rectY + player.rectHeight + 15) {
      ball.ballSpeedY *= -1.1;
      ball.ballSpeedX *= 1.1
      mapDetails.hitCounter += 1
  }
}

function randomBallStart() {
  if (frameCount === 1 && random(1) > 0.5) {
    ball.randomSpeed()
  }
}

function randomGoalStart() {
  if (random(1) > 0.5) {
    ball.randomSpeed()
  }
}

function startingPos() {
  if (frameCount === 1) {
    setTimeout(boundsSwitch, 3000)
    myInterval = setInterval(timerIncrement, 1000)
  }
}

function outOfBounds() {
  if (ball.ballX + ball.ballSize > windowWidth) {
    generalReload()
    mapDetails.player1Score++
  } else if (ball.ballX < 0) {
    generalReload()
    mapDetails.player2Score++
  } else {
    countDownReset()
  }
}

function generalReload(playerGoal) {
  boundsCheck = true;
  setTimeout(boundsSwitch, 3000);
  mapDetails.hitCounter = 0
  player1.reload()
  player2.reload()
  ball.reload()
  randomGoalStart()
  countDown()
  scoreSound.play()
}

function boundsSwitch() {
  boundsCheck = !boundsCheck;
}

function countDown() {
  myInterval = setInterval(timerIncrement, 1000)
}

function countDownReset() {
  if (!boundsCheck) {
    clearInterval(myInterval);
    countDownVar = 3;
  }
}

function textCountDown() {
  let textPosX = windowWidth/2 - 75;

  if (countDownVar === 1) {
    textPosX = windowWidth/2 - 30
  }

  if (boundsCheck) {
    push()
    fill(0);
    stroke(0, 252, 1);
    textFont(pixelFont)
    textSize(300);
    text(countDownVar, textPosX, windowHeight/2 + 50);
    pop()
  }
}

function timerIncrement() {
  countDownVar--
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function gameEnd() {
  if (mapDetails.player1Score > 4) {
    mapDetails.displayWinner('player1')
    noLoop()
  } else if (mapDetails.player2Score > 4) {
    mapDetails.displayWinner('player2')
    noLoop()
  }
}
