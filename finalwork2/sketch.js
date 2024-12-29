let s = 70;
let balls = []; // 配列を用意して
let b1 = { x: 50, y: 50, vx: 3, vy: 0, size: 10 }; // ボール１のオブジェクトを作って
balls.push(b1); // 配列に追加
let b2 = { x: 40, y: 40, vx: 0, vy: 3, size: 20 }; // ボール２のオブジェクトを作って
balls.push(b2); // またもや配列に追加


function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas that fills the window
}

function draw() {
  background(160, 192, 255); // Set the background color
  
  fill(225); // Set the fill color to blue
  stroke(0); // Set the stroke color to red
  strokeWeight(2); // Set the stroke weight

  rect(50, 50, 500, 500); // Draw a rectangle at (50, 50) with width 200 and height 100
  rect(80, 80, 450, 450);
  ellipse(175,175, s)
  ellipse(300,175, s)
  ellipse(425,175, s)
  ellipse(175,300, s)
  ellipse(300,300, s)
  ellipse(425,300, s)
  ellipse(175,425, s)
  ellipse(300,425, s)
  ellipse(425,425, s)
}

function keyPressed(){
  if(key == " "){s = s+5} 
  if(s>100){s=20 || popballs}
  else if(keyCode == ESCAPE){s=70}
}
  
function popballs(){}
  