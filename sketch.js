var ball,imgBall,paddle,imgPaddle,computerPaddle;
var invisiblePaddle,paddleState,paddleBounce;
var score,highScore,gameState;
function preload() {
  imgBall = loadImage("ball.png");
  imgPaddle = loadImage("paddle.png");
}
function setup() {
  createCanvas(400, 400);
   /* create the Ball Sprite and the Paddle Sprite */
  /* assign the images to the sprites */
  ball = createSprite(30,200,20,20);
  ball.addImage("ball",imgBall);
  
  paddle = createSprite(380,200);
  paddle.addImage("paddle",imgPaddle);
  
  computerPaddle = createSprite(370,200);
  computerPaddle.addImage("paddle",imgPaddle);
  
  invisiblePaddle = createSprite(380,200,20,80);
  
  paddleState = "playerPaddle";
  
  paddleBounce = false;
  
  score = 0;
  
  highScore = 0;
  
  gameState = "play";
  
  ball.velocityX = 9;
  ball.velocityY = random(-1,-5);
  

}

function draw() {
  background(50,153,0);
  /* create Edge Sprites here */
  edge = createEdgeSprites();
 if(gameState==="play"){
    if(paddleState==="playerPaddle"){
    computerPaddle.visible = false;
    paddle.visible = true;
    textSize(20);
      fill("orange");
    text("your turn",100,50);
    }
    else{
      paddle.visible = false;
      computerPaddle.visible = true;
      textSize(20);
      fill("orange");
      text("computers turn",100,50);
    }
    if(ball.isTouching(edge[0])){
    ball.bounceOff(edge[0]);
    }
    if(ball.isTouching(edge[2])){
      ball.bounceOff(edge[2]);
    }
    if(ball.isTouching(edge[3])){
      ball.bounceOff(edge[3]);
    }
    if(ball.isTouching(invisiblePaddle)&&ball.x<390){
    ball.bounceOff(invisiblePaddle);
    paddleBounce = true;
    ball.velocityY = random(-9,20);
    ball.velocityX = random(-9,-20);
  }
  if(paddleState==="playerPaddle"&&ball.x<350&&paddleBounce===true){
      score++;
      paddleState = "computerPaddle";
      paddleBounce = false;
  }
 if(paddleState==="computerPaddle"&&ball.x<350&&paddleBounce===true)   {
      paddleState = "playerPaddle";
      paddle.y = 200;
      paddleBounce = false;
  }
  if(paddle.y>=390){
    paddle.y = 390;
  }
  else if(paddle.y<=10){
    paddle.y = 10;
  }
  
  if(paddleState==="playerPaddle"){
    if(keyDown(RIGHT_ARROW))
    {
       paddle.y = paddle.y-20;
    }

    if(keyDown(DOWN_ARROW))
    {
      paddle.y = paddle.y+20;
    }
  }
  if(paddleState==="playerPaddle"){
    invisiblePaddle.y = paddle.y;
    invisiblePaddle.x = paddle.x;
  }
  else{
    invisiblePaddle.y = computerPaddle.y;
    invisiblePaddle.x = computerPaddle.x;
  }
  if(paddleState==="computerPaddle"){
    computerPaddle.y = ball.y;
  }
  if(ball.x>410){
    gameState = "end";
  }
  if(ball.velocityX<-17&&ball.velocityY<-15){
    if(paddleState==="computerPaddle"){
      fill("red");
      textSize(30);
      text("player flameShot!!!",50,200);
    }
    else if(paddleState==="computerPaddle"){
      fill("red");
      textSize(30);
      text("computer flameShot!!!",50,200);
    }
  }
}
  if(gameState==="end"){
      if(score>highScore){
        highScore = score;
      }
    ball.velocityX = 0;
    ball.velocityX = 9;
    fill("orange");
    textSize(20);
    text("You Lose",100,50);
    text("press the left arrow to restart",100,200);
    if(keyDown(LEFT_ARROW)){
      ball.y = 200;
      ball.x = 30;
      paddle.y = 200;
      score = 0;
      ball.depth = 200000;
      ball.visible = true;
      gameState = "play";
    }
  }
  invisiblePaddle.depth = paddle.depth-1;
  textSize(20);
  fill("orange");
  text("score:"+score,270,30);
  text("highscore:"+highScore,270,60);
  
  drawSprites();
  
}

function randomVelocity()
{
  /* this function gets called when the ball bounces off the paddle */
  /* assign the ball a random vertical velocity, so it bounces off in random direction */
}

