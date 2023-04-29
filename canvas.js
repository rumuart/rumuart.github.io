
import { FlakesTexture } from "./FlakesTexture.js";

import Stats from './Stats.js';



$(window).on("load", function () {

var stats = new Stats();
document.body.appendChild(stats.dom)

let thisFrameTimeStamp;
 
let lastFrameTimeStamp  = new Date();

let deltaTime = null;

let rippleLast =
{
  x: 0,
  y: 0,

};

  const scene = new THREE.Scene();
      scene.background;
  
let scaleFactor = 1;
let numBalls;



let cCords = [];

const canvas = document.getElementById('anim');
const window2 = document.getElementById('window2');



/*spriteSun*/
const menuTiles = new THREE.TextureLoader().load( 'textures/menuTiles.png' );
const menuAlpha = new THREE.TextureLoader().load( 'textures/menuAlpha2.png' );
let mennuHoriz = 3;
let menuVert = 3;
menuTiles.magFilter = THREE.NearestFilter;
menuTiles.wrapS = THREE.RepeatWrapping;   
menuTiles.wrapT = THREE.RepeatWrapping;   
menuTiles.repeat.set( 1/mennuHoriz, 1/menuVert );
const materialSpriteMenu = new THREE.SpriteMaterial( { map: menuTiles, alphaMap: menuAlpha  } );

const spriteMenu = new THREE.Sprite( materialSpriteMenu );

spriteMenu.position.z = 110;
spriteMenu.opacity = 0;

scene.add( spriteMenu );

let menuCurTile = 0;
menuTiles.offset.x = (menuCurTile % mennuHoriz) / mennuHoriz;
menuTiles.offset.y = (menuVert - Math.floor( menuCurTile / mennuHoriz )-1)/ menuVert;

function updateMenu() 
{ 
  

    
let offsetX = (menuCurTile % mennuHoriz) / mennuHoriz;
let offsetY =  (menuVert - Math.floor( menuCurTile / mennuHoriz )-1)/ menuVert;     

menuTiles.offset.x = offsetX;
menuTiles.offset.y = offsetY;

    
}

const map = new THREE.TextureLoader().load( 'textures/spriteSheet3.png' );
let tilesHoriz = 16;
let tilesVert = 16;

map.wrapS = THREE.RepeatWrapping;   
map.wrapT = THREE.RepeatWrapping;   
map.repeat.set( 1/tilesHoriz, 1/tilesVert );

const materialSprite = new THREE.SpriteMaterial( { map: map  } );
materialSprite.opacity = .9;

const sprite = new THREE.Sprite( materialSprite );
sprite.scale.set(0,0,1);
sprite.position.z = 120;

scene.add( sprite );

let numberOfTiles = tilesHoriz * tilesVert;
let currentTile = 0;

let elapsedTime = 0;
let tileDispDuration = 1;

/*spriteSun*/

const mapSpark = new THREE.TextureLoader().load( 'textures/sparkSprite.png' );


mapSpark.wrapS = THREE.RepeatWrapping;   
mapSpark.wrapT = THREE.RepeatWrapping;   
mapSpark.repeat.set( 1/8, 1/8 );

const materialSpark= new THREE.SpriteMaterial( { alphaMap: mapSpark  } );
materialSpark.color = new THREE.Color(0xff7955);


const spriteSpark = new THREE.Sprite( materialSpark );
spriteSpark.scale.set(0,0,1);
spriteSpark.position.z = 130;

scene.add( spriteSpark );

spriteSpark.visible = false;

let currentTileSpark = 0;

let elapsedTimeSpark = 0;
let tileDispDurationSpark = 1;

class burst{
  constructor(x,y,scale){
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.scale2 = scale*1.5;
    this.velX = randomIntFromRange(-30,30);
    this.velX *= .1;
    this.velY = randomIntFromRange(-10,10);
    this.spriteBurst = new THREE.Sprite( materialSpark );
    
    this.spriteBurst.position.x = x;
    this.spriteBurst.position.y = y;
    this.spriteBurst.position.z = 130;
    this.spriteBurst.scale.set(scale,scale,1);
    scene.add(this.spriteBurst);
    this.counter1 = 0;
    this.counter2 = 0;
  }

  update(deltaTime){
    
      if(this.velY > -15){
        this.velY -=.3;
      }
    
    
    
    this.y += this.velY*deltaTime;
    this.x += this.velX;
    this.spriteBurst.position.x = this.x;
    this.spriteBurst.position.y = this.y;
    if(this.y<50){
      scene.remove(this.spriteBurst);
    }
    if(this.counter1 < 3){
      this.spriteBurst.scale.set(this.scale2,this.scale2,1);
      this.counter1++;
    }
    else if (this.counter2 < 3){
      this.spriteBurst.scale.set(this.scale,this.scale,1);
      this.counter2++;
    }
    else{
      this.counter1 = 0;
      this.counter2 = 0;
    }

    
  }
  getY(){
    return this.y;
  }
}

const LP = new THREE.TextureLoader().load( 'textures/lightSwarl2.png' );


LP.wrapS = THREE.RepeatWrapping;   
LP.wrapT = THREE.RepeatWrapping;   
LP.repeat.set( 1/8, 1/8 );

const materialLP= new THREE.SpriteMaterial( { alphaMap: LP  } );

class Swarl{
  constructor(x,y,scale){
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.scale2 = 5;
    this.swarl = new THREE.Sprite( materialLP );
    this.swarl.position.x = x;
    this.swarl.position.y = y;
    this.swarl.position.z = 50;
    this.swarl.scale.set(scale,scale,1);
    scene.add(this.swarl);
    this.counter1 = 0;
    this.counter2 = 0;
  }

  update(deltaTime){
    
    if(this.counter1 < 5){
      this.scale += this.scale2;
      this.swarl.scale.set(this.scale,this.scale,1);
      this.counter1++;
    }
    else if (this.counter2 < 5){
      this.scale -= this.scale2;
      this.swarl.scale.set(this.scale,this.scale,1);
      this.counter2++;
    }
    else{
      this.counter1 = 0;
      this.counter2 = 0;
    }

    
  }
  position(xMove,yMove){
    this.swarl.position.x = xMove;
    this.swarl.position.y = yMove;
  }
  
}


function TextureAnimator() 
{ 
  elapsedTime += deltaTime;
  elapsedTimeSpark += deltaTime;
  
  if(tileDispDuration > 0 && elapsedTime >= tileDispDuration){
    elapsedTime = 0;
    currentTile++;

    
let offsetX = (currentTile % tilesHoriz) / tilesHoriz;
let offsetY =  (tilesVert - Math.floor( currentTile / tilesHoriz )-1)/ tilesVert;     

map.offset.x = offsetX;
map.offset.y = offsetY;



    if (currentTile > numberOfTiles-1){
      currentTile = 0;
    }
  }

  if(tileDispDurationSpark > 0 && elapsedTimeSpark >= tileDispDurationSpark){
    elapsedTimeSpark = 0;
    currentTileSpark++;


let offsetXSpark = (currentTileSpark % 8) / 8;
let offsetYSpark =  (8 - Math.floor( currentTileSpark / 8 )-1)/ 8;     

mapSpark.offset.x = offsetXSpark;
mapSpark.offset.y = offsetYSpark;

LP.offset.x = offsetXSpark;
LP.offset.y = offsetYSpark;

    if (currentTileSpark > 63){
      currentTileSpark = 0;
    }
  }

  
}

  /*menuItems*/

const m_ind = document.getElementById('m_ind');
const m_art = document.getElementById('m_art');
const m_vid = document.getElementById('m_vid');
const m_paint = document.getElementById('m_paint');
const m_phot = document.getElementById('m_phot');
const m_other = document.getElementById('m_other');

m_ind.onmouseover = () =>{
menuCurTile = 1;



};
m_art.onmouseover = () =>{
  menuCurTile = 2;
  };
  m_vid.onmouseover = () =>{
    menuCurTile = 3;
    };
    m_paint.onmouseover = () =>{
      menuCurTile = 4;
      };
      m_phot.onmouseover = () =>{
        menuCurTile = 5;
        };
        m_other.onmouseover = () =>{
          menuCurTile = 6;
          };

          
/*menuItems*/
let scaler1 = 0;
let scaler2 = -1;
let scalerTemp = 0;
let scaler3 = 0;
let burstSpawn = 0;

let bursts = [];
let burstCount = 0;

function menuSpriteUpdate(){
  burstSpawn = 1;
  burstCount = 0;

  let rect = window2.getBoundingClientRect();
  
  let radius2 = rect.height/3;

  sprite.visible = true;
  
  
  if(sprite.scale.x < radius2*2){
    scaler1 += 25*deltaTime;
    sprite.scale.set(scaler1, scaler1, 1);
  }
  if(sprite.scale.x>radius2*.5){
    spriteMenu.visible = true;
    if(spriteMenu.scale.x <radius2*1.3)
    {
      scaler3 +=25*deltaTime;
      spriteMenu.scale.set(scaler3,scaler3,1);
    };
    
  }
  
 spriteSpark.visible = true;

if(scaler2 == -1){
scaler2 = spriteSpark.scale.x;
scalerTemp = spriteSpark.scale.x;



}
 if(scaler2 > 0 ){

  scaler2 -= 70*deltaTime;
    spriteSpark.scale.set(scaler2, scaler2, 1);

 }
 else{
  spriteSpark.visible = false;
 }
  
    
}

function menuSpriteHide(){
 
  spriteMenu.visible = false;
  spriteSpark.visible = false;
  scaler3 = 0;
  scaler2 = -1;
  spriteMenu.scale.set(0,0,1);

if(scalerTemp > 0){
  spriteSpark.scale.set(scalerTemp, scalerTemp, 1);
  
}
  
  
  if(sprite.scale.x > 0){
    scaler1 -= 100*deltaTime;
    sprite.scale.set(scaler1, scaler1, 1);
  }
  else{
    sprite.visible = false;
    sprite.scale.set(0, 0, 1);
    if(burstSpawn == 1){
      if(burstCount < 10){
        let rect = window2.getBoundingClientRect();
        if(innerWidth<3000){
          bursts.push(new burst(sprite.position.x,sprite.position.y,rect.height/22));
        }
        else{
          bursts.push(new burst(sprite.position.x,sprite.position.y,rect.height/26));
        }

        
        
        burstCount++;
      }
      else{
        burstSpawn = 0;
      }
      
     };
    
  }

  
  
}



function getCircleCords(){

  

  let rect = window2.getBoundingClientRect();
  let cCord = {
    x: null,
    y: null
  }
  
  

  let winCenter = {
    x: rect.width/2,
    y: rect.height/2+240
  }

  spriteMenu.position.x = winCenter.x;
  spriteMenu.position.y = winCenter.y;

  sprite.position.x = winCenter.x;
  sprite.position.y = winCenter.y;

  spriteSpark.position.x = winCenter.x;
  spriteSpark.position.y = winCenter.y;
  
  let number_of_chunks = numBalls-5;
  let degrees = 0;                         
  
  let radius2 = rect.height/3;
  let star = radius2/4;  

  
  spriteSpark.scale.set(radius2*2.5, radius2*2.5, 1);
                  

  for (let i = 0; i < number_of_chunks; i++)
  {
    
      degrees = i * (360 / number_of_chunks); 
      let radian = (degrees * (Math.PI / 180));
      let x;
      let y;
      
    if(i % 2 == 0){
       x = winCenter.x + ((radius2+star) * Math.cos(radian));          
       y = winCenter.y + ((radius2+star) * Math.sin(radian));
       
    }
    else{
       x = winCenter.x + (radius2 * Math.cos(radian));          
       y = winCenter.y + (radius2 * Math.sin(radian));
    }
      

  if(cCords.length > 0){

    cCords[i]=(cCord={x,y});
  }
  else{

    cCords.push(cCord={x,y});
  }
  
}

for(let i = 5; i < circles.length; i++){
  circles[i].cx = cCords[i-5].x;
  circles[i].cy = cCords[i-5].y;
}

}





canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



const mouse = {
  x:10,
  y: 10,
  trueX: 0,
  trueY: 0
  
}



// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
  let rect = canvas.getBoundingClientRect();

  addRipple(window.innerHeight - (mouse.y - rect.y),mouse.x - rect.x);

  mouse.trueX = mouse.x - rect.x;
  mouse.trueY = window.innerHeight - (mouse.y - rect.y);

  
  
})





