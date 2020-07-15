
function Ship(posX, posY) {
  this.isDead = true;

  this.pos = createVector(posX, posY);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);

  this.angle = createVector(0, -1).normalize();
  this.rotSpeed = 0.06;
  this.accSpeed = 0.2;
  this.velLimit = 7;
  this.showAccAnim = false;

  this.bullets = [];

  this.rotateShip = function(dir) {
      this.angle.rotate(this.rotSpeed * dir);
  }

  this.applyForce = function() {
    this.acc.set(this.angle);
    this.acc.setMag(this.accSpeed);

    this.showAccAnim = true;
  }


  this.fire = function() {
    let b = new Bullet(this.pos, this.angle);
    this.bullets.push(b);
  }

  this.checkBullets = function() {
    for( let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].show();
      let gone = this.bullets[i].update();
      gone ? this.bullets.splice(i, 1) : null;
    }
  }

  this.reset = function() {
    this.pos.set(width/2, height/2);
    this.vel.setMag(0);
    this.angle.set(0, -1);
    this.isDead = true;
  }


  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.velLimit);

    this.pos.add(this.vel);
    checkBorders(this);
    this.checkBullets();

    this.acc.setMag(0);
  }

  this.show = function() {
    stroke(255);
    strokeWeight(2);
    fill(0);
    push();
    rectMode(CENTER);
    translate(this.pos.x, this.pos.y);
    rotate(this.angle.heading());

    //ship shape
    beginShape();
    vertex(15, 0);
    vertex(-15, 10);
    vertex(-12, 0);
    vertex(-15, -10);
    endShape(CLOSE);

    //acceleration animation
    if(this.showAccAnim && frameCount % 10 >= 5) {
      fill(255);
      beginShape();
      vertex(-14, 4);
      vertex(-13, 0);
      vertex(-14, -4);
      vertex(-22, 0);
      endShape(CLOSE);
    }

    this.showAccAnim = false;
    pop();
  }


}
