let backgroundRect = [];
let textboxArray = [];
let fontArray = [];
let matrixArray = [];

let textUL = "";
let textUR = "";
let textML = "";
let textLL = "";
let textLR = "";

let textMLForbidden = "";

let index = 0;
let index1 = 0;
let lastMillis = 0;

let forbiddenFont;
let forbiddenFont2;

function preload() {
  basicStrings = loadJSON('text.json');
  defaultFont = loadFont('helveticaneue.ttf');
  errorFont = loadFont('pixelfont2.ttf')
  fontArray[0] = loadFont('Starborn.ttf');
  fontArray[1] = loadFont('soopafre.ttf');
  fontArray[2] = loadFont('mom.ttf');
  fontArray[3] = loadFont('Bubblegum.ttf');
  fontArray[4] = loadFont('alagard.ttf');
  fontArray[5] = loadFont('aurora.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(0);
  startUp();

  for (b of backgroundRect) {
    b.show();
  }

  for (t of textboxArray) {
    t.show();
  }

  normativeBodytext(0, textUL, "", 7.5)
  normativeBodytext(1, textUR, "", 7.5)
  normativeBodytext(2, textML, textMLForbidden, 2)
  normativeBodytext(3, textLL, "", 7.5)
  normativeBodytext(4, textLR, "", 7.5)

  breakBox();
  brokenBox();
}

function startUp() {
  if (frameCount == 1) {
    forbiddenFont = random(fontArray);
    createRect();
    createTextbox();
    textGenerator();
    forbiddenTextGenerator();
  }
}

function createRect() {
  // 100 is added to windowWidth & windowHeight to ensure no blackbars
  for (i = 0; i < windowWidth+100; i += windowWidth/48) {
    for (j = 0; j < windowHeight+100; j += windowHeight/28) {
       backgroundRect.push(new Background(i, j, 50 + i/20));
    }
  }
}

function createTextbox() {
  // upper left textbox
  textboxArray.push(new Textbox(random(windowWidth/6, windowWidth/7), random(windowHeight/5, windowHeight/4)));
  // upper right textbox
  textboxArray.push(new Textbox(windowWidth - random(windowWidth/6, windowWidth/7),  random(windowHeight/5, windowHeight/4)));
  // middle textbox
  textboxArray.push(new Textbox(windowWidth/2, windowHeight/2));
  // lower left textbox
  textboxArray.push(new Textbox(random(windowWidth/6, windowWidth/7), windowHeight - random(windowHeight/5, windowHeight/4)));
  // lower right textbox
  textboxArray.push(new Textbox(windowWidth - random(windowWidth/6, windowWidth/7), windowHeight - random(windowHeight/5, windowHeight/4)));
}

function rectFall() {
  for (i = 0; i < 15; i++) {
    backgroundRect[int(random(backgroundRect.length))].rectY += windowHeight + 100
  }
}

function deleteRect() {
  for (let i = 0; i < backgroundRect.length; i++) {
    if (backgroundRect[i].rectY > windowHeight) {
      backgroundRect.splice(i, 1);
    }
  }
}

function deleteTextbox() {
  for (let i = 0; i < textboxArray.length; i++) {
  if (backgroundRect.length < 1) {
    textboxArray.splice(i, 5);
    }
  }
}

function normativeBodytext(arrayNum, string, string2, boxSizeY) {
  typeWriter();
  if (textboxArray.length > 0) {
    push();
      drawingContext.shadowOffsetX = 0;
      drawingContext.shadowOffsetY = 0;
      drawingContext.shadowBlur = 0;
      drawingContext.shadowColor = color(20, 20, 20, 120);
      rectMode(CORNER);
      fill(0);
      textFont(defaultFont);
      textSize(15);
      text(string.substring(0, index), textboxArray[arrayNum].rectX + textboxArray[arrayNum].sizeX/10 - textboxArray[arrayNum].sizeX/2, textboxArray[arrayNum].rectY + textboxArray[arrayNum].sizeY/15 - textboxArray[arrayNum].sizeY/2, textboxArray[arrayNum].sizeX - textboxArray[arrayNum].sizeX/5, textboxArray[arrayNum].sizeY - textboxArray[arrayNum].sizeY/boxSizeY)

    // only applicable for middle textbox
    if (string.length <= index) {
        textFont(forbiddenFont)
        index1 += 0.5
        fill(0, 252, 1)
        text(string2.substring(0, index1), textboxArray[arrayNum].rectX + textboxArray[arrayNum].sizeX/10 - textboxArray[arrayNum].sizeX/2, textboxArray[arrayNum].rectY + textboxArray[arrayNum].sizeY/10, textboxArray[arrayNum].sizeX - textboxArray[arrayNum].sizeX/5, textboxArray[arrayNum].sizeY/2 - textboxArray[arrayNum].sizeY/7.5)
      }
  pop();
  }
}

function textGenerator() {
  normativeStatements = basicStrings.strings

  for (i = 0; i < 50; i++) {
    textUL = textUL + " I am " + basicStrings.strings[int(random(normativeStatements.length))].normativeStatement;
    textUR = textUR + " I am " + basicStrings.strings[int(random(normativeStatements.length))].normativeStatement;
    textLL = textLL + " I am " + basicStrings.strings[int(random(normativeStatements.length))].normativeStatement;
    textLR = textLR + " I am " + basicStrings.strings[int(random(normativeStatements.length))].normativeStatement;
  }
}

function forbiddenTextGenerator() {
  normativeStatements = basicStrings.strings
  forbiddenStatements = basicStrings.forbiddenstrings

  for (i = 0; i < 17; i++) {
    textML = textML + " I am " + basicStrings.strings[int(random(normativeStatements.length))].normativeStatement;
  }

  for (i = 0; i < 8; i++) {
    textMLForbidden = textMLForbidden + " I am " + basicStrings.forbiddenstrings[int(random(forbiddenStatements.length))].forbiddenStatement;
  }
}

function typeWriter() {
  if (millis() > lastMillis + 25) {
		index = index + 1;
		lastMillis = millis();
  }
}

function breakBox() {
  if (index1 > textMLForbidden.length && backgroundRect.length > 0 && textboxArray.length > 0) {
    rectFall();
    deleteRect();
    deleteTextbox();

    for (o of textboxArray) {
      o.jitter();
    }
  }
}

function brokenBox() {
  if (backgroundRect.length === 0) {

    for (i = 20; i < windowWidth; i += 48) {
        if (matrixArray.length < windowWidth/48) {
          matrixArray.push(new Matrix(i))
          }
        }

    for (m of matrixArray) {
        m.show();
        m.move();
        m.historyMethod();
      }

      fill(0);
      rectMode(CENTER);
      rect(windowWidth/2,windowHeight/2,1430-490,565-375);

      push();
        textSize(300);
        textFont(errorFont);
        fill(0);
        stroke(0, 252, 1);
        strokeWeight(5);
        textAlign(CENTER, CENTER);
        text('ERROR', windowWidth/2, windowHeight/2);
      pop();
      }
  }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
    if (backgroundRect.length > 0) {
      backgroundRect.splice(0, backgroundRect.length)
      textboxArray.splice(0, textboxArray.length)
      createRect();
      createTextbox();
    }
  }
