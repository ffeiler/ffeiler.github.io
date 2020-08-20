const CRYSTAL_SIZE = 75;
const RADIUS = CRYSTAL_SIZE/2;
const SIDES = 6;
const ROWS = 5;
var COLS = 3;
let PALETTE = [];
var LOOP = false;
var FPS = .5;
const LINE_SEGMENTS = 5;

function setup() {
  createCanvas(windowWidth-20, windowHeight-89, SVG);
  if (!LOOP) {
    noLoop();
  }
  angleMode(DEGREES);
  rectMode(CENTER);
  // background('red');
  PALETTE = [
    color(241, 12, 69), // palatable pinkish red
    color(49, 102, 138), // subtile ugly blue
    color(107, 124, 133) // cubic battleship grey
  ]
}

function draw() {
  background('rgba(0, 0, 0, 0)');
  if (LOOP) {
    frameRate(FPS);
  }

  // fill entire screen with shapes
  for (var i = 0; i < floor((height)/CRYSTAL_SIZE); i++) {
    for (var j = 0; j < floor((width)/CRYSTAL_SIZE); j++) {
      // testLines(CRYSTAL_SIZE*(0.6+j*1.2), 55 + i*(CRYSTAL_SIZE+20));
      outlineShape(CRYSTAL_SIZE*(0.6+j*1.2), 55 + i*(CRYSTAL_SIZE+20));
    }
  }
}

function mouseClicked() {
  redraw();
 }

function windowResized() {
  resizeCanvas(windowWidth-20, windowHeight-89, SVG);
  redraw();
}



function outlineShape(x, y) {
  const strokeCol = multiRandom(PALETTE);
  const weight = boolRandom() ? 2 : 4;

  stroke(strokeCol);
  strokeWeight(weight);

  push();
    noFill();
    translate(x, y);

    const bool_shape = boolRandom() ? getHexagonShape(0, 0, CRYSTAL_SIZE / 2) :
                       ellipse(0,0,CRYSTAL_SIZE,CRYSTAL_SIZE);
    const bool_lines = boolRandom() ? insideLines(ls=LINE_SEGMENTS) :
                       insideCircles(ls=LINE_SEGMENTS);


  pop();
}


function insideCircles(ls) {
  let numSym = boolRandom() ? 3 : 6;
  strokeWeight(1);
  stroke(PALETTE[2])

  const angle = 360/numSym;

  let circle_radius = rndInt(1,6);
  let circle_center = boolRandom() ? 2 : 4;
  let center = RADIUS / circle_center;
  let size = RADIUS / ls;

  for (var i = 0; i < numSym; i++) {
    ellipse(center,center,size*circle_radius,size*circle_radius);
    rotate(angle);
  }
}

// LINES
function insideLines(ls) {
  let numSym = boolRandom() ? SIDES : 2*SIDES;
  strokeWeight(1);
  stroke(PALETTE[2])
  const angle = 360/numSym;

  let line_length = RADIUS/ls;
  let minmax = [rndInt(1,ls),rndInt(1,ls)].sort();

  for (var i = 0; i < numSym; i++) {
    line(minmax[0]*line_length,0,minmax[1]*line_length,0);
    rotate(angle);
  }
}

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
