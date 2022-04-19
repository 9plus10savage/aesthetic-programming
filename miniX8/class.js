class Background {
  constructor(x, y, colour) {
    this.rectX = x;
    this.rectY = y;
    this.size = 40;
    this.colour = colour;
  }

  show() {
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = 'black';
    noStroke();
    fill(this.colour);
    rectMode(CENTER);
    rect(this.rectX, this.rectY, this.size);
  }
}

class Textbox {
  constructor(x, y) {
    this.rectX = x;
    this.rectY = y;
    this.sizeX = windowWidth/5;
    this.sizeY = windowHeight/3;
    this.jitter1 = 0;
    this.jitter2 = 0;
  }

  show() {
    translate(this.jitter1, this.jitter2);
    drawingContext.shadowOffsetX = 15;
    drawingContext.shadowOffsetY = 15;
    drawingContext.shadowBlur = 7.5;
    drawingContext.shadowColor = color(20, 20, 20, 40);
    fill(255);
    noStroke();
    rect(this.rectX, this.rectY, this.sizeX, this.sizeY);
  }

  jitter() {
    this.jitter1 = random(-4, 4)
    this.jitter2 = random(-4, 4)
  }
}

class Matrix {
  constructor(x) {
    this.x = x
    this.y = -80
    this.string = round(random(0, 1))
    this.opacity = 255
    this.history = []
  }

  historyMethod() {
    let v = createVector(this.x, this.y);

    if (frameCount % 5 === 0) {
      this.history.push(v);
    }
  }

  show() {
    fill(0, 255, 0, this.opacity)
    noStroke()
    textSize(30)
    text(this.string, this.x, this.y)

    for (let i = 0; i < this.history.length; i++) {
      if (frameCount % 2 === 0) {
        this.string = round(random(0, 1))
      }

      let pos = this.history[i];
      fill(0, random(150, 255), 0)
      textSize(30)
      noStroke()
      textFont(errorFont)
      text(this.string, pos.x, pos.y)
    }
  }

  move() {
    this.y += 10
  }


}
