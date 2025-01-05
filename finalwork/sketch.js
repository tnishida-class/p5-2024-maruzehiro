let shapes = [];
let grabbed;
let kinshipCodes = ["MM", "MF", "FF", "FM", "BW", "ZH", "BWF", "BWM", "BS", "BD", "ZHF", "ZHM", "ZS", "ZD", "BWFB", "BWMZ", "BWFZ", "BWMB", "ZHMM", "ZHZ", "ZHB", "ZHFBD", "BWMZS"]; // Example kinship codes
let currentQuestion = "";

function setup() {
  createCanvas(1300, 390);
  generateQuestion();
}

function generateQuestion() {
  currentQuestion = random(kinshipCodes);
  document.getElementById('question').innerText = `スペースキーでスタート！出てくる白い▢は自分('ego')。
  △(「T」キー)は男性、〇(「C」キー)は女性。それぞれ押したら作成。
  「/」キーは垂直線、「-」 キーは水平線を作成。
  
  親族関係の記号
  F = 父 , M = 母
  B = 兄弟 , Z = 姉妹
  S = 息子 , D = 娘
  H = 夫 , W = 妻

  この親族関係を表す系図を作成してください: ${currentQuestion}`;
  clearCanvas();
}

function draw() {
  background(160, 192, 255);
  shapes.forEach(shape => {
    drawShape(shape);
  });
}

function drawShape(shape) {
  fill(shape.color);
  stroke(0);
  if (shape.type === 'circle') {
    ellipse(shape.x, shape.y, shape.size * 2);
  } else if (shape.type === 'square') {
    rect(shape.x - shape.size, shape.y - shape.size, shape.size * 2, shape.size * 2);
  } else if (shape.type === 'triangle') {
    triangle(
      shape.x, shape.y - shape.size,
      shape.x - shape.size, shape.y + shape.size,
      shape.x + shape.size, shape.y + shape.size
    );
  } else if (shape.type === 'verticalLine') {
    stroke(shape.color);
    strokeWeight(10);
    line(shape.x, shape.y - shape.length / 2, shape.x, shape.y + shape.length / 2);
  } else if (shape.type === 'horizontalLine') {
    stroke(shape.color);
    strokeWeight(10);
    line(shape.x - shape.length / 2, shape.y, shape.x + shape.length / 2, shape.y);
  }
}

function keyPressed() {
  if (key === 'c' || key === 'C') {
    let circle = {
      type: 'circle',
      x: mouseX,
      y: mouseY,
      size: 30,
      color: 'pink'
    };
    shapes.push(circle);
  } else if (key === 't' || key === 'T') {
    let triangle = {
      type: 'triangle',
      x: mouseX,
      y: mouseY,
      size: 30,
      color: 'blue'
    };
    shapes.push(triangle);
  } else if (key === ' ') {
    // Check if a white square already exists
    let squareExists = shapes.some(shape => shape.type === 'square' && shape.color === 'white');
    if (!squareExists) {
      let square = {
        type: 'square',
        x: width / 2,
        y: height / 2,
        size: 30,
        color: 'white'
      };
      shapes.push(square);
    }
  } else if (key === '/') {
    let verticalLine = {
      type: 'verticalLine', 
      x: mouseX, 
      y: mouseY, 
      length: 50, 
      color: 'black' 
    };
    shapes.push(verticalLine);
  } else if (key === '-') {
    let horizontalLine = {
      type: 'horizontalLine', 
      x: mouseX, 
      y: mouseY, 
      length: 100, 
      color: 'black'
    };
    shapes.push(horizontalLine);
  }
}

function mousePressed() {
  grabbedShape = shapes.find(shape => shapeContainsMouse(shape, mouseX, mouseY));
  if (grabbedShape) {
    grabbedShape.grabbed = true;
  }
}

function mouseDragged() {
  if (grabbedShape && grabbedShape.grabbed) {
    grabbedShape.x = mouseX;
    grabbedShape.y = mouseY;
  }
}

function mouseReleased() {
  if (grabbedShape) {
    grabbedShape.grabbed = false;
    grabbedShape = null;
  }
}

function shapeContainsMouse(shape, mx, my) {
  if (shape.type === 'circle') {
    return dist(mx, my, shape.x, shape.y) < shape.size;
  } else if (shape.type === 'square') {
    return mx > shape.x - shape.size && mx < shape.x + shape.size &&
           my > shape.y - shape.size && my < shape.y + shape.size;
  } else if (shape.type === 'triangle') {
    let d1 = sign(mx, my, shape.x, shape.y - shape.size, shape.x - shape.size, shape.y + shape.size);
    let d2 = sign(mx, my, shape.x - shape.size, shape.y + shape.size, shape.x + shape.size, shape.y + shape.size);
    let d3 = sign(mx, my, shape.x + shape.size, shape.y + shape.size, shape.x, shape.y - shape.size);
    let hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
    let hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);
    return !(hasNeg && hasPos);
  } else if (shape.type === 'verticalLine') {
    return mx > shape.x - 10 && mx < shape.x + 10 && my > shape.y - shape.length / 2 && my < shape.y + shape.length / 2;
  } else if (shape.type === 'horizontalLine') {
    return mx > shape.x - shape.length / 2 && mx < shape.x + shape.length / 2 && my > shape.y - 10 && my < shape.y + 10;
  }
  return false;
}

function sign(x1, y1, x2, y2, x3, y3) {
  return (x1 - x3) * (y2 - y3) - (x2 - x3) * (y1 - y3);
}

function clearCanvas() {
  shapes = [];
}