//utility


function randomColor(){
  let letters = "0123456789ABCDEF";
  let color = '#';
  for(let i = 0; i < 6; i++){
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color;
}
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

function rotate(velocity, angle) {
  const rotatedVelocities = {
      x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
      y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };

  return rotatedVelocities;
}

/**
* Swaps out two colliding particles' x and y velocities after running through
* an elastic collision reaction equation
*
* @param  Object | particle      | A particle object with x and y coordinates, plus velocity
* @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
* @return Null | Does not return a value
*/

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

      // Grab angle between the two colliding particles
      const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

      // Store mass in var for better readability in collision equation
      const m1 = particle.mass;
      const m2 = otherParticle.mass;

      // Velocity before equation
      const u1 = rotate(particle.velocity, angle);
      const u2 = rotate(otherParticle.velocity, angle);

      // Velocity after 1d collision equation
      const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
      const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

      // Final velocity after rotating axis back to original location
      const vFinal1 = rotate(v1, -angle);
      const vFinal2 = rotate(v2, -angle);

      // Swap particle velocities for realistic bounce effect
      particle.velocity.x = vFinal1.x;
      particle.velocity.y = vFinal1.y;

      otherParticle.velocity.x = vFinal2.x;
      otherParticle.velocity.y = vFinal2.y;
  }
}

