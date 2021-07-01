let theta = 0;
let waveArray = []; // to store 'y' values of the generated wave
let scaleFactor = 75; // factor to scale up circles
let precisionSliderText;
let precisionSlider; // user input slider for # of partial sums in fourier series
let speedSliderText;
let speedSlider; // user input slider for delta to be added to theta in fourier series (i.e. how quickly do we animate!)

function setup() {
  createCanvas(800, 600);

  precisionSliderText = createDiv("N (precision factor) (1 to 100):");
  precisionSlider = createSlider(1, 100, 50, 1);

  speedSliderText = createDiv("Speed Factor (0.01 to 0.1):");
  speedSlider = createSlider(0.01, 0.1, 0.05, 0.01);
}

function draw() {
  background(0);

  text("N (precision factor) = " + precisionSlider.value(), 10, 20);
  text("Theta = " + theta, 10, 40);
  text("Scale Factor = " + scaleFactor, 10, 60);
  text("Speed Factor = " + speedSlider.value(), 10, 80);

  // move viewport away from screen edge
  // top-left corner always starts out as (0,0)
  translate(200, 200);

  // posX and posY set to 0 to draw first circle
  let posX = 0;
  let posY = 0;

  for (i = 0; i < precisionSlider.value(); i++) {
    let prevPosX = posX;
    let prevPosY = posY;

    // calculuate successive odd numbers
    let N = i * 2 + 1;

    // calculate radius for the circle to be drawn
    let radius = scaleFactor * (4 / (N * PI));

    stroke(255, 100);
    noFill();
    // create an empty circle on the circumference of the previous circle
    // center of the very first circle is (0,0)
    ellipse(prevPosX, prevPosY, radius * 2);

    // calculate instantaneous position for a point on current circle
    // calculated based on `theta`
    // aka polar to cartesian transformation
    posX += radius * cos(N * theta);
    posY += radius * sin(N * theta);

    stroke(255);
    // draw a line from current circle center (prevPosX, prevPosY) to the instantaneous point(posX,posY)
    line(prevPosX, prevPosY, posX, posY);
  }

  // add calculated posY to the front of waveArray[]
  waveArray.unshift(posY);

  // move the "wave" i.e. waveArray[] 200px to the right side
  translate(200, 0);
  // add beginShape() and endShape() to fill in the gaps between the points plotted
  beginShape();
  noFill();
  // plot all posY's in waveArray[]
  for (i = 0; i < waveArray.length; i++) vertex(i, waveArray[i]);
  endShape();

  //draw a line from the filled circle to the start of the "wave" i.e. waveArray[]
  line(posX - 200, posY, 0, waveArray[0]);

  // decrement theta for anti-clockwise rotation
  // theta -= speedSlider.value();
  // increment theta for clockwise rotation
  theta += speedSlider.value();

  // clean waveArray[] if it gets too big
  if (waveArray.length >= 500) waveArray.pop();
}
