// テキスト「関数を作る(2) 結果を戻す関数」～「総仕上げ：カレンダーを描画しよう」
function setup(){
  createCanvas(200, 200);
  calendar(2025, 2);

  // isLeapYear の動作確認のため console に出力しています
  for(let i = 2000; i <= 2100; i++){
    if(isLeapYear(i)){
      console.log(i + "年はうるう年です");
    }
    else{
      console.log(i + "年はうるう年ではありません");
    }
  }
}

function calendar(y, m){
  background(255);
  textSize(16);
  textAlign(CENTER, CENTER);

  // Draw the header: days of the week
  const dayLabels = ["日", "月", "火", "水", "木", "金", "土"];
  for (let i = 0; i < 7; i++) {
    text(dayLabels[i], 25 + i * 25, 20); // Draw day names
  }
  let dow = dayOfWeek(y, m, 1);
  let x = dow; // X position based on the starting day of the week
  let yRow = 1; // Y position starts below headers

  for(let d = 1; d <= daysInMonth(y, m); d++){
    // BLANK[3] (hint: まずは daysInYear, dayOfWeek を作ろう)↓
    text(d, 25 + x * 25, 40 + yRow * 25); // Display day at calculated position

    x++;
    if (x == 7) { // Wrap to next row after Saturday
      x = 0;
      yRow++;
    }
  }
}

function isLeapYear(y){
  return (y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0);
}

function daysInYear(y){
  // BLANK[1]↓
  if(y == i){
    return isLeapYear(y) ? 366 : 365;
  }
}

function daysInMonth(y, m){
  if(m == 2){
    return isLeapYear(y) ? 29 : 28;
  }
  else if(m == 4 || m == 6 || m == 9 || m == 11){
    return 30;
  }
  else{
    return 31;
  }
}

function dayOfYear(y, m, d){
  let count = 0; 
  for(let i = 1; i < m; i++){
    count += daysInMonth(y, i);
  }
  return count + d;
}

function dayOfWeek(y, m, d){
  // BLANK[2]↓ // 結果は0(=日曜日), 1(=月曜日), ... 6(=土曜日)としましょう。
  // ヒント：曜日がわかっている基準日を1つ決めて、その基準日からの日数を7で割った余りを計算する方針で作れます。
   // Reference date: 1970-01-01 (Thursday, day code 4)
  const referenceYear = 1970;
  const referenceDayOfWeek = 4; // Thursday

  // Step 1: Calculate the total days difference
  let totalDays = 0;

  // Add days for full years between the reference year and the given year
  for (let year = referenceYear; year < y; year++) {
    totalDays += isLeapYear(year) ? 366 : 365;
  }

  // Add days for full months in the given year
  for (let month = 1; month < m; month++) {
    totalDays += daysInMonth(y, month);
  }

  // Add remaining days in the current month
  totalDays += d - 1;

  // Step 2: Calculate the weekday using modulo 7
  return (referenceDayOfWeek + totalDays) % 7;
}


function dayOfWeekAsString(dow){
  const a = ["日", "月", "火", "水", "木", "金", "土", "日"];
  return a[dow];
}
