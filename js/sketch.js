const CRYSTAL_SIZE = 75;
const RADIUS = CRYSTAL_SIZE/2;
const SIDES = 6;

let PALETTE = [];

var LOOP = false;
var FPS = .5;

const LINE_SEGMENTS = 5;
const DOTTED_LINE_SEGMENTS = 3;
const TEST_LINES_SW = 0.25;

function setup() {
  createCanvas(windowWidth, windowHeight-64, SVG);

  if (!LOOP) {
    noLoop();
  }
  angleMode(DEGREES);
  rectMode(CENTER);

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
    for (var j = 0; j < floor((width)/CRYSTAL_SIZE)+1; j++) {
      x = CRYSTAL_SIZE*((i%2 - 1)*0.6+j*1.3);
      y = CRYSTAL_SIZE*(0.733+i*1.2);

      const shape = new Shape(x, y);
      shape.render()
    }
  }
}


// REDRAW WHEN WINDOW CHANGES

function mouseClicked() { redraw() }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight-64, SVG);
  redraw();
}
