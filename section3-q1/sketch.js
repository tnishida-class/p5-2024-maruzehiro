// 練習問題「心臓の鼓動のように大きくなったり小さくなったりする円」
let size = 50; // memula ni takde langsung
let count = 0; // memula ni takde = 0
let cycle = 100; // memula ni takde =100
let increment = 1; // memula ni takde langsung

function setup(){
  createCanvas(200, 200);
  count = 0; //xde kat progtouch
  cycle = 100; //xde kat progtouch
}

function draw(){
  background(160, 192, 255);
  count = (count + increment) % cycle; // memula count + 1, now count + increment
  if (keyIsPressed) {
    increment = 10; //memula =2
  }else{
    increment = 1;
  }
  if (count < cycle/2) {
    size = count + 50;
  }else{
    size = (cycle - count) + 50;
  }
  ellipse(width / 2, height / 2, size);
}


//memula = kalau tekan key, xde perubahan
//now = kalau tekan key, dia makin laju