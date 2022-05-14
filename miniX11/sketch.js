let rotateVal = 0;
let stateTracker = 0;
let lerpedColor;
let startColor;
let endColor;
let colorTracker = 0;
let isRotating = false;
let coolDown = false
let startAlpha = 255;
let alphaChange = 0;
let scaleVal = 1;
let translateX = 1920/2;
let translateY = 1080/2 + 1860;


function preload() {
  monumentBFont = loadFont('assets/monumentb.otf')
  img = loadImage('/assets/wheel.png');
  pointer = loadImage('assets/pointer.png');
  rotateSound = loadSound('assets/rotateSound3.mp3');
  rainforestAmb = loadSound('assets/rainforestAmb.mp3');
  industrialAmb = loadSound('assets/industrialAmb.mp3')
  currentAmb = loadSound('assets/currentAmb.mp3');
  nearFutureAmb = loadSound('assets/nearFutureAmb.mp3');
  posthumanAmb = loadSound('assets/posthumanAmb.mp3');
  voiceIntroduction = loadSound('/assets/introduction.wav');
  voiceRainforestEra = loadSound('/assets/rainforestEra.wav');
  voiceIndustrialEra = loadSound('/assets/industrialEra.wav');
  voiceCurrentEra = loadSound('assets/currentEra.wav');
  voiceFutureEra = loadSound('/assets/nearFutureEra.wav');
  voicePostHumanEra = loadSound('/assets/posthumanEra.wav');
  voicePostHumanEra2 = loadSound('assets/posthumanEra2.mp3');
  voiceConclusion = loadSound('/assets/conclusion.wav');
  voiceWallBreak = loadSound('/assets/fourthWallBreak.wav');
  voiceWrongTurn1 = loadSound('/assets/wrongTurn.wav');
  voiceWrongTurn2 = loadSound('/assets/wrongTurn2.wav');
  voiceSubsequentTurn = loadSound('/assets/subsequentTurn.wav');
}

function setup() {
  createCanvas(1920, 1080);
  textAlign(CENTER);
  imageMode(CENTER);
  angleMode(DEGREES);
  textAlign(CENTER);

  startColor = color(137, 229, 255);
  endColor = color(65, 80, 94);

  startButton = createButton("ENTER");
  startButton.size(400, 125);
  startButton.position(width/2 - 200, height/2 - 75);
  startButton.mousePressed(buttonChange);
  startButton.addClass('buttonStyling')

  leftArrow = createImg('/assets/leftArrow.png', 'arrow pointing left');
  leftArrow.position(width/2 - 306 - 30, 50);
  leftArrow.mousePressed(wheelLeftTurn);
  leftArrow.addClass('rightArrow');
  leftArrow.hide()

  rightArrow = createImg('/assets/rightArrow.png', 'arrow pointing right');
  rightArrow.position(width/2 + 30, 50);
  rightArrow.mousePressed(wheelRightTurn);
  rightArrow.addClass('rightArrow');
  rightArrow.hide()
}

function draw() {

  lerpedColor = lerpColor(startColor, endColor, colorTracker);
  background(lerpedColor);

  push()
    translate(translateX, translateY);
    scale(scaleVal);
    rotate(rotateVal);
    image(img, 0, 0);
  pop();

  startScreen();
  wheelRotate();
  wheelZoomOut();
  firstState();
  ambience();

  playSound(1, voiceIndustrialEra, 1);
  playSound(2, voiceCurrentEra, 2);
  playSound(3, voiceFutureEra, 3);
  playSound(4, voicePostHumanEra2, 4);

  console.log(isRotating)
}

function wheelRightTurn() {
  if (!coolDown && !soundIsPlaying && eraArray[0] === true) {
    stateTracker += 1;
    coolDown = !coolDown;
    setTimeout(coolDownFlip, 5000);
  }
}

function wheelLeftTurn() {
  if (!coolDown && !soundIsPlaying) {
    voiceWrongTurn1.play();
    coolDown = !coolDown;
    setTimeout(coolDownFlip, voiceWrongTurn1.duration()*1000);
  }
}

function coolDownFlip() {
  coolDown = !coolDown;
}

