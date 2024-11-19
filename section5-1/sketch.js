// テキスト「関数を使う」
// 練習問題：このプログラムを改造してEUの旗を描いてみよう
function setup(){
  createCanvas(300, 200);
  background(0, 51, 153);
  noStroke();
  for(let i = 0; i < 12; i++){
    let theta = TWO_PI * i / 12;
    let x = 150 + cos(theta) * 50; // originally 100 + cos(theta) * 50;
    let y = 100 + sin(theta) * 50; // originally 100 + sin(theta) * 50;
    fill(255, 204, 0);
    star(x, y, 10); //width=200 dakara, 200/20=10, so ganti width/20 with 10 only pun ok jaaa
  }
}

// ヒント：section5-2 にある star 関数をここにコピーして、 draw 内で ellipse の代わりに使おう
function star(cx, cy, r){
  beginShape();
  for(let i = 0; i < 5; i++){
    let theta = TWO_PI * i * 2 / 5 - HALF_PI;
    let x = cx + cos(theta) * r;
    let y = cy + sin(theta) * r;
    vertex(x,y);
  }
  endShape(CLOSE);
}