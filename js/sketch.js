const CRYSTAL_SIZE = 200;
const SIDES = 6;
// const ANGLE = 360/SIDES;
let PALETTE = [];

function setup() {
  createCanvas(windowWidth-20, windowHeight-100, SVG);
  noLoop();
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
  for (var i = 0; i < 4; i++) {
    // testLines(CRYSTAL_SIZE/1.5,CRYSTAL_SIZE/2+i*height/5);
    outlineShape(CRYSTAL_SIZE*0.7,CRYSTAL_SIZE/2+10+i*(CRYSTAL_SIZE+10));
  }
}


// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function outlineShape(x, y) {
  const strokeCol = multiRandom(PALETTE);
  const weight = boolRandom() ? 1 : 3;
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
  const strokeCol = multiRandom(PALETTE);

  push();
    noFill();
    stroke('black');
    translate(x, y);

    ellipse(0,0,CRYSTAL_SIZE,CRYSTAL_SIZE);
    stroke(strokeCol);

    const angle = 360/numSym;
    for (var i = 0; i < numSym; i++) {
      line(0,0,CRYSTAL_SIZE/2,0);
      rotate(angle);
    }
  pop();
}

function boolRandom() {
  const rand = random(1);
  if (rand > 0.5) {
    return true;
  } else {
    return false;
  }
}

function multiRandom(arr) {
  return arr[floor(random(0,arr.length))];
}
