
function Asteroid(_size) {
  this.size = _size;
  this.pos;
  this.vel;

  this.angle = 0;
  this.minVel = 1;
  this.maxVel = 4;

  this.shapeArray = [];


  this.initializeShape = function(_pos) {
    if(_pos == null) {
      this.pos = createVector(player.pos.x, player.pos.y);
      while(this.pos.dist(player.pos) < 50) {
        let x = random(0, width);
        let y = random(0, height);
        this.pos.set(x, y);
      }
    }
    else {
      this.pos = createVector(_pos.x, _pos.y);
    }

    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(this.minVel, this.maxVel))

    for(let i = 0; i < 12; i++) {
      let v = random(10, 15) * this.size;
      this.shapeArray.push(v);
    }
  }


  this.collisionDetected = function(element) {
    let sizeLimit;
    element == player ? sizeLimit = (13*this.size)+10 : sizeLimit = 13*this.size;
    return (this.pos.dist(element.pos) <= sizeLimit)
  }

  this.split = function() {

    if(this.size != 1) {
      a1 = new Asteroid(this.size - 1);
      a1.initializeShape(this.pos);
      a2 = new Asteroid(this.size - 1);
      a2.initializeShape(this.pos);
      asteroidArray.push(a1);
      asteroidArray.push(a2);
    }


  }

  this.update = function() {
    this.pos.add(this.vel);
    checkBorders(this);
  }

  this.show = function() {
    stroke(255);
    noFill();
    strokeWeight(2);

    push();
      let angle = 0;
      translate(this.pos.x, this.pos.y);
      beginShape();
        for(let v of this.shapeArray) {
          let x = v * sin(angle);
          let y = v * cos(angle);
          vertex(x, y);
          angle += TWO_PI/12;
        }
      endShape(CLOSE);
    pop();
  }
}



function generateAsteroids() {
  if(frameCount % 60 == 0 && asteroidArray.length < MAX_ASTEROIDS) {
    let a = new Asteroid(3);
    a.initializeShape();
    asteroidArray.push(a);
  }

  if(frameCount % 4000 == 0){
    MAX_ASTEROIDS++;
  }
}
