let theta = 0;
let squareWaveArray = []; // to store 'y' values of the generated square wave
let sawtoothWaveArray = []; // to store 'y' values of the generated sawtooth wave
let triangularWaveArray = []; // to store 'y' values of the generated triangular wave
let scaleFactor = 50; // factor to scale up circles
let precisionSliderText;
let precisionSlider; // user input slider for # of partial sums in fourier series
let speedSliderText;
let speedSlider; // user input slider for delta to be added to theta in fourier series (i.e. how quickly do we animate!)

function setup() {
  createCanvas(1024, 768);

  precisionSliderText = createDiv("Precision factor (1 to 100):");
  precisionSlider = createSlider(1, 100, 50, 1);

  speedSliderText = createDiv("Speed Factor (0.01 to 0.1):");
  speedSlider = createSlider(0.01, 0.1, 0.05, 0.01);
}

function draw() {
  background(0);

  text("Precision factor (1 to 100) = " + precisionSlider.value(), 10, 20);
  text("Theta = " + theta, 10, 40);
  text("Scale Factor = " + scaleFactor, 10, 60);
  text("Speed Factor (0.01 to 0.1) = " + speedSlider.value(), 10, 80);

  // move viewport away from screen edge
  // top-left corner always starts out as (0, 0)
  translate(200, 200);

  approximateSquareWave();

  translate(-200, 200);

  approximateSawtoothWave();

  translate(-200, 200);

  approximateTriangularWave();

  // decrement theta for anti-clockwise rotation
  // theta -= speedSlider.value();
  // increment theta for clockwise rotation
  theta += speedSlider.value();
}

function approximateSquareWave() {
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
    // draw an empty circle on the circumference of the previous circle
    // center of the very first circle is (0, 0)
    ellipse(prevPosX, prevPosY, radius * 2);

    // calculate instantaneous position for a point on current circle
    // calculated based on `theta`
    // aka polar to cartesian transformation
    posX += radius * cos(N * theta);
    posY += radius * sin(N * theta);

    stroke(255);
    // draw a line from current circle center (prevPosX, prevPosY) to the instantaneous point(posX, posY)
    line(prevPosX, prevPosY, posX, posY);
  }

  // add calculated posY to the front of squareWaveArray[]
  squareWaveArray.unshift(posY);

  // move the "wave" i.e. squareWaveArray[] 200px to the right side
  translate(200, 0);
  // add beginShape() and endShape() to fill in the gaps between the points plotted
  beginShape();
  noFill();
  // plot all posY's in squareWaveArray[]
  for (i = 0; i < squareWaveArray.length; i++) vertex(i, squareWaveArray[i]);
  endShape();

  //draw a line from the filled circle to the start of the "wave" i.e. squareWaveArray[]
  line(posX - 200, posY, 0, squareWaveArray[0]);

  // clean squareWaveArray[] if it gets too big
  if (squareWaveArray.length >= 500) squareWaveArray.pop();
}

function approximateSawtoothWave() {
  // posX and posY set to 0 to draw first circle
  let posX = 0;
  let posY = 0;

  for (i = 0; i < precisionSlider.value(); i++) {
    let prevPosX = posX;
    let prevPosY = posY;

    let N = i + 1;

    // calculate radius for the circle to be drawn; scaled by 3 times additionally
    let radius = 3 * scaleFactor * (1 / (N * PI));

    stroke(255, 100);
    noFill();
    // draw an empty circle on the circumference of the previous circle
    // center of the very first circle is (0, 0)
    ellipse(prevPosX, prevPosY, radius * 2);

    // calculate instantaneous position for a point on current circle
    // calculated based on `theta`
    // aka polar to cartesian transformation
    posX += radius * cos(N * theta);
    posY += radius * sin(N * theta);

    stroke(255);
    // draw a line from current circle center (prevPosX, prevPosY) to the instantaneous point(posX, posY)
    line(prevPosX, prevPosY, posX, posY);
  }

  // add calculated posY to the front of sawtoothWaveArray[] and factor in the remaining 1/2
  sawtoothWaveArray.unshift(0.5 - posY);

  // move the "wave" i.e. sawtoothWaveArray[] 200px to the right side
  translate(200, 0);
  // add beginShape() and endShape() to fill in the gaps between the points plotted
  beginShape();
  noFill();
  // plot all posY's in sawtoothWaveArray[]
  for (i = 0; i < sawtoothWaveArray.length; i++)
    vertex(i, sawtoothWaveArray[i]);
  endShape();

  //draw a line from the filled circle to the start of the "wave" i.e. sawtoothWaveArray[]
  line(posX - 200, posY, 0, sawtoothWaveArray[0]);

  // clean sawtoothWaveArray[] if it gets too big
  if (sawtoothWaveArray.length >= 500) sawtoothWaveArray.pop();
}

function approximateTriangularWave() {
  // posX and posY set to 0 to draw first circle
  let posX = 0;
  let posY = 0;

  for (i = 0; i < precisionSlider.value(); i++) {
    let prevPosX = posX;
    let prevPosY = posY;

    // calculuate successive odd numbers
    let N = i * 2 + 1;

    // calculate radius for the circle to be drawn; scaled by 1.5 times additonally
    let radius =
      1.5 * scaleFactor * ((8 * pow(-1, (N - 1) / 2)) / (N * N * PI * PI));

    stroke(255, 100);
    noFill();
    // draw an empty circle on the circumference of the previous circle
    // center of the very first circle is (0, 0)
    ellipse(prevPosX, prevPosY, radius * 2);

    // calculate instantaneous position for a point on current circle
    // calculated based on `theta`
    // aka polar to cartesian transformation
    posX += radius * cos(N * theta);
    posY += radius * sin(N * theta);

    stroke(255);
    // draw a line from current circle center (prevPosX, prevPosY) to the instantaneous point(posX, posY)
    line(prevPosX, prevPosY, posX, posY);
  }

  // add calculated posY to the front of triangularWaveArray[]
  triangularWaveArray.unshift(posY);

  // move the "wave" i.e. triangularWaveArray[] 200px to the right side
  translate(200, 0);
  // add beginShape() and endShape() to fill in the gaps between the points plotted
  beginShape();
  noFill();
  // plot all posY's in triangularWaveArray[]
  for (i = 0; i < triangularWaveArray.length; i++)
    vertex(i, triangularWaveArray[i]);
  endShape();

  //draw a line from the filled circle to the start of the "wave" i.e. triangularWaveArray[]
  line(posX - 200, posY, 0, triangularWaveArray[0]);

  // clean triangularWaveArray[] if it gets too big
  if (triangularWaveArray.length >= 500) triangularWaveArray.pop();
}
