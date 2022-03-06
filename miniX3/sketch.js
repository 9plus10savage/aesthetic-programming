// values checked through img.width / img.height syntax
let hourglassWidth = 305
let hourglassHeight = 385
let hourglassPosX = hourglassWidth/2
let hourglassPosY = hourglassHeight/2

let angle = 0

function preload() {
  hourglassImg = loadImage('hganimation.gif');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB)
  angleMode(DEGREES)
}

function draw() { 
  background(0, 0, 100); 
  
// template for object creation
  class hourglass {
    constructor(x, y) {
      this.x = x
      this.y = y
      translate(windowWidth/2, windowHeight/2)
      rotate(angle)
    }
   
  display() {
    image(hourglassImg, -hourglassPosX, -hourglassPosY)
    }
    
  animate() {
    if (hourglassImg.getCurrentFrame() === 59 || hourglassImg.getCurrentFrame() === 119) {
      angle += 4
      hourglassImg.pause()
    } 
    if (angle % 180 === 0) {
      hourglassImg.play()
      }
    }
  }
  
// key value pair, could also be put in object
  const loadingText = {
    x: windowWidth - 280,
    y: windowHeight - 20,
    size: 64,
    moveX: random(-5, 5),
    moveY: random(-5, 5),
    opacity: random(0.1, 1.0),
  };
  
// mapping mouseX and mouseY to the appropriate color ranges
  let mouseXHue = map(mouseX, 0, windowWidth, 0, 360)
  let mouseYSaturation = map(mouseY, 0, windowHeight, 0, 100)
  
// using a nested for loop to create the background 
   for (i = 0; i < windowWidth; i += 20) { 
     for (j = 0; j < windowHeight; j += 20) {
      let randomBrightness = random(0, 100)
      noStroke()
      fill(mouseXHue, mouseYSaturation, randomBrightness)
      rect(i, j, 20)  
     }
  }
  
// creating the object
  push()
    let hourglass1 = new hourglass(hourglassPosX, hourglassPosY)
    hourglass1.display()
    hourglass1.animate()
  pop()
 
// creating the loading text
  push()
  translate(loadingText.moveX, loadingText.moveY)
  textSize(loadingText.size)
  fill(0, 0, 0, loadingText.opacity)
  strokeWeight(3)
  stroke(0, 0, 100)
  text('Loading...', loadingText.x, loadingText.y)
  pop()
}