function resolveCollision2(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

      // Grab angle between the two colliding particles
      const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

      // Store mass in var for better readability in collision equation
      const m1 = particle.mass;
      const m2 = otherParticle.mass;

      // Velocity before equation
      const u1 = rotate(particle.velocity, angle);
      const u2 = rotate(otherParticle.velocity, angle);

      // Velocity after 1d collision equation
      const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
      const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

      // Final velocity after rotating axis back to original location
      const vFinal1 = rotate(v1, -angle);
      const vFinal2 = rotate(v2, -angle);

      // Swap particle velocities for realistic bounce effect
      particle.velocity.x = vFinal1.x;
      particle.velocity.y = vFinal1.y;

      
  }
}




// Objects


class Tile {
  constructor(x,y,count){

    this.positionX = x;
    this.positionY = y;

    
    this.geometry = new THREE.PlaneGeometry(10,10);
    
    this.material = new THREE.MeshStandardMaterial( { color: 0x353535 } );
    this.material.wireframe = true;
    
    
    
    this.ellipse = new THREE.Mesh( this.geometry, this.material );
    this.ellipse.position.x = x;
    this.ellipse.position.y = y;

    this.ellipse.visible = false;
    this.ellipse.receiveShadow = true;

    

    scene.add(this.ellipse);
  }

