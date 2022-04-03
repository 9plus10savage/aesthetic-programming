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
    if (keyIsDown(this.keycode) && !boundsCheck) {
      this.rectY -= this.rectSpeed }
    else if (keyIsDown(this.keycode2) && !boundsCheck) {
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
    this.ballSpeedX = 4
    this.ballSpeedY = 3
    this.history = []
  }

  display() {
    push()
    fill(0)
    stroke(0, 255, 0)
    strokeWeight(3)
    rect(this.ballX, this.ballY, this.ballSize);
    pop()
  }

  randomSpeed() {
      this.ballSpeedX = -5
      console.log('randomS')
    }

  move() {
    if (!boundsCheck) {
    this.ballX += this.ballSpeedX;
    this.ballY += this.ballSpeedY;
    }
  }

  boundsDetection() {
    if (this.ballY < 0  || this.ballY > windowHeight - this.ballSize) {
      this.ballSpeedY *= -1
      wallSound.play()
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
    this.font = pixelFont
  }

  displayLine() {
    push()
      drawingContext.setLineDash([this.lineDash, this.lineDash]);
      line(windowWidth/2, 0, windowWidth/2, windowHeight);
    pop()
  }

  displayHitCounter() {
    textFont(this.font)
    textSize(72)
    fill(0)
    stroke(0, 252, 1)
    text(this.hitCounter, windowWidth - 100, windowHeight - 50)
  }

  displayPlayer1Score() {
    text(this.player1Score, windowWidth*0.25, 50);
  }

  displayPlayer2Score() {
    text(this.player2Score, windowWidth*0.75, 50)
  }

  displayWinner(winner) {
    push()
      fill(0)
      noStroke()
      rect(0, 0, windowWidth, windowHeight)
    pop()
    push()
      textSize(250);
      text(winner + ' ' + 'wins!', windowWidth/2 - 875, windowHeight/2 + 50)
    pop()
    push()
      text('Press F5 to play again !', windowWidth/2 - 430, windowHeight - 50);
    pop()
  }
}
