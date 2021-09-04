const DEGREE = 3;

const points = [
  { x: 56, y: 264, name: 'p0'},
  { x: 106, y: 129, name: 'p1'},
  { x: 241, y: 126, name: 'p2'},
  { x: 321, y: 208, name: 'p3'},
];

const size = [600, 600];

let canvas;

let selectedPoint = 0;

function setup() {
  canvas = createCanvas(size[0], size[1]);
  canvas.mousePressed(onMousePressed);
  
  for (let i = points.length; i < DEGREE + 1; i++){
    points.push({ 
      x: random(0 + 30, size[0]-30), 
      y: random(0 + 30, size[1]-30), 
      name: 'p'+i 
    });
  }
}

function draw() {
  background(220);
  
  strokeWeight(0.9);
  textSize(16);
  fill(1);
  text(`Ponto selecionado: ${selectedPoint}`, 10, 20);
  
  points.map(point => drawPoint(point));
  for (let i = 0; i < points.length; i++){
    if (points[i+1])
      connectPoints(points[i], points[i+1]);
  }
  
  drawBezier(points);
}

function drawBezier(_points) {
  const drawPoints = customBezier(_points);
  noFill();
  stroke(1);
  strokeWeight(2);
  beginShape();
  drawPoints.map(point => curveVertex(point.x, point.y));
  endShape();
}

function customBezier(_points){
  
  const n = _points.length -1;
  
  const b = (t) => {
    let x = 0;
    let y = 0;
    
    for (let i = 0; i <= n; i++){
      const scalar = C(n, i) * Math.pow(1-t, n-i) * Math.pow(t, i);
      const p = _points[i];
      
      x += p.x * scalar;
      y += p.y * scalar;
    }
    
    return {x, y};
  }
  
  const drawPoints = [b(0)];
  
  for (let t = 0; t <= 1; t += 0.01){
    const newPoint = b(t);
    drawPoints.push(newPoint);
  }
  
  return drawPoints;
}

function drawPoint(p) {
  stroke('black'); // Change the color
  strokeWeight(10); // Make the points 10 pixels in 
  point(p.x, p.y);
  
  strokeWeight(0.7);
  textSize(16);
  text(p.name, p.x - 5, p.y + 20);
}

function connectPoints(p1, p2) {
  strokeWeight(0.7);
  line(p1.x, p1.y, p2.x, p2.y);
}

function onMousePressed() {
  const point = points[selectedPoint];
  
  point.x = mouseX;
  point.y = mouseY;
}

function keyTyped() {
  const n = parseInt(key);
  
  if (!isNaN(n) && n < points.length){
    selectedPoint = n;
  }
}

function C(n, k) {
	if ( (typeof n !== 'number') || (typeof k !== 'number') ) {
		return false;
	}
	var coeff = 1;
	for ( var x = n-k+1; x <= n; x++ ) coeff *= x;
	for ( x = 1; x <= k; x++ ) coeff /= x;
	return coeff;
}
