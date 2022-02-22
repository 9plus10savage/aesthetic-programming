const windowWidth = 900
const windowHeight = 600;

let outputRectX = 475;
let outputRectY = 50;
let outputRectHeight = 500;
let outputRectWidth = 350;
let outputRectXEnd = outputRectX + outputRectWidth
let outputRectYEnd = outputRectY + outputRectHeight

let eyeSelectorVal = 0;
let mouthSelectorVal = 0;
let backgroundSelectorVal = 0;

let ellipseSize = 200;

// below are the variables used for the for loop that pushes the buttons to the DOM
let buttonOneIndent = 40;
let buttonTwoIndent = 37.5;
let buttonThreeIndent = 115;

let buttonsYPos = outputRectY/2 + outputRectYEnd/2 + 60
let buttonColumn1X = outputRectX + buttonOneIndent
let buttonColumn2X = outputRectX/2 + outputRectXEnd/2 - buttonTwoIndent
let buttonColumn3X = outputRectXEnd - buttonThreeIndent

let buttonName = ['eyeButtonOne', 'eyeButtonTwo', 'eyeButtonThree', 'mouthButtonOne', 'mouthButtonTwo', 'mouthButtonThree', 'backButtonOne', 'backButtonTwo', 'backButtonThree']
let buttonText = ['Eyes 1', 'Eyes 2', 'Eyes 3', 'Mouth 1', 'Mouth 2', 'Mouth 3', 'Back 1', 'Back 2', 'Back 3']
let buttonFunctionCall = [eye1, eye2, eye3, mouth1, mouth2, mouth3, back1, back2, back3]
let buttonPositionX = [buttonColumn1X, buttonColumn2X, buttonColumn3X, buttonColumn1X, buttonColumn2X, buttonColumn3X, buttonColumn1X, buttonColumn2X, buttonColumn3X]
let buttonPositionY = [buttonsYPos, buttonsYPos, buttonsYPos, buttonsYPos + 60, buttonsYPos + 60, buttonsYPos + 60, buttonsYPos + 120, buttonsYPos + 120, buttonsYPos + 120]
let buttonClass = ['myEyeButtons', 'myEyeButtons', 'myEyeButtons', 'myMouthButtons', 'myMouthButtons', 'myMouthButtons', 'myBackButtons', 'myBackButtons', 'myBackButtons']

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);


  expressionSlider = createSlider(0, 355, 177.5);
  expressionSlider.position(150, 210);
  expressionSlider.addClass("mySliders");


  identitySlider = createSlider(20, 100, 60);
  identitySlider.position(150, 282.5);
  identitySlider.addClass("mySliders");


  sexualitySlider = createSlider(50, 100, 75);
  sexualitySlider.position(150, 355);
  sexualitySlider.addClass("mySliders");


  for(i = 0; i < 9; i++) {
    buttonName[i] = createButton(buttonText[i])
    buttonName[i].mousePressed(buttonFunctionCall[i])
    buttonName[i].position(buttonPositionX[i], buttonPositionY[i]);
    buttonName[i].addClass(buttonClass[i]);
  }
}

function draw() {
  background(270, 5, 51);

  eValue = expressionSlider.value();

  iValue = identitySlider.value();
  iValue360 = map(iValue, 0, 100, 0, 360);

  sValue = sexualitySlider.value();
  sValue360 = map(sValue, 0, 100, 0, 360);


  // draws the two rectangles + line
  inputOutputRectangles()

  // selects background based on back1-3 functions
  backSelect()

  // draws circle + gradient
  radialGradient()

  // selects eyes based on eye1-3 functions
  eyeSelect()

  // selects mouth based on mouth1-3 functions
  mouthSelect()

  // text for sliders
  sliderLabels();

  console.log(mouseY);
}



function dropShadow(OffsetX, OffsetY, blur, color) {
  drawingContext.shadowOffsetX = OffsetX;
  drawingContext.shadowOffsetY = OffsetY;
  drawingContext.shadowBlur = blur;
  drawingContext.shadowColor = color;
}

