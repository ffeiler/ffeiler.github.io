class Shape {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ls = LINE_SEGMENTS;
    this.d_ls = DOTTED_LINE_SEGMENTS;
    this.sW = boolRandom() ? 2 : 2;
    this.palette = PALETTE;
    this.sC = multiRandom(this.palette);
    this.layers = []
    // this.numSym = boolRandom() ? 3 : 6;
    this.angle = 360/this.numSym;
  }
  render () {

    strokeWeight(this.sW);
    stroke(this.sC);

    push();
      noFill();
      translate(this.x, this.y);

      const a = Math.random(1);
      const b = Math.random(1);
      const c = Math.random(1);
      const d = Math.random(1);
      const e = Math.random(1);

      if (e < 0.33) {
        hexagon(0, 0, RADIUS);
      } else if (e < 0.66){
        ellipse(0,0,CRYSTAL_SIZE,CRYSTAL_SIZE);
      } else {
        (new SteppedHexagons()).render();
      }


      if (a < 0.3) { (new FilledShape()).render() }
        else if (a > 0.7) { (new RingOfShapes()).render() };


      if (b < 0.4) { (new LineSegments()).render() }
        else if (a > 0.4) { (new DottedLines()).render() };

      if ((c < 0.2) || ((a > 0.3) && (a < 0.7) && (b > 0.4))) { (new Circles()).render() };

      // (new TestLines(this.x, this.y)).render();
    pop();
  }
}

class FilledShape extends Shape {
  constructor() {
    super();
    this.numSym =  boolRandom() ? SIDES : 2*SIDES;
    this.angle = 360 / this.numSym;
    this.line_length = RADIUS/this.ls;
    this.max = rndInt(1,this.ls-1);
    this.selector = Math.random(1);
  }
  render() {

    stroke(this.sC);
    strokeWeight(this.sW);
    fill(this.sC);

    if (this.selector < 0.33) {
      // TODO: rectangle isn't exactly centered
      rect(0,0,-this.max*this.line_length,this.max*this.line_length);
    } else if (this.selector < 0.66) {
      ellipse(0,0,-this.max*this.line_length,this.max*this.line_length);
    } else {
      hexagon(0,0,this.max*this.line_length);
    }
  }
}

class Circles extends Shape {
  constructor() {
    super()
    this.l_sW = 1.5; // this.palette[2];
    this.numSym = boolRandom() ? 3 : 6;
    this.angle = 360 / this.numSym;
    this.radius = rndInt(1,4) * RADIUS * (1/this.ls);
    this.center = RADIUS * (boolRandom() ? 1/1.3 : 1/3);
  }
  render() {
    noFill();
    strokeWeight(this.l_sW)
    stroke(this.sC)
    for (var i = 0; i < this.numSym; i++) {
      if (this.radius < this.center) { this.radius = this.center; };
      if ((this.radius + this.center) > RADIUS) { this.radius = RADIUS - this.center; };
      ellipse(this.center,0,this.radius,this.radius);
      rotate(this.angle);
    }
  }
}

class LineSegments extends Shape {
  constructor() {
    super()
    this.l_sW = 1; //this.palette[2];
    this.numSym =  boolRandom() ? SIDES : 2*SIDES;
    this.angle = 360 / this.numSym;
    this.line_length = RADIUS/this.ls;
    this.minmax = [rndInt(1,this.ls),rndInt(1,this.ls)].sort();
  }
  render() {
    stroke(this.sC);
    strokeWeight(this.l_sW);
    for (var i = 0; i < this.numSym; i++) {
      line(this.minmax[0]*this.line_length,0,this.minmax[1]*this.line_length,0);
      rotate(this.angle);
    }
  }
}

class DottedLines extends Shape {
  constructor () {
    super()
    this.numSym = boolRandom() ? SIDES : 2*SIDES;
    this.angle = 360 / this.numSym;
    this.shapeSize = 1.5;
    this.centerOffset = this.d_ls;
    this.line_length = RADIUS/this.ls;
  }

  render () {
    fill(this.sC);
    noStroke();

    push()
      for (let i = 0; i <= this.numSym; i++) {
        for (let x = this.centerOffset; x < RADIUS; x += this.line_length) {
          rect(x, 0, this.shapeSize, this.shapeSize);
        }
        rotate(this.angle);
      }
    pop()
  }
}

class RingOfShapes extends Shape {
  constructor () {
    super();
    this.numSym = boolRandom() ? 3 : 6;
    this.angle = 360 / this.numSym;
    this.center = RADIUS * Math.random(1);
    this.radius = this.center/1.5;
  }

  render () {
    stroke(this.sC)
    fill(this.sC)
    strokeWeight(this.sW)
    push()

    let a = Math.random(1);
    if ((this.radius - this.center) < 0) { this.radius = this.radius/2; };
    if ((this.radius + this.center) > RADIUS) { this.radius = RADIUS - this.center; };

      for (let i = 0; i < this.numSym; i++) {
        if (a < 0.33) {
          ellipse(this.center, 0, this.radius, this.radius);
        } else if (a >= 0.66) {
          rect(this.center, 0, this.radius, this.radius);
        } else {
          custom_triangle(this.center, this.radius, boolRandom());
        }

        rotate(this.angle);
      }
    pop()
  }
}


class SteppedHexagons extends Shape {
  constructor () {
    super();
    this.numSteps = boolRandom() ? 3 : 5;
    this.centerOffset = RADIUS * 0.15;
    this.singleStep = ((RADIUS) - this.centerOffset) / this.numSteps;
  }

  render () {
    stroke(this.sC)
    noFill()
    strokeWeight(this.sW)
    push()
      translate(width / 2, height / 2)
      rotate(this.angle / 2)
      for (let i = 1; i < this.numSteps + 1; i++) {
        hexagon(0, 0, this.centerOffset + (i * this.singleStep))
      }
    pop()
  }
}

// TEST LINES
class TestLines {
  constructor (x, y) {
    this.numSym = 2*SIDES;
    this.angle = 360 / this.numSym;
    this.sW = TEST_LINES_SW;
    this.sC = 'black';
    this.x = x;
    this.y = y;
  }
  render () {
    push();
      noFill();
      stroke(this.sC);
      strokeWeight(this.sW);

      ellipse(0,0,CRYSTAL_SIZE,CRYSTAL_SIZE);
      stroke(this.sC);

      for (var i = 0; i < this.numSym; i++) {
        line(0,0,CRYSTAL_SIZE/2,0);
        rotate(this.angle);
      }
    pop();
  }

}


// this.layers.push(new Lines())
