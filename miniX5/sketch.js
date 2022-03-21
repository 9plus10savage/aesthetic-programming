const  forwardArray = []
const  backwardArray = []

let methodSelector;
let scol = 255
let x = -200;
let y = -200;
let spacing = 20;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES)
}

function draw() {
  background(0);

  class lineClass {
    constructor(x, y, space) {
      this.x = x
      this.y = y
      this.stroke = (255, 255, 255)
      this.spacing = space
      this.blur = 0
      this.xoff = 0.0
      drawingContext.shadowOffsetX = 0;
      drawingContext.shadowOffsetY = 0;
      drawingContext.shadowBlur = 0;
      drawingContext.shadowColor = 'black';
      translate(200,200)
     }

    displayForward() {
      stroke(this.stroke)
      line(this.x, this.y + this.spacing, this.x + this.spacing, this.y)
     }

    displayBackward() {
      stroke(this.stroke)
      line(this.x, this.y, this.x + this.spacing, this.y + this.spacing)
    }

    rotate() {
      this.stroke = 255
      let angles = [45, 90, 180, 270];

      if (frameCount % 61 === 0) {
          this.angle = random(angles)
      }

      rotate(this.angle)

    }

    dropShadow() {
      this.blur = random(0, 2)
      this.stroke = 0;

      drawingContext.shadowOffsetX = 3;
      drawingContext.shadowOffsetY = 2;
      drawingContext.shadowBlur = this.blur;
      drawingContext.shadowColor = 'rgb(255, 0, 0)'
    }

    dropShadowAnimated() {
      this.blur = random(0, 2)
      this.stroke = 0;

      this.col1 = random(255)
      this.col2 = random(255)
      this.col3 = random(255)
      this.colPass = "rgb(" + this.col1 + "," + this.col2 + "," + this.col3 + ")"

      drawingContext.shadowOffsetX = 5;
      drawingContext.shadowOffsetY = 3;
      drawingContext.shadowBlur = this.blur;
      drawingContext.shadowColor = this.colPass;
    }


  dropShadowLerp() {
    this.from = color(0, 0, 0)
    this.to = color(255, 255, 255)
    this.amt = noise(this.xoff)

    this.xoff += 0.05

    this.stroke = lerpColor(this.from, this.to, this.amt)
  }
}

  if (random(1) < 0.5 && y < 200) {
    forwardArray.push(new lineClass(x, y, spacing))
  } else {
    backwardArray.push(new lineClass(x, y, spacing))
  }

  for (let i = 0; i < forwardArray.length; i++) {
    forwardArray[i].displayForward()

    if (methodSelector > 0 && methodSelector < 0.25) {
      forwardArray[i].rotate()
    }

    if (methodSelector > 0.25 && methodSelector < 0.50) {
      forwardArray[i].dropShadowAnimated()
    }

    if (methodSelector > 0.50 && methodSelector < 0.75) {
      forwardArray[i].dropShadow()
    }

    if (methodSelector > 0.75 && methodSelector < 1) {
      forwardArray[i].dropShadowLerp()
    }
  }

  for (let i = 0; i < backwardArray.length; i++) {
    backwardArray[i].displayBackward()

    if (methodSelector > 0 && methodSelector < 0.25) {
      backwardArray[i].rotate()
    }

    if (methodSelector > 0.25 && methodSelector < 0.50) {
      backwardArray[i].dropShadowAnimated()
    }

    if (methodSelector > 0.50 && methodSelector < 0.75) {
      backwardArray[i].dropShadow()
    }

    if (methodSelector > 0.75 && methodSelector < 1) {
      backwardArray[i].dropShadowLerp()
    }
  }

  if (x === -1 && frameCount % 180 === 0) {
    methodSelector = random(1)
  }

  verticalChange()

  }

function verticalChange() {
  if (y >= 200) {
    x = -1
  } else {
    x += spacing;
  }

  if (x > width) {
    x = -200;
    y += spacing;
  }
}
