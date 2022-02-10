let cnv;
const canvasWidth = 800;
const canvasHeight = 400;
let rectSpeedTest;
let rectYTest = 0;
let rectYTestUp = 275;

function setup() {
  createCanvas(950, 1000);
  angleMode(DEGREES);
}

function draw() {
 background(220);

push();

 translate(50, 0);
 leftEye(); 
 eyeOutline();
 
pop();
  
  
push();
  
  translate(900, 0);
  scale(-1, 1);
  leftEye();
  eyeOutline();
  
pop();
  
push();
  
 translate(158, 173);
 scale(0.5)
 mangekyoSharingan(170, 230, 150, 250, 200, 145, 255);
  
pop();

push();
  
 translate(600, 173);
 scale(0.5)
 mangekyoSharingan(170, 230, 150, 250, 200, 145, 255);
  
pop(); 

/*
frameRate(1);
noStroke();
fill(220)
rect(0, rectYTest, 950, 275);
rect(0, rectYTestUp, 950, 500);
  
rectYTest -= 35
rectYTestUp += 35
*/

}

function leftEye() {
 
  beginShape();
  dropShadowReset();
  noStroke();
  fill(254);
  curveVertex(160, 130);
  curveVertex(25, 200);
  curveVertex(126, 344);
  curveVertex(400, 325);
  curveVertex(300, 80);
  
  endShape();
  
  beginShape();
  fill(254);
  noStroke();
  curveVertex(33, 260)
  curveVertex(25, 200)
  curveVertex(200, 175)
  curveVertex(323, 213)
  curveVertex(400, 325)
  curveVertex(372, 415)
  
  endShape();
}

function eyeShading() {
  beginShape();
  noStroke();
  fill(236, 94, 152);
  
  // angle
  curveVertex()
  
  curveVertex(391, 299);
}

function eyeOutline() {
  
  // lower outline
  beginShape();
  noStroke();
  fill(0);
  
  // angle
  curveVertex(500, 300)
  
  curveVertex(363, 348);
  curveVertex(134, 340)
  curveVertex(20, 200)
  curveVertex(4, 210);
  curveVertex(110, 352);
  curveVertex(363, 348);
  
  // angle
  curveVertex(345, 275)
  
  endShape();
  
// upper outline
  beginShape();
  noStroke();
  fill(0);
  
  // angle
  curveVertex(750, 315)

 
  curveVertex(20, 200)
  curveVertex(200, 175)
  curveVertex(326, 208)
  curveVertex(391, 299);
  curveVertex(282, 205);
  curveVertex(25, 200)
  
  // angle
  curveVertex(194, 228)
  
  endShape();
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

function mangekyoSharingan(hexUpperY, hexLowerY, hexLeftX, hexRightX, hexPeakX, hexPeakYTop, hexPeakYBottom, irisX, irisY) {
  
// variables for hexagon
let hexagonUpperY = hexUpperY;
let hexagonLowerY = hexLowerY;
let hexagonLeftX = hexLeftX;
let hexagonRightX = hexRightX;
let hexagonPeakX = hexPeakX;
let hexagonPeakYTop = hexPeakYTop;
let hexagonPeakYBottom = hexPeakYBottom;

// variables for needle
let upperLeftTrianglePeakX;
let upperTrianglePeakY;
let upperRightTrianglePeakX;
let lowerLeftTrianglePeakX;
let lowerTrianglePeakY;
let lowerRightTrianglePeakX;
let leftmostTrianglePeakX;
let leftmostTrianglePeakY; 
let needleLength = 91;

// i literally don't know
let humanFailure = 4;

// ellipse variables
let ellipseGap = 40;
let ellipseSize = 40;
let outerEyeSize = 350;

// variables for shift
let fakeStroke = 7
let moveUp = 5
let triDiff = 30

// variables for rect test 
let rectBasicX = 200;
let rectBasicY = 200;
let rectSpeed = 3;

// variables for dropshadow
let blurRed;  
blurRed = random(35, 50);
  
  dropShadowReset();
  fill(0);
  ellipse(hexagonPeakX, hexagonPeakYTop / 2 + hexagonPeakYBottom / 2, outerEyeSize);
  
  dropShadow(0 , 0, blurRed, 'red')
  beginShape();
  
  noStroke();
  fill(184, 0, 0);
  
  // top
  vertex(hexagonPeakX,hexagonPeakYTop);
  
  // right side upper
  vertex(hexagonRightX, hexagonUpperY);
  
  // right side lower
  vertex(hexagonRightX, hexagonLowerY);
  
  // bottom
  vertex(hexagonPeakX, hexagonPeakYBottom);
  
  // left side lower
  vertex(hexagonLeftX, hexagonLowerY);
  
  // left side upper
  vertex(hexagonLeftX, hexagonUpperY);
  
endShape(CLOSE);


  // leftmost triangle
triangle(hexagonLeftX - fakeStroke, hexagonLowerY - moveUp, hexagonLeftX - fakeStroke, hexagonUpperY + moveUp, hexagonLeftX - fakeStroke - triDiff, hexagonUpperY / 2 + hexagonLowerY / 2);
 
  
// rightmost triangle
triangle(hexagonRightX + fakeStroke, hexagonLowerY - moveUp, hexagonRightX + fakeStroke, hexagonUpperY + moveUp, hexagonRightX + fakeStroke + triDiff, hexagonUpperY / 2 + hexagonLowerY / 2);
  
  
// upper left triangle
triangle(hexagonLeftX, hexagonUpperY - fakeStroke, hexagonPeakX - moveUp, hexagonPeakYTop - moveUp, hexagonLeftX/2 + hexagonPeakX/2 - fakeStroke - moveUp - humanFailure, hexagonUpperY/2 + hexagonPeakYTop/2  - fakeStroke - triDiff);
  
  
// upper right triangle
triangle(hexagonRightX, hexagonUpperY - fakeStroke, hexagonPeakX + moveUp, hexagonPeakYTop - moveUp, hexagonRightX/2 + hexagonPeakX/2 + fakeStroke + moveUp + humanFailure, hexagonUpperY/2 + hexagonPeakYTop/2 - fakeStroke - triDiff);
  
// lower right triangle
triangle(hexagonRightX, hexagonLowerY + fakeStroke, hexagonPeakX + moveUp, hexagonPeakYBottom + moveUp, hexagonRightX/2 + hexagonPeakX/2 + fakeStroke + moveUp + humanFailure, hexagonLowerY/2 + hexagonPeakYBottom/2 + fakeStroke + triDiff);
  
  
// lower left triangle
triangle(hexagonLeftX, hexagonLowerY + fakeStroke, hexagonPeakX - moveUp, hexagonPeakYBottom + moveUp, hexagonLeftX/2 + hexagonPeakX/2 - fakeStroke - moveUp - humanFailure, hexagonLowerY/2 + hexagonPeakYBottom/2 + fakeStroke + triDiff);



  // variables for top peak needle
 upperLeftTrianglePeakX = hexagonLeftX/2 + hexagonPeakX/2 - fakeStroke - moveUp - humanFailure;
 upperTrianglePeakY = hexagonUpperY/2 + hexagonPeakYTop/2  - fakeStroke - triDiff
 upperRightTrianglePeakX = hexagonRightX/2 + hexagonPeakX/2 + fakeStroke + moveUp + humanFailure
 
  
// variables for bottom peak needle
 lowerLeftTrianglePeakX = hexagonLeftX/2 + hexagonPeakX/2 - fakeStroke - moveUp - humanFailure
 lowerTrianglePeakY = hexagonLowerY/2 + hexagonPeakYBottom/2 + fakeStroke + triDiff
 lowerRightTrianglePeakX = hexagonRightX/2 + hexagonPeakX/2 + fakeStroke + moveUp + humanFailure
  
  
 // upper peak needle
beginShape();
 
  vertex(upperLeftTrianglePeakX + moveUp, upperTrianglePeakY - fakeStroke);
  vertex(hexagonPeakX, hexagonPeakYTop - fakeStroke * 2);
  vertex(upperRightTrianglePeakX - moveUp, upperTrianglePeakY - fakeStroke);
  vertex(hexagonPeakX, ellipseGap);
  
endShape();
  
// lower peak needle
beginShape();
  
  vertex(lowerLeftTrianglePeakX + moveUp, lowerTrianglePeakY + fakeStroke);
  vertex(hexagonPeakX, hexagonPeakYBottom + fakeStroke * 2);
  vertex(lowerRightTrianglePeakX - moveUp, lowerTrianglePeakY + fakeStroke)
  vertex(hexagonPeakX, hexagonPeakYBottom + fakeStroke * 2 + needleLength);
  
endShape();
  

// variables for upper left needle
  leftmostTrianglePeakX = hexagonLeftX - fakeStroke - triDiff;
  sideTrianglePeakY = hexagonUpperY / 2 + hexagonLowerY / 2;

// upper left needle
beginShape();
  
vertex(upperLeftTrianglePeakX - fakeStroke, upperTrianglePeakY);
vertex(hexagonLeftX - fakeStroke, hexagonUpperY - moveUp);
vertex(leftmostTrianglePeakX - moveUp, sideTrianglePeakY - fakeStroke);
vertex(upperLeftTrianglePeakX - fakeStroke - needleLength, upperTrianglePeakY);

endShape();
  
// variables for upper right needle
  rightmostTrianglePeakX = hexagonRightX + fakeStroke + triDiff

// upper right needle
beginShape(); 
vertex(upperRightTrianglePeakX + fakeStroke, upperTrianglePeakY);
vertex(hexagonRightX + fakeStroke, hexagonUpperY - moveUp);
vertex(rightmostTrianglePeakX + moveUp, sideTrianglePeakY - fakeStroke);  
vertex(upperRightTrianglePeakX + fakeStroke + needleLength, upperTrianglePeakY);
  
endShape();  
  
// lower right needle
beginShape();
  
vertex(lowerRightTrianglePeakX + fakeStroke, lowerTrianglePeakY);
vertex(hexagonRightX + fakeStroke, hexagonLowerY + moveUp)
vertex(rightmostTrianglePeakX + moveUp, sideTrianglePeakY + fakeStroke);
vertex(lowerRightTrianglePeakX + fakeStroke + needleLength, lowerTrianglePeakY);
  
endShape();
  
// lower left needle
beginShape();
  
vertex(lowerLeftTrianglePeakX - fakeStroke, lowerTrianglePeakY);
vertex(hexagonLeftX - fakeStroke, hexagonLowerY + moveUp);
vertex(leftmostTrianglePeakX - moveUp, sideTrianglePeakY + fakeStroke);
vertex(lowerLeftTrianglePeakX - fakeStroke - needleLength, lowerTrianglePeakY);

endShape();

  let ellipseX = random(hexagonPeakX, hexagonPeakX + 2);
  let ellipseY = random(hexagonPeakYTop / 2 + hexagonPeakYBottom / 2, hexagonPeakYTop / 2 + hexagonPeakYBottom / 2 + 2);
  
 noStroke();
 fill(0, 0, 0);
  
  dropShadow(0, 15, 50, 'black');
  ellipse(ellipseX, ellipseY, ellipseSize);
  
  dropShadow(0, -15, 50, 'black'); 
  ellipse(ellipseX, ellipseY, ellipseSize);
  
  dropShadow(0, 15, 50, 'black');
  ellipse(ellipseX, ellipseY, ellipseSize);
  
  dropShadow(0, -15, 50, 'black');
  ellipse(ellipseX, ellipseY, ellipseSize);
  
  dropShadow(15, 0, 50, 'black');
  ellipse(ellipseX, ellipseY, ellipseSize);
  
  dropShadow(-15, 0, 50, 'black');
  ellipse(ellipseX, ellipseY, ellipseSize);  
}