  ScaleUp(factor) {


    this.ellipse.scale.x = factor;
    this.ellipse.scale.y = factor;
    this.ellipse.visible = true;
    if(factor > 3*scaleFactor && !this.spark){
      this.material.color = new THREE.Color(.9,.1,0);
    }
    else if(factor > 2*scaleFactor && !this.spark){
      this.material.color = new THREE.Color(.7,.3,0);
    }
    else if(factor > 1*scaleFactor && !this.spark){
      this.material.color = new THREE.Color(.3,.7,0);
    }
    
    this.material.needsUpdate = true;
    
  }

  done(){
    this.ellipse.visible = false;
    
  }

  


}



class Circle {
  constructor(x, y, radius,scale) {
    this.x = x
    this.y = y
    this.scaleX = 1;
    this.scaleY = 1;
    this.counter = 0;

    this.cx = 0;
    this.cy = 0;
    
    this.inCollision = false;
    this.deform = false;
    this.a = 1.2;
    this.b = .8;

    this.velocity = {
      x: Math.random() - 0.5,
      y: Math.random() - 0.5
    };
    this.radius = radius;
    
    
    this.mass = 1;

    this.inCircle = false;
    this.numSteps = 30;
    this.distX = 0;
    this.distY = 0;

    this.isLight = false;
    this.onPosition = false;

    this.scale = scale;
    this.isOut = true;
  }

  

  update(circles, circleMouse,deltaTime,tiles) {

    if(!gg || this.isLight){
    
      this.inCircle = false;
      this.counter = 0;
      this.onPosition = false;
      this.numSteps = 30;
   
    
    for (let i = 0; i < circles.length; i++) {
      
      if(this == circles[i]) continue;
      if(distance(this.x,this.y,circles[i].x,circles[i].y) - this.radius * 2 < 0){
 
        resolveCollision(this,circles[i]);
        

      }
 
      if(this.inCollision && this.deform == false){
        this.scaleX += .001*deltaTime;
        this.scaleY -= .001*deltaTime;

        if(this.scaleX > this.a){
          this.a -= .03*deltaTime;
          this.deform = true;
        }
      }
      if(this.inCollision  && this.deform)
      {
        this.scaleX -= .001*deltaTime;
        this.scaleY += .001*deltaTime;
        if(this.scaleX < this.b)
        {
          this.b += .03*deltaTime;
          this.deform = false;
          
        }

      }
      if(this.inCollision && this.a < 1 || this.b > 1){
        this.inCollision = false;
        this.a = 1.2;
        this.b = .8;

      }
     
    }

    let rect = window2.getBoundingClientRect();

    if(this.x - this.radius <= 0 || this.x + this.radius >= rect.width){
      

      this.velocity.x = -this.velocity.x;

    }
    if(this.y - this.radius <= 240|| this.y + this.radius >= rect.height+240){

      this.velocity.y = -this.velocity.y;

    }
    if(this.x - this.radius <= 0)
    {
      this.x += 1*deltaTime;
    }
    if(this.x + this.radius >= rect.width)
    {
      this.x -= 1*deltaTime;
    }
    if(this.y - this.radius <= 240){
      this.y += 1*deltaTime;
    }
    if(this.y + this.radius >= rect.height+240){
      this.y -= 1*deltaTime;
    }


    if(distance(this.x,this.y,circleMouse.x,circleMouse.y) - (this.radius + circleMouse.radius) < 0){
 
      let velY = this.y - circleMouse.y;
      velY = velY * .07;
     
      let velX = this.x -  circleMouse.x;
      velX = velX * .07;
      

      circleMouse.velocity.x = velX;
      circleMouse.velocity.y = velY;

      resolveCollision2(this,circleMouse);
      this.inCollision = true;
      
      
    }

    if(this.velocity.x > .5)
    {
      this.velocity.x -= .02*deltaTime;
    }
    if(this.velocity.x  < -.5)
    {
      this.velocity.x += .02*deltaTime;
    }
    if(this.velocity.y > .5)
    {
      this.velocity.y -= .02*deltaTime;
    }
    if(this.velocity.y  < -.5)
    {
      this.velocity.y += .02*deltaTime;
    }

    this.x += this.velocity.x*deltaTime;
    this.y += this.velocity.y*deltaTime;
    
 
    for(let i =0;i<tiles.length; i++){

      if(tiles[i].interacts != true){

        if(distance(this.x,this.y,tiles[i].positionX,tiles[i].positionY) 
    - 100*scaleFactor < 0 ){

      let dist = distance(this.x,this.y,tiles[i].positionX,tiles[i].positionY) 
      - 100*scaleFactor;
      dist *= -.05*scaleFactor;

      if(dist > 1*scaleFactor){
        tiles[i].ScaleUp(dist);
      }
      else{
        tiles[i].done();
      }
    }
  }
}
}
if(gg) {

  if(!this.isLight){

    
    for(let i =0;i<tiles.length; i++){

      if(tiles[i].interacts != true){

        if(distance(this.x,this.y,tiles[i].positionX,tiles[i].positionY) 
    - 100*scaleFactor < 0 ){

      let dist = distance(this.x,this.y,tiles[i].positionX,tiles[i].positionY) 
      - 100*scaleFactor;
      dist *= -.05*scaleFactor;

      
      
        tiles[i].done();
      
    }
  }

    }


    if(!this.inCircle){
      this.distX = this.x-this.cx;
      this.distY = this.y-this.cy;
      this.inCircle = true;
    }
  
    if(this.counter < this.numSteps){
  
      this.x-=this.distX/this.numSteps;
      this.y-=this.distY/this.numSteps;
      this.counter ++;
    }
    
    else{
      this.onPosition = true;
      this.numSteps = (2500/numBalls)*deltaTime;
    }
    
  }

}
}

}

