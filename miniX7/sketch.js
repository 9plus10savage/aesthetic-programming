let titleText;
let stars = [];
let minStars = 25;
let startTheme;

function preload() {
  pixelFont = loadFont('./assets/pixelfont2.ttf');
  soundFormats('mp3');
  startTheme = loadSound('./assets/themeMusic')
  startTheme.setVolume(0.2);
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  rectMode(CENTER)
  titleText = createP('PONG')
  titleText.addClass('title')
  titleText.addClass('floatClass')
  startTheme.play();
}

function draw() {
  background(0, 0, 0, 20)

if (stars.length < minStars) {
  stars.push(new Star)
}

for (s of stars) {
  s.show()
  s.starDestroyer()
}

for (let i = 0; i < stars.length; i++) {
  if (stars[i].opacity < 0) {
    stars.splice(i, 1)
  }
}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
