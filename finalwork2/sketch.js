let ellipses = [];

const g = 0.3; 
const vyMax = 20;
const columns = 16;
const rows = 7; 

function setup(){
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let ellipseObj = {
        m: 40,
        x: 150 + i * 75, 
        y: 150 + j * 75, 
        vx: 2,
        vy: 2,
        grabbed: false,
        mouseActive: true, // Individual mouse active state
        balls: [],
        ballsCreated: false
      };
      ellipses.push(ellipseObj);
    }
  }
}

function mousePressed(){
  for (let i = 0; i < ellipses.length; i++) {
    let e = ellipses[i];
    e.grabbed = dist(mouseX, mouseY, e.x, e.y) < 30; 
  }
}

function draw(){
  background(5, 39, 94); 
  stroke(0); 
  strokeWeight(1.5); 

  fill(131, 137, 160);
  rect(50, 50, 1320, 640,20); 
  fill(159, 165, 187);
  rect(80, 80, 1260, 580, 20);

  fill(255);
  textSize(100);
  textFont("serif");
  text("BUBBLEWRAP!", 68, 100);

  for (let i = 0; i < ellipses.length; i++) {
    let e = ellipses[i];
    ellipse(e.x, e.y, e.m);
    
    if(mouseIsPressed && e.mouseActive && e.grabbed){
      e.m += 0.5;
    }
    
    if(e.m >= 60 && !e.ballsCreated){
      e.m = 5;
      e.mouseActive = false; // Disable mouseIsPressed effect for this ellipse
      createBalls(e); // Create balls once for this ellipse
      e.ballsCreated = true; // Ensure balls are created only once
    }

    // Update and draw each ball in the array for this ellipse
    for(let j = 0; j < e.balls.length; j++){
      let ball = e.balls[j];
      ellipse(ball.x, ball.y, 10);
      ball.x += ball.vx;
      ball.y += ball.vy;
      ball.vy += g;
    }
  }
}

function createBalls(e) {
  for(let i = 0; i < 8; i++){
    let ball = {
      x: e.x,
      y: e.y,
      vx: random(-2, 2),
      vy: random(-2, 2)
    };
    e.balls.push(ball);
  }
}

function keyPressed(){
  if(key == " "){
    for (let i = 0; i < ellipses.length; i++) {
      let e = ellipses[i];
      e.m = 40;
      e.grabbed = false;
      e.mouseActive = true; // Reactivate mouse for this ellipse
      e.balls = []; // Clear the array
      e.ballsCreated = false; // Allow balls to be created again
    }
  }
}