class Circle2 {
  constructor(x, y, radius) {
    this.x = x
    this.y = y
    this.velocity = {
      x: 1,
      y: 1
    };
    this.radius = radius
    
    this.mass = 2;
  }

  

  update() {
    let rect = canvas.getBoundingClientRect();

    this.x = mouse.x - rect.x;
    this.y = window.innerHeight - (mouse.y - rect.y);

    
    
  }
}

            const sizes = {
                width: innerWidth,
                height: innerHeight
            }

 ///////////////////////////////////////////////////////////////////           

             window.addEventListener('resize', () => 
            {
                sizes.width = innerWidth
                sizes.height = innerHeight

                
                camera.left = sizes.width / - 2;
                camera.right = sizes.width / 2;
                camera.top = sizes.height / 2;
                camera.bottom = sizes.height / - 2;
                camera.aspect = sizes.width/ sizes.height
                camera.position.x = sizes.width / 2;
                camera.position.y = sizes.height / 2;
                camera.updateProjectionMatrix()

                renderer.setSize(sizes.width,sizes.height)
                renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

                composer.reset();

                BG.position.x = window.innerWidth/2;
                BG.position.y = window.innerHeight/2 + 120;

                getCircleCords();
                
            })
            

      
 ///////////////////////////////////////////////////////////////////////////    
      
			
			const camera = new THREE.OrthographicCamera( sizes.width / - 2, sizes.width / 2, sizes.height / 2, sizes.height / - 2, 1, 1000 );
      scene.add(camera);
			const renderer = new THREE.WebGLRenderer({
                canvas: canvas,antialias: false
                
            });
			renderer.setSize( sizes.width,sizes.height);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;

            renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
			
            
            
            

            const pointLight = new THREE.PointLight(0xffffff, 1);
            pointLight.position.x = -94;
            pointLight.position.y = 1231;
            pointLight.position.z = 1000;
            pointLight.intensity = .5;
            pointLight.castShadow = true;
            pointLight.decay = 2;
            pointLight.distance  = 10000;
            pointLight.shadow.mapSize.width = 4048;
            pointLight.shadow.mapSize.height = 4048;
            
            scene.add(pointLight);

            
           
            
            

            
            
            
			

			      camera.position.z = 1000;
            camera.position.x = innerWidth/2;
            camera.position.y = innerHeight/2;
            const clock = new THREE.Clock();

            const c = canvas.getContext('2d');




let circles;
let circleMouse;
let spheres;

let radius;
let lightSpheres;


if(innerHeight<400)
{
  numBalls = 0;
  radius = 0;
}
else if(innerHeight<700 || innerWidth < 500){
  numBalls = 21;
  radius = 25;
}
else if (innerHeight<900 || innerWidth < 800){
  numBalls = 21;
  radius = 40;
}
else if(innerWidth > 3000){
  numBalls = 49;
  radius = 70;
  scaleFactor = 1.35;
}
else{
  numBalls = 49;
  radius = 40;
  scaleFactor = 1;
}

let num = 5*scaleFactor;

            const background = new THREE.PlaneGeometry(screen.width * 2,screen.height * 2,screen.width/num,screen.height/num);
            const mat_BG = new THREE.MeshStandardMaterial();
            mat_BG.roughness = .4;
            
            mat_BG.color = new THREE.Color(0x353535);

            mat_BG.wireframe = true;
            

            let BG = new THREE.Mesh(background,mat_BG);
            BG.position.x = window.innerWidth/2;
            BG.position.y = window.innerHeight/2 + 120;
            
            BG.receiveShadow = true;

            scene.add(BG);






