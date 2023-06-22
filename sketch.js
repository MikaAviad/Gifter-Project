let img;
let x = -200;
let movespeed = -6;
let font;
let numberFont;
let userTyping = '';
let countdown = 9233;
let countdownInterval;
let mic;
let circleSize;
let mouseOverImage = true;
//png and fonts
function preload() {
  img = loadImage('gifter.png');
  font = loadFont('LibreFranklin-Bold.ttf');
  numberFont = loadFont('LibreFranklin-ExtraLightItalic.ttf');
}

function setup() {
  createCanvas(700, 900, 'webgl');
  textFont(font);
  
  mic = new p5.AudioIn();
  mic.start();
  
  countdownInterval = setInterval(updateCountdown, 1000);
}

function draw() {
  background(0);
  //תזוזה של העיגולים במרכז דרך הקול
  let vol = mic.getLevel();
  circleSize = map(vol,0, 1, 0, 10000);
  
//שני העיגולים במרכז הפוסטר 
  push();
  translate(100 / -10, height / 100);
  noFill();
  stroke(255);
  strokeWeight(1);
  ellipse(0, 0, circleSize, 1000);
  pop();
  
  push();
  translate(100 / -10, height / 80);
  noFill();
  stroke(255);
  strokeWeight(1);
  ellipse(0, 0, circleSize, 300);
  pop();
  
  //כל הצורות התלת מימד שיצרתי
  push();
  translate(250, -350);
  rotateY(radians(frameCount));
  rotateX(radians(frameCount));
  noFill();
  stroke('#DCEAC9');
  strokeWeight(0.3);
  ellipsoid(30, 30);
  pop();

  push();
  translate(-260, -265);
  rotateY(radians(frameCount));
  rotateX(radians(frameCount));
  noFill();
  stroke('#ACC2FB');
  strokeWeight(0.3);
  torus(24, 12);
  pop();

  push();
  translate(-45, -200);
  rotateY(radians(frameCount));
  rotateX(radians(frameCount));
  noFill();
  stroke('#105C89');
  strokeWeight(0.5);
  cylinder(33, 8);
  pop();

  push();
  translate(-130, 330);
  rotateY(radians(frameCount));
  rotateX(radians(frameCount));
  noFill();
  stroke('#705DDE');
  strokeWeight(0.3);
  torus(18, 18);
  pop();
  
   push();
  translate(270, 405);
  rotateY(radians(frameCount));
  rotateX(radians(frameCount));
  noFill();
  stroke('#F3FC47');
  strokeWeight(0.4);
  cone(30, 30);
  pop();
  
  //מיקום הגיף של gifter
  image(img, x, height / 18 - img.height / 2);
  
//כל הטקסטים שמופיעים בפוסטר
  fill(255);
  textSize(80);
  textAlign(LEFT, TOP);
  text("HEY BURNER", -300, -400);

  textFont(numberFont);
  textSize(60);
  textAlign(CENTER, TOP);
  text("2023", width / -5, -300);

  textSize(50);
  textAlign(LEFT, TOP);
  text("switch gifts", width / -100, -230);

  textSize(50);
  textAlign(CENTER, TOP);
  text("for every burner", -10/ 10, 50 / 2 + img.height / 10+ 20);

  textSize(60);
  textAlign(CENTER, TOP);
  text("NEW FOR", width / 10 - textWidth(" " + userTyping) / 2, height - 600);
  
//קו שאפשר לכתוב עליו שם
  let underlineX = width / 10 + textWidth("NEW FOR") / 2 + textWidth(userTyping) / 2 + 10;
  let underlineY = height - 540;
  let underlineWidth = textWidth(userTyping) + 100;
  stroke(255);
  strokeWeight(1);
  line(underlineX, underlineY, underlineX + underlineWidth, underlineY);

  textSize(60);
  textAlign(CENTER, TOP);
  text(userTyping, width / 10 + textWidth("NEW FOR") / 2, height - 600);
  
//ספירה לאחור של דקות עד לאירוע
  textSize(40);
  textAlign(CENTER, TOP);
  text(countdown + " min", width / 5, height - 530);

//עם התזוזה של העכבר על התמונה, התמונה נעצרת וקצב התזוזה
  if (mouseOverImage) {
    movespeed = 0;
  } else {
    movespeed = -10;
  }

  x += movespeed;

  if (x < -img.width) {
    x = width;
  }
}
//הקלדת שם ומחיקת השם
function keyTyped() {
  if (keyCode !== ENTER && keyCode !== BACKSPACE) {
    userTyping += key;
  }
}
//הקלדת שם
function keyPressed() {
  if (keyCode === BACKSPACE) {
    userTyping = userTyping.slice(0, userTyping.length - 1);
  }
}
//ספירה לאחור
function updateCountdown() {
  countdown--;
  if (countdown <= 0) {
    clearInterval(countdownInterval);
  }
}
//תזוזת עכבר והשפעתו על התמונה
function mouseMoved() {
  if (mouseX > x && mouseX < x + img.width && mouseY > height / 18 - img.height / 2 && mouseY < height / 18 + img.height / 2) {
    mouseOverImage = false;
  } else {
    mouseOverImage = true;
  }
}

function mouseExited() {
  mouseOverImage = true;
}
function keyPressed() {
  // this will download the first 5 seconds of the animation!
  if (key === ' ') {
    saveGif('mySketch', 5);
  }
}