function dropShadowReset() {
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = 'black';
}

function radialGradient() {
  push()
    let gradient = drawingContext.createRadialGradient(
    outputRectX/2  + outputRectXEnd/2, outputRectY/2  + outputRectYEnd/2,  0, outputRectX/2 + outputRectXEnd/2,  outputRectY/2 - 50 + outputRectYEnd/2 - 50, 200
    );

    gradient.addColorStop(0, color(eValue, sValue, 100));
    gradient.addColorStop(1, color(iValue360, sValue, 100));

    drawingContext.fillStyle = gradient;
    stroke(0);
    strokeWeight(10);
    ellipse(outputRectX/2 + outputRectXEnd/2, outputRectY/2 - 55 +  outputRectYEnd/2 - 55, ellipseSize)
  pop()
}

function sliderLabels() {

  // m = masculine & f = feminine
  dropShadowReset()

  let expressionText = 'Gender Expression'
  let identityText = 'Gender Identity'
  let sexualityText = 'Sexuality'
  let mTag = 'M'
  let fTag = 'F'
  textSize(14);
  textFont('Helvetica');
  textStyle(BOLD);
  fill(255, 0,0);
  text(expressionText, 190, 190, 350, 280);
  text(identityText, 200, 262.5, 500, 355);
  text(sexualityText, 220, 335, 500, 430);
  textSize(16)
  text(mTag, 120, 232);
  text(mTag, 120, 308);
  text(mTag, 120, 383);
  text(fTag, 370, 232);
  text(fTag, 370, 308);
  text(fTag, 370, 383);
  textAlign(LEFT);
}

function eye1() {
  if (eyeSelectorVal != 1) {
    eyeSelectorVal = 1
  } else {
    eyeSelectorVal = 0
  }
}

function eye2() {
  if (eyeSelectorVal != 2) {
    eyeSelectorVal = 2
  } else {
    eyeSelectorVal = 0
  }
}

function drawEye2(translateX, translateY, scaleX, scaleY, peakY, peakY2) {

  translate(translateX, translateY);
  scale(scaleX, scaleY)

  beginShape()

    fill(0);

    //left
    vertex(10, 50);
    //peak
    vertex(50, peakY);
    //right
    vertex(90, 50);
    //right2
    vertex(73, 50);
    //peak2
    vertex(50, peakY2)
    //left2
    vertex(27, 50);

  endShape(CLOSE);
}

function eye3() {
  if (eyeSelectorVal != 3) {
    eyeSelectorVal = 3
  } else {
    eyeSelectorVal = 0
  }
}

function drawEye3(translateX, translateY, scaleX, scaleY) {
  translate(translateX, translateY);
  scale(scaleX, scaleY);

  beginShape()
    fill(0);

    vertex(0, 20);
    vertex(50, 50);
    vertex(0, 80);
    vertex(0, 67);
    vertex(30, 50);
    vertex(0, 33);

  endShape()
}

function mouth1() {
  if (mouthSelectorVal != 1) {
    mouthSelectorVal = 1
  } else {
    mouthSelectorVal = 0
  }
}

function drawMouth1(translateX, translateY) {
  translate(translateX, translateY)

  textSize(100)
  text('~', 50, 50)
}

function mouth2() {
  if (mouthSelectorVal != 2) {
    mouthSelectorVal = 2
  } else {
    mouthSelectorVal = 0
  }
}

function drawMouth2(scaleX, scaleY) {
  let angle = 45;
  rectMode(CENTER);

  translate(652, 230)
  scale(scaleX, scaleY)
  rotate(angle);

  fill(0);
  rect(0, 0, 50, 20);
}

function mouth3() {
  if (mouthSelectorVal != 3) {
    mouthSelectorVal = 3
  } else {
    mouthSelectorVal = 0
  }
}

function drawMouth3(translateX, translateY) {
  translate(translateX, translateY);
  scale(0.7, 0.7)
  fill(0)
  rect(0, 0, 20, 50, 0, 10, 10, 0)
  rect(20, 13.5, 110, 20)
  rect(130, 0, 20, 50, 10, 0, 0, 10);
}

function back1() {
  if (backgroundSelectorVal != 1) {
    backgroundSelectorVal = 1
  } else {
    backgroundSelectorVal = 0
  }
}

function drawBack1() {
  noStroke()
  fill(0, 0, 16);
  rect(outputRectX + 1, outputRectY + 1, outputRectWidth - 1, 280);

  fill(274, 58, 82);
  rect(outputRectX + 1, outputRectY + 1, outputRectWidth - 1, 210);

  fill(0, 0, 99);
  rect(outputRectX + 1, outputRectY + 1, outputRectWidth - 1, 140);

  fill(58, 81, 99);
  rect(outputRectX + 1, outputRectY + 1, outputRectWidth - 1, 70);

}

function back2() {
  if (backgroundSelectorVal != 2) {
    backgroundSelectorVal = 2
  } else {
    backgroundSelectorVal = 0
  }
}

function drawBack2() {
  noStroke()
  fill(201, 87, 100);
  rect(outputRectX + 1, outputRectY + 1, outputRectWidth - 1, 280);

  fill(51, 100, 100);
  rect(outputRectX + 1, outputRectY + 1, outputRectWidth - 1, 186.666);

  fill(331, 87, 100);
  rect(outputRectX + 1, outputRectY + 1, outputRectWidth - 1, 93.333);
}

function back3() {
  if (backgroundSelectorVal != 3) {
    backgroundSelectorVal = 3
  } else {
    backgroundSelectorVal = 0
  }
}

function drawBack3() {
  noStroke()
  fill(196, 64, 98);
  rect(outputRectX + 1, outputRectY + 1, outputRectWidth - 1, 280);

  fill(348, 31, 96);
  rect(outputRectX + 1, outputRectY + 1, outputRectWidth - 1, 224);

  fill(0, 0, 100);
  rect(outputRectX + 1, outputRectY + 1, outputRectWidth - 1, 168);

  fill(348, 31, 96);
  rect(outputRectX + 1, outputRectY + 1, outputRectWidth - 1, 112);

  fill(196, 64, 98)
  rect(outputRectX + 1, outputRectY + 1, outputRectWidth - 1, 56)
}

function eyeSelect() {
  push()
    if (eyeSelectorVal === 1) {
      drawEye2(570, 115, 0.8, 0.8, 100, 80)
      drawEye2(100, 0, 1.0, 1.0, 100, 80)
    } else if (eyeSelectorVal === 2) {
      drawEye2(570, 140, 0.8, 0.8, 0, 20);
      drawEye2(100, 0, 1.0, 1.0, 0, 20);
    } else if (eyeSelectorVal === 3) {
      drawEye3(597, 120, 0.9, 0.9);
      drawEye3(120, 0, -1, 1);
   }
  pop()
}

function mouthSelect() {
  push()
    if (mouthSelectorVal === 1) {
      drawMouth1(570, 210);
    } else if (mouthSelectorVal === 2) {
      push()
        drawMouth2(-1, 1);
      pop()
      push()
        drawMouth2(1, 1)
        pop()
    } else if (mouthSelectorVal === 3) {
      drawMouth3(597, 210)
    }
  pop()
}

function backSelect() {
  push()
  if (backgroundSelectorVal === 1) {
    drawBack1()
  } else if (backgroundSelectorVal === 2) {
    drawBack2()
  } else if (backgroundSelectorVal === 3) {
    drawBack3()
  }
  pop()
}

function inputOutputRectangles() {
  push()
    fill(255)
    stroke(0);
    strokeWeight(3);
    dropShadow(-5, 5, 10, 'black');
    rect(75, windowHeight/2 - 350/2 , outputRectWidth, outputRectHeight - 150)
    rect(outputRectX, outputRectY, outputRectWidth, outputRectHeight);
  pop()

  push()
    stroke(0);
    strokeWeight(3);
    line(outputRectX, outputRectY/2 + outputRectYEnd/2 + 32, outputRectXEnd, outputRectY/2 + outputRectYEnd/2 + 32);
  pop()
}
