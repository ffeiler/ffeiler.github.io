const CRYSTAL_SIZE = 75;
const SIDES = 6;
const ROWS = 5;
var COLS = 3;
let PALETTE = [];
var LOOP = false;
var FPS = .5;

function setup() {
  createCanvas(windowWidth-20, windowHeight-89, SVG);
  if (!LOOP) {
    noLoop();
  }
  angleMode(DEGREES);
  rectMode(CENTER);
  // background('red');
  PALETTE = [
    color(255, 52, 154), // pink
    color(4, 0, 152), // blue
    'limegreen'
  ]
}

function draw() {
  background('rgba(0, 0, 0, 0)');
  if (LOOP) {
    frameRate(FPS);
  }

  for (var i = 0; i < floor((height)/CRYSTAL_SIZE); i++) {
    for (var j = 0; j < floor((width)/CRYSTAL_SIZE); j++) {
      testLines(CRYSTAL_SIZE*(0.6+j*1.1), 55 + i*(CRYSTAL_SIZE+10));
      outlineShape(CRYSTAL_SIZE*(0.6+j*1.1), 55 + i*(CRYSTAL_SIZE+10));
    }
  }
}

function mouseClicked() {
  redraw();
 }
//
function windowResized() {
  resizeCanvas(windowWidth-20, windowHeight-89, SVG);
  redraw();
}



function outlineShape(x, y) {
  const strokeCol = multiRandom(PALETTE);
  const weight = boolRandom() ? 1 : 4;
  const b_hex = boolRandom();

  stroke(strokeCol);
  strokeWeight(weight);

  push();
    noFill();
    translate(x, y);
    if (b_hex) {
      getHexagonShape(0, 0, CRYSTAL_SIZE / 2)
    } else {
      ellipse(0,0,CRYSTAL_SIZE,CRYSTAL_SIZE);
    }
  pop();
}

// TEST LINES

function testLines(x, y) {
  let numSym = boolRandom() ? SIDES : 2*SIDES; // ternary operator
  // const strokeCol = multiRandom(PALETTE);

  push();
    noFill();
    stroke('black');
    strokeWeight(0.05);
    translate(x, y);

    ellipse(0,0,CRYSTAL_SIZE,CRYSTAL_SIZE);
    stroke('black');

    const angle = 360/numSym;
    for (var i = 0; i < numSym; i++) {
      line(0,0,CRYSTAL_SIZE/2,0);
      rotate(angle);
    }
  pop();
}
