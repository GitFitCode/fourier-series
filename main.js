let timeOrAngle = 0;
let yPositions = [];

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
  let posX = radius * cos(timeOrAngle);
  let posY = radius * sin(timeOrAngle);

  // add calculated posY to the front of yPositions[]
  yPositions.unshift(posY);

  // draw a line from main circle center to the point(x,y)
  line(0, 0, posX, posY);

  fill(255);
  // draw a filled circle at the intersection of radius line and circumference
  ellipse(posX, posY, 10);

  // move the "wave" aka yPositions[] a bit to the right side
  translate(200, 0);
  // add beginShape() and endShape() to fill in the gaps between the points plotted
  beginShape();
  noFill();
  // plot all posY's in yPositions[]
  for (i = 0; i < yPositions.length; i++) vertex(i, yPositions[i]);
  endShape();

  //draw a line from the filled circle to the start of the "wave" i.e. yPositions[]
  line(posX - 200, posY, 0, yPositions[0]);

  // decrement timeOrAngle for anti-clockwise rotation
  // increment timeOrAngle for clockwise rotation
  timeOrAngle -= 0.05;

  // clean yPostions[] if it gets too bit
  if (yPositions.length >= 500) yPositions.pop();
}