function wheelRotate() {
  if (stateTracker === 1 && rotateVal >= -72) {
    rotateVal -= 0.5;
    colorTracker += 0.001736;
    isRotating = true
  } else if (stateTracker === 2 && rotateVal >= -72*2) {
    rotateVal -= 0.5;
    colorTracker += 0.001736;
    isRotating = true;
  } else if (stateTracker === 3 && rotateVal >= -72*3) {
    rotateVal -= 0.5;
    colorTracker += 0.001736;
    isRotating = true;
  } else if (stateTracker === 4 && rotateVal >= -72*4) {
    rotateVal -= 0.5;
    colorTracker += 0.001736;
    isRotating = true;
  } else if (stateTracker >=  5) {
    playSound(5, voiceSubsequentTurn, 5);
  } else {
    isRotating = false;
 }
}


function wheelZoomOut() {
  if (stateTracker >= 4 && voicePostHumanEra2.currentTime() >= voicePostHumanEra2.duration()-0.02) {
    playSound(4, voiceConclusion, 6);
    zoomEffect();
    rightArrow.remove();
    leftArrow.remove();
    rotateVal -= 0.1;
    startColor = color(0, 0, 0);
    colorTracker -= 1/(60*4.38);
  }
}

function zoomEffect() {
  if (translateY >= height/2) {
    translateY -= 1860/(60*4.38)
  }
  if (scaleVal >= 0.20) {
    scaleVal -= 0.8/(60*4.38)
  }
  if (scaleVal < 0.20) {
    playSound(4, voiceWallBreak, 7)
    lastState();
  }
}

function startScreen() {
  noStroke();
  fill(0, 0, 0, startAlpha);
  rect(0,0,1920,1080);
}

function buttonChange() {
  startButton.remove();
  voiceIntroduction.play();
  soundIsPlaying = !soundIsPlaying;
  setTimeout(soundFlip, voiceIntroduction.duration()*1000);
  // Alphavalue/(Duration of introVoice in seconds * 60) - Extra for pause between voices
  alphaChange = 255/(5.8*60) - 0.2;
}

function firstState() {
  if (startAlpha > 0) {
    startAlpha -= alphaChange;
  }

  if (startAlpha < 0) {
    playSound(0, voiceRainforestEra, 0);
  }

  if (startAlpha < 135) {
    rightArrow.show();
    leftArrow.show();
  }
}

function lastState() {
  push();
    translate(translateX, translateY);
    scale(scaleVal);
    //rotate by same amount - the rotation down to CurrentEra (its minus because of backwards rotation)
    rotate(rotateVal + 72*2);
    image(pointer, 0, -2200);
    isRotating = true;
    push();
      translate (0, translateY - 3100);
      fill(255);
      textSize(125);
      textFont(monumentBFont);
      rotate(-rotateVal - 72*2);
      text("YOU ARE HERE", 0 , 0);
    pop();
  pop();
}

function ambience() {
  rotateSound.setVolume(0.15);
  rainforestAmb.setVolume(0.05);
  industrialAmb.setVolume(0.05);
  currentAmb.setVolume(0.3);
  nearFutureAmb.setVolume(0.03);
  posthumanAmb.setVolume(0.3);

  if (startAlpha < 0 && stateTracker == 0 && !rainforestAmb.isPlaying()) {
    rainforestAmb.play();
  } else if (stateTracker == 1 && !industrialAmb.isPlaying()) {
    industrialAmb.play();
  } else if (stateTracker == 2 && !currentAmb.isPlaying()) {
    currentAmb.play();
  } else if (stateTracker == 3 && !nearFutureAmb.isPlaying()) {
      nearFutureAmb.play();
  } else if (stateTracker == 4 && !posthumanAmb.isPlaying()) {
      // rainforestAmb.play();
  }

  if (isRotating) {
    rainforestAmb.stop();
    industrialAmb.stop();
    currentAmb.stop();
    nearFutureAmb.stop();
    posthumanAmb.stop();
    }

  if (isRotating && !rotateSound.isPlaying() && scaleVal > 0.99) {
    rotateSound.play();
  } else if (!isRotating) {
    rotateSound.stop()
  }
  }