let tiles = [];



function init(){



  circles = [];
  spheres = [];
  lightSpheres  = [];
  
  


  let tileNumber = 30;
  let tielSize = window.screen.height/tileNumber;

  for(let x = 0; x<window.screen.width+tielSize; x+=tielSize){
    for(let y = 240; y<window.screen.height; y+=tielSize){

      let count = randomIntFromRange(0,24);
      tiles.push(new Tile(x,y,count));

  }
}
  

  circleMouse = new Circle2(10,10,20);

  const geometry =  new THREE.SphereGeometry( radius, 24, 24 );
  //const lightSphere =  new THREE.SphereGeometry( 10, 8, 8 );
  const lightMat = new THREE.MeshStandardMaterial();

  lightMat.emissive = new THREE.Color(1,1,1);
  lightMat.emissiveIntensity = 10;
			

            
  let rect = window2.getBoundingClientRect();

  for (let i = 0; i < numBalls; i++) {

    let x = Math.random() * rect.width;
    let y = randomIntFromRange(240, innerHeight);
    
    
    if( i !== 0){
      for(let j = 0; j < circles.length; j++){
        if(distance(x,y,circles[j].x,circles[j].y) - radius * 2 < 0){

          x = Math.random() * rect.width;
         y =  randomIntFromRange(240, innerHeight);
         j = -1;
        }
      }
    }
    if(i % 2 == 0){
      circles.push(new Circle(x,y,radius,1));
    }
    else{
      circles.push(new Circle(x,y,radius,.6));
    }
   


  }

  

  let envmapLoader = new THREE.PMREMGenerator(renderer);
  
  

  new THREE.RGBELoader().setPath('textures/').load('HDRmap3.hdr',function(hdrmap){

    

    

  
  let envemap = envmapLoader.fromCubemap(hdrmap);

  let texture = new THREE.CanvasTexture( new FlakesTexture());
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.x =4;
  texture.repeat.y = 2;

 let ballMaterial = {
    metalness: 0.5,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,

      normalMap: texture,
      normalScale: new THREE.Vector2(1,1),
      envMap: envemap.texture,
      transmission: 1,
      envMapIntensity: 1,
      sheenRoughness: 0.5,
      sheen:2,

  }

  
  

  for (let v = 0; v < circles.length - 5; v++){
    
   let material = new THREE.MeshPhysicalMaterial(ballMaterial);
    
  
    
            
    let rColor =  randomColor();      
   
    material.color = new THREE.Color(rColor);
    material.sheenColor = new THREE.Color(rColor);

    let ball = new THREE.Mesh( geometry, material );
    
           
			
            ball.position.y = circles[v].y;
            ball.position.x = circles[v].x;
            ball.castShadow = true;
            ball.position.x = 10;
            ball.position.z = 10;
            


            spheres.push(ball);

            scene.add( ball );
  }
})
  for (let v = circles.length - 5; v < circles.length; v++){

    const p = new THREE.PointLight(0xffffff, 1);
            p.position.x = circles[v].x;
            p.position.y = circles[v].y;
            p.position.z = 80;
            p.intensity = 1;
            p.castShadow = true;
            p.decay = 2;
            p.distance  = 1000;

            
            
            scene.add(p);
            spheres.push(p);

    const lightSP = new Swarl(circles[v].x,circles[v].y,radius*4);
    
    

    lightSpheres.push(lightSP);
   
    
            
  }
  
  for(let i =0; i < 5; i++){
    circles[i].isLight = true;
  }
            
}




let rippleScale = 4;
if(innerWidth > 3000){
  rippleScale = 6;
}

const geometry2 = new THREE.CircleGeometry(rippleScale, 6);
const ripMat = new THREE.MeshStandardMaterial();
ripMat.color = new THREE.Color(1,1,1);
ripMat.needsUpdate = true;
ripMat.emissive = new THREE.Color(1,1,1);


ripMat.roughness = 0;

let ripples = [];
let ripples2 = [];
let ripplesM = [];
let ripplesM2 = [];


class rippleMove2 {
  constructor(x,y,u,w){
    this.speedX = x;
    this.speedY = y;
    this.rotX = u;
    this.rotY = w;
    this.rC = 1;
    this.g = .5;
    this.b = 0;
  }
  update(deltaTime){
    if(this.g >= 0.15){
      this.g -= .01*deltaTime;
    
    }
    else if (this.rC >=0.15){
      this.rC -= .003*deltaTime;
      if(this.b <= 0.15){
        this.b += .003*deltaTime;
      }

    }
      

  }
}

class rippleMove {
  constructor(){
  
  this.toCount = false;
  this.counter = 0;}
  
