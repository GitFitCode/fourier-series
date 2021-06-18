let timeOrAngle = 0;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);

  // move viewport away from screen edge
  translate(200, 200);
  let radius = 100;

  stroke(255);
  noFill();
  // create empty main circle with diameter
  ellipse(0, 0, radius * 2);

  // instantaneous position for a point on main circle
  // calculated based on `timeOrAngle`
  // aka polar to cartesian transformation
  let x = radius * cos(timeOrAngle);
  let y = radius * sin(timeOrAngle);

  // draw a line from main circle center to the point(x,y)
  line(0, 0, x, y);

  timeOrAngle -= 0.01;
}
