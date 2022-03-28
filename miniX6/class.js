class Player {
  constructor(x, y, key1, key2) {
    this.rectXStart = x
    this.rectYStart = y
    this.rectX = x
    this.rectY = y
    this.rectWidth = 40;
    this.rectHeight = 120;
    this.rectMin = 0
    this.rectMax = windowHeight - this.rectHeight
    this.rectSpeed = 10
    this.keycode = key1
    this.keycode2 = key2
  }

  display() {
    noFill()
    stroke(0, 255, 0)
    strokeWeight(3)
    rect(this.rectX, this.rectY, this.rectWidth, this.rectHeight)
  }

  move() {
    if (keyIsDown(this.keycode)) {
      this.rectY -= this.rectSpeed }
    else if (keyIsDown(this.keycode2)) {
      this.rectY += this.rectSpeed;
    }
  }

  boundsDetection() {
    if (this.rectY < 0) {
      this.rectY = this.rectMin;
    } else if (this.rectY > windowHeight - this.rectHeight) {
      this.rectY = this.rectMax
    }
  }

  reload() {
    this.rectX = this.rectXStart
    this.rectY = this.rectYStart
  }
}

class Ball {
  constructor() {
    this.ballSize = 40
    this.ballX = windowWidth/2 - this.ballSize/2
    this.ballY = 0 + this.ballSize/2
    this.ballSpeedX = 5
    this.ballSpeedY = 3
  }

  display() {
    noFill()
    stroke(0, 255, 0)
    strokeWeight(3)
    rect(this.ballX, this.ballY, this.ballSize);
  }

  randomSpeed() {
      this.ballSpeedX = -5
    }

  move() {
    this.ballX += this.ballSpeedX;
    this.ballY += this.ballSpeedY;
  }

  boundsDetection() {
    if (this.ballY < 0  || this.ballY > windowHeight - this.ballSize) {
      this.ballSpeedY *= -1
    }
  }

  reload() {
    this.ballX = windowWidth/2 - this.ballSize/2
    this.ballY = 0 + this.ballSize/2
    this.ballSpeedX = 5
    this.ballSpeedY = 3
  }
}

class MapDetails {
  constructor() {
    this.lineDash = 10
    this.hitCounter = 0
    this.player1Score = 0
    this.player2Score = 0
  }

  displayLine() {
    push()
      drawingContext.setLineDash([this.lineDash, this.lineDash]);
      line(windowWidth/2, 0, windowWidth/2, windowHeight);
    pop()
  }

  displayHitCounter() {
    textSize(30)
    text(this.hitCounter, windowWidth - 50, windowHeight - 20)
  }

  displayPlayer1Score() {
    textSize(30)
    text(this.player1Score, 200, 50);
  }

  displayPlayer2Score() {
    textSize(30)
    text(this.player2Score, windowWidth - 200, 50)
  }
}