  update(i,deltaTime){
    if(this.toCount){
      this.counter +=1*deltaTime;
   if(this.counter > 2){
    
    if(i<ripplesM.length-1){
      ripplesM[i+1].toCount = true;
    }
    
    const ripMat2 = new THREE.MeshStandardMaterial();
    ripMat2.color = new THREE.Color(1,1,1);
    ripMat2.needsUpdate = true;
  
  
  let ripple2 = new THREE.Mesh(geometry2,ripMat2);

  let xd = getRandomFloat(-1,1,2);
  let yd = getRandomFloat(0.3,1,2);
  let xr = getRandomFloat(-1,1,2);
  let yr = getRandomFloat(-1,1,2);

  
  let rippleM2 = new rippleMove2(xd,yd,xr,yr);
  
  
  
  ripple2.position.y = ripples[i].position.y;
  ripple2.position.x = ripples[i].position.x;
  ripple2.position.z= ripples[i].position.z;
  ripple2.scale.x = ripples[i].scale.x;
  ripple2.scale.y = ripples[i].scale.y;
  ripple2.scale.z = ripples[i].scale.z;
  
  ripples2.push(ripple2);
  ripplesM2.push(rippleM2);
  scene.add(ripple2);

  scene.remove(ripples[i]);
  ripples.splice(i,1);
  ripplesM.splice(i,1);
  
  

   
    
  }
 }
}

}

let mouseLight = new THREE.PointLight(0xffffff, 1);
  mouseLight.position.x = 600;
  mouseLight.position.y = 600;
  mouseLight.position.z = 5;
  mouseLight.intensity = 20;
  mouseLight.castShadow = true;
  mouseLight.decay = 2;
  mouseLight.distance  = 1000;
  
  scene.add(mouseLight);
  
 



function addRipple(y,x){

if((((rippleLast.y - y)*(rippleLast.y - y)) > 40
|| ((rippleLast.x - x)*(rippleLast.x - x)) > 40) && y > 240 && y < window2.clientHeight +240
&& x > 0 && x < window2.clientWidth)
{

  let xd = getRandomFloat(-1,1,2);
  let yd = getRandomFloat(0.1,1,2);

  let ripple = new THREE.Mesh(geometry2,ripMat);
  let rippleM = new rippleMove(xd,yd);
  
  
  ripple.position.y = y;
  ripple.position.x = x;
  ripple.position.z= 3;
  ripple.scale.x = 0;
  ripple.scale.y = 0;
  ripple.scale.z = 0;
  
  ripples.push(ripple);
  ripplesM.push(rippleM);

  if(ripplesM.length >0){
    ripplesM[0].toCount = true;
  }
  
  
  scene.add(ripple);
  
  rippleLast.x =  x;
  rippleLast.y =  y;

  
}

if( y > 240 && y < window2.clientHeight +240
&& x > 0 && x < window2.clientWidth)
{

  mouseLight.intensity = 2;
  
  
  
}

}







function rippleUpdate(deltaTime){
  
  if(ripples.length > 0){

  for(let i = 0; i < ripples.length; i ++)
  {
    if(ripples[i].scale.x < .3){
      ripples[i].scale.x += .1*deltaTime;
      ripples[i].scale.y += .1*deltaTime;
      ripples[i].scale.z += .1*deltaTime;
    }
    else if(ripples[i].scale.x < 1){
      ripples[i].scale.x += .005*deltaTime;
      ripples[i].scale.y += .005*deltaTime;
      ripples[i].scale.z += .005*deltaTime;

      
    }

    ripples[i].position.y += 0.3*deltaTime;
    
    ripplesM[i].update(i,deltaTime);

    if(ripples.length > 100){
      scene.remove(ripples[1]);
      ripples.splice(1,1);
      ripplesM.splice(1,1);

    }
  }
}

if(ripples2.length > 0){

  for(let r = 0; r < ripples2.length; r ++)
  {
    if(ripples2[r].scale.x < .3){
      ripples2[r].scale.x += .01*deltaTime;
      ripples2[r].scale.y += .01*deltaTime;
      ripples2[r].scale.z += .01*deltaTime;
    }
    else if(ripples2[r].scale.x < 1){
      ripples2[r].scale.x += .005*deltaTime;
      ripples2[r].scale.y += .005*deltaTime;
      ripples2[r].scale.z += .005*deltaTime;

      
    }
    if(ripples2[r].position.y > innerHeight ){
      scene.remove(ripples2[r]);
      ripples2.splice(r,1);
      ripplesM2.splice(r,1);
      
      
    }
   if(ripplesM2.length > 0&& ripplesM2[r] != null ){
    ripplesM2[r].update(deltaTime);

      ripples2[r].position.y += ripplesM2[r].speedY*deltaTime;
      ripples2[r].position.x += ripplesM2[r].speedX*deltaTime;

      
      let b = ripplesM2[r].b;
      let rC = ripplesM2[r].rC;
      let g = ripplesM2[r].g;
      
      ripples2[r].material.color = new THREE.Color(rC,g,b);
      
      
   }
    
    }
    if(ripples2.length > 150){
      scene.remove(ripples2[1]);
      ripples2.splice(1,1);
      ripplesM2.splice(1,1);

    }
}


  mouseLight.position.x = mouse.trueX;
  mouseLight.position.y = mouse.trueY;
  if(mouseLight.intensity >=0){
    mouseLight.intensity -= .1*deltaTime;
    
  }
 

}


