  let pixelFont;

  let counter;

  let selector = 0;
  let contentSelector = 0;

  let contentImgWidth = 320;
  let contentYPos = 600

  let buttonYPos = 725;

  let blinkCounter = 0;
// text
  let t1 = 'Would you like to \ninstall'
  let t2 = 'Adblock?'

// colors
  let t2r = 228;
  let t2g = 13;
  let t2b = 13;

  let tXPos = 940;

  function preload() {
    base = loadImage('windowtest.png');
    contentYT = loadImage('contentYT.png');
    contentGames = loadImage('contentGames.png');
    contentArt = loadImage('contentArt.png');
    pixelfont = loadFont('pixelfont.TTF');
    pixelFont2 = loadFont('pixelfont2.ttf');
    pixelFont3 = loadFont('pixelfont3.ttf');
  }

  function setup() {
    createCanvas(windowWidth, windowHeight);

    acceptButton = createButton('Accept')
    acceptButton.mousePressed(yesPlace)
    acceptButton.position(windowWidth/2 - 235, buttonYPos);
    acceptButton.addClass('accept')

    declineButton = createButton('Decline')
    declineButton.mousePressed(noPlace)
    declineButton.position(windowWidth/2, buttonYPos);
    declineButton.addClass('decline')
  }

  function draw() {
    background(220);
    image(base, 0, 0);
    tabText('pixelfont2')
    startText()

    if (contentSelector > 0 ) {
      basicAdblock(325 , 192)
    }

    if (selector === 1) {
      t1 = 'Would you like to \naccept'
      t2 = 'Cookies?'
      t2r = 160;
      t2g = 113;
      t2b = 60;
      tXPos = 900
    } else if (selector === 2) {
      counter = millis();
      t1 = ''
      t2 = ''

      acceptButton.remove();
      declineButton.remove();
      exclamationBlink();
      counterDelay();

      push()
        textFont(pixelFont2)
        textSize(80)
        text('Choose your favorite content', windowWidth/2 - 1248/2, 375)
      pop()

      push()
        textFont(pixelFont2)
        textSize(90)
        fill(0, blinkCounter)
        text('!', windowWidth/2 + 1248/2+ 10, 375)
      pop()

      push()
        dropShadow(15, 9, 0);
        image(contentYT, windowWidth/2 - contentImgWidth/2 - 375, contentYPos);
        image(contentGames, windowWidth/2 - contentImgWidth/2, contentYPos);
        image(contentArt, windowWidth/2 - contentImgWidth/2 + 375, contentYPos);
      pop()

      push()
        textFont(pixelFont2)
        textSize(60)
        fill(0);
        text('Youtube', windowWidth/2  - 375 - 252/2, contentYPos - 30)
        text('Games', windowWidth/2 - 186/2, contentYPos - 30)
        text('Art', windowWidth/2  + 375 - 105/2, contentYPos - 30)
      pop()
    } else if (selector === 3 & contentSelector === 0) {
      textFont(pixelFont2)
      textSize(100)
      fill(0);
      text('[ Content Placeholder ]', windowWidth/2  - 375 - 420/2, contentYPos)
    } else if (selector === 3 & contentSelector != 0) {
      contentYPos++
      collapse()
      textFont(pixelFont2)
      textSize(72)
      fill(0);
      text('We are largely funded through',  windowWidth/2 - 1159/2, contentYPos - 90);
      fill(228, 13, 13)
      text('Ad revenue', windowWidth/2 - 1159/2, contentYPos - 30)
      fill(0);
      text('and', windowWidth/2 - 1159/2 + 440, contentYPos - 30);
      fill(160, 113, 60);
      text('Data gathering', windowWidth/2 - 1159/2 + 595, contentYPos - 30);
      fill(0);
      text('Without these revenue sources',  windowWidth/2 - 1159/2, contentYPos + 30)
      text("We're forced to shut down...", windowWidth/2 - 1159/2, contentYPos + 90)
    }
  }

  function tabText(font) {
    textFont(font);
    textSize(36)
    fill(0)
    text('Compliance', 90, 219);
  }

  function startText() {
    push()
    textFont(pixelFont2);
    textSize(100);
    fill(0)
    text(t1, 500, 500);

    fill(t2r, t2g, t2b)
    text(t2, tXPos, 623)
    pop()
  }

  function basicAdblock(translateX, translateY) {
    let sideLength1 = 80
    let sideLength2 = 220
    let sidePosition1 = 0
    let sidePosition2 = 300
    push()
    translate(translateX, translateY)
    scale(0.12, 0.12)
    beginShape()
      stroke(0)
      strokeWeight(10)
      fill(228,13,13)
      vertex(sideLength1, sidePosition1);
      vertex(sideLength2, sidePosition1);
      vertex(sidePosition2, sideLength1);
      vertex(sidePosition2, sideLength2);
      vertex(sideLength2, sidePosition2);
      vertex(sideLength1, sidePosition2);
      vertex(sidePosition1, sideLength2);
      vertex(sidePosition1, sideLength1);
    endShape(CLOSE)

    fill(255)
    textFont('sans-serif')
    noStroke()
    textSize(140)
    text('ABP', 15, 200)
    pop()
  }

  function yesPlace() {
    selector += 1
    contentSelector++
  }

  function noPlace() {
    selector += 1
  }

  function exclamationBlink() {
    if (frameCount % 60 === 0) {
      blinkCounter = 255
    } else {
      blinkCounter -= 5
    }
  }

  function counterDelay() {
      if (counter > 3000) {
      contentClickDetection()
    }
  }

  function contentClickDetection() {
    // Youtube click detection
    if (mouseIsPressed && mouseX > windowWidth/2 - 375 - contentImgWidth/2 && mouseX < windowWidth/2 - 375 + contentImgWidth/2 && mouseY > contentYPos && mouseY < contentYPos + contentImgWidth) {
      selector += 1
    } else if (mouseIsPressed && mouseX > windowWidth/2 - contentImgWidth/2 && mouseX < windowWidth/2 + contentImgWidth/2 && mouseY > contentYPos && mouseY < contentYPos + contentImgWidth) {
        selector += 1
      } else if (mouseIsPressed && mouseX > windowWidth/2 + 375 - contentImgWidth/2 && mouseX < windowWidth/2 + contentImgWidth/2 + 375 && mouseY > contentYPos && mouseY < contentYPos + contentImgWidth) {
        selector += 1
      } else {
        cursor(ARROW);
      }
  }

  function collapse() {
    let jitterX = random(-2, 2);
    let jitterY = random(-2, 2);

    if(contentYPos - 130 > windowHeight) {

     fill(0);
     noStroke()
     rect(60, 180, windowWidth - 120, windowHeight - 240);

    for (i = 60; i < windowWidth - 60; i += 20) {
     for (j = 180; j < windowHeight - 60; j += 20) {
      let randomBrightness = random(0, 255)
      noStroke()
      fill(0)
      rect(i, j, 20)
      fill(0, 255, 0, randomBrightness)
      rect(i, j, 20);
     }
   }
   translate(jitterX, jitterY)
   textSize(300)
   fill(0, 200);
   stroke(0, 255, 0);
   strokeWeight(5)
   text('DATA', windowWidth/2 - 350, windowHeight/2 + 150);
  }
}

  function dropShadow(OffsetX, OffsetY, blur) {
    drawingContext.shadowOffsetX = OffsetX;
    drawingContext.shadowOffsetY = OffsetY;
    drawingContext.shadowBlur = blur;
    drawingContext.shadowColor = color(0, 0, 0, 180)
  }

  function dropShadowReset() {
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = 'black';
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    acceptButton.position(windowWidth/2 - 235, buttonYPos);
    declineButton.position(windowWidth/2, buttonYPos);
  }
