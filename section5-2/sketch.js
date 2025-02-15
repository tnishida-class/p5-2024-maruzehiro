// テキスト「関数を作る(1) 引数のある関数」
// 練習問題：星を描く関数を改造して正N角形を描画する関数を作ってみよう
function setup(){
  createCanvas(400, 100);
  background(200);
  fill(0, 51, 153); // changed from fill(0);
  crossmark(10, 10, 90, 90);
  ngmark(150, 50, 80);
  star(250, 50, 40);
  regularPolygon(7, 350, 50, 40) // n=7
}

function crossmark(x1, y1, x2, y2){
  line(x1, y1, x2, y2);
  line(x2, y1, x1, y2);
}

function ngmark(cx, cy, r){
  push();
  noFill();
  strokeWeight(r * 0.1);
  let d = sqrt(r * r / 8);
  ellipse(cx, cy, r);
  line(cx - d, cy - d, cx + d, cy + d);
  pop();
}

function star(cx, cy, r){
  beginShape();
  for(var i = 0; i < 5; i++){
    let theta = TWO_PI * i * 2 / 5 - HALF_PI;
    let x = cx + cos(theta) * r;
    let y = cy + sin(theta) * r;
    vertex(x,y);
  }
  endShape(CLOSE);
}

// ヒント：星を書く関数をほんの少し変えたらできます
function regularPolygon(n, cx, cy, r){
  beginShape();
  for(var i = 0; i < n; i++){
    let theta = PI * i * 2 / n; //source: https://www.scienceprimer.com/drawing-regular-polygons-javascript-canvas
    let x = cx + cos(theta) * r;
    let y = cy + sin(theta) * r;
    vertex(x,y);
  }
  endShape(CLOSE);
}// ^ basically Math.cos(i * 2 * Math.PI / numberOfSides) , and then sin one