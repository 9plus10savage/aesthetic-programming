let player1;
let player2;
let ball;
let mapDetails;

let playerMarginX = 50
let playerMarginY = 50

function setup() {
  createCanvas(windowWidth, windowHeight);
  player1 = new Player(playerMarginX, playerMarginY, 87, 83)
  player2 = new Player(windowWidth - player1.rectWidth - playerMarginX, playerMarginY, 73, 75)
  ball = new Ball()
  mapDetails = new MapDetails()
}

function draw() {
  background(0);

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
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function collisionDetection(player) {
  if (ball.ballX + ball.ballSize + ball.ballSpeedX > player.rectX &&
      ball.ballX + ball.ballSpeedX < player.rectX + player.rectWidth &&
      ball.ballY + ball.ballSize > player.rectY - 10 &&
      ball.ballY < player.rectY + player.rectHeight + 15) {
      ball.ballSpeedX *= -1.1;
      ball.ballSpeedY *= 1.1
      mapDetails.hitCounter += 1
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


function outOfBounds() {
  if (ball.ballX + ball.ballSize > windowWidth) {
    player1.reload()
    player2.reload()
    mapDetails.player1Score += 1
    mapDetails.hitCounter = 0
    ball.reload()
    randomGoalStart()
  } else if (ball.ballX < 0) {
    player1.reload()
    player2.reload()
    mapDetails.player2Score += 1
    mapDetails.hitCounter = 0
    ball.reload()
    randomGoalStart()
  }
}