//PostProccesing

const renderScene = new THREE.RenderPass(scene,camera);
const composer = new THREE.EffectComposer(renderer);

composer.addPass(renderScene);

const bloomPass = new THREE.UnrealBloomPass(

           new THREE.Vector2(window.innerWidth,window.innerHeight),
           .3,
           .4,
           .001
);

composer.addPass(bloomPass);

/*const SSAO = new THREE.SSAOPass(scene,camera);

SSAO.kernelRadius = 30;
SSAO.maxDistance = 0.01;
SSAO.minDistance = 0.0001;

composer.addPass(SSAO);*/


// Animation Loop
function animate() {

  
  

  deltaTime = ((thisFrameTimeStamp = new Date()) - lastFrameTimeStamp)/10;

  

  

    circles.forEach(circle => {
    circle.update(circles,circleMouse,deltaTime,tiles);
  });
  
  
if(bursts.length>0){
  for(let i = 0; i < bursts.length; i++){
    bursts[i].update(deltaTime);
    if(bursts[i].getY() < 0 ){
      bursts.splice(i,1);
      
    }
    
  }
}
    
lightSpheres.forEach(swarl => {
  swarl.update(deltaTime);
});
    
  
  circleMouse.update();

  

  for(let k = 0; k< spheres.length; k++){

    
    spheres[k].position.y = circles[k].y;
    spheres[k].position.x = circles[k].x;
    spheres[k].rotation.x += circles[k].velocity.x*0.01*deltaTime;
    spheres[k].rotation.y += circles[k].velocity.y*0.01*deltaTime;
    if(!circles[k].isOut){
      spheres[k].scale.z  += .02*deltaTime;
      spheres[k].scale.x  += .02*deltaTime;
      spheres[k].scale.y  += .02*deltaTime;
      if(spheres[k].scale.z >= 1){
        circles[k].isOut = true;
      }
    }
    else{
      spheres[k].scale.x = circles[k].scaleX;
      spheres[k].scale.y = circles[k].scaleY;
    }
    
    
  }

  for(let s = circles.length - 5; s < circles.length; s++){
    let ddd = circles.length - 5;
    lightSpheres[s-ddd].position(circles[s-ddd].x,circles[s-ddd].y);
    
  }


  if(gg){

    menuSpriteUpdate();
    updateMenu();
    

    let firstX = 0;
    let firstY = 0;
    let secondX = 0;
    let secondY = 0;

    for(let i = 5; i < circles.length; i++){

      if(circles[i].scale < 1){
        circles[i].isOut = false;
      }
      
      if(i==5){
        firstX = circles[i].cx;
        firstY = circles[i].cy;

      }
      if(i==6){
        secondX = circles[i].cx;
        secondY = circles[i].cy;

      }
      if(circles[i].onPosition == true && i != circles.length-2 && i != circles.length-1){
        
        circles[i].cx = circles[i+2].cx;
        circles[i].cy = circles[i+2].cy;
        circles[i].counter = 0;
        circles[i].inCircle = false;
        circles[i].onPosition = false;
      }
       if(circles[i].onPosition == true && i == circles.length-2 ){
        
        circles[i].cx = firstX;
       circles[i].cy = firstY;
       circles[i].counter = 0;
       circles[i].inCircle = false;
        circles[i].onPosition = false;
      }
      if(circles[i].onPosition == true && i == circles.length-1 ){
        
        circles[i].cx = secondX;
       circles[i].cy = secondY;
       circles[i].counter = 0;
       circles[i].inCircle = false;
        circles[i].onPosition = false;
      }
      
    }

    for(let k = 0; k< spheres.length; k++){

      
      if(spheres[k].scale.x > circles[k].scale){
        spheres[k].scale.x -=.05*deltaTime;
      }
      if(spheres[k].scale.y > circles[k].scale){
        spheres[k].scale.y -=.05*deltaTime;
      }
      if(spheres[k].scale.z > circles[k].scale){
        spheres[k].scale.z -=.05*deltaTime;
      }
      
      
    }
  }
  else{
    menuSpriteHide();

    if(menuCurTile != 0){
      menuCurTile = 0;
      menuTiles.offset.x = (menuCurTile % mennuHoriz) / mennuHoriz;
      menuTiles.offset.y = (menuVert - Math.floor( menuCurTile / mennuHoriz )-1)
      / menuVert;
    }
    
  }

  TextureAnimator();
  rippleUpdate(deltaTime);
  

	//renderer.render( scene, camera );
  composer.render();
  window.requestAnimationFrame( animate );

  
  
  lastFrameTimeStamp = thisFrameTimeStamp;
   
  stats.update();
  
}

init()
animate()
getCircleCords()

})