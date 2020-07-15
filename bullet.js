
function Bullet(_pos, _dir) {
  this.travelDist = 0;
  this.maxDistance = 550;
  this.pos = createVector(0, 0);
  this.pos.set(_pos)

  this.velLimit = 14;
  this.vel = createVector(0, 0);
  this.vel.set(_dir);
  this.vel.setMag(this.velLimit);

  this.update = function() {
    this.pos.add(this.vel);
    checkBorders(this);
    this.travelDist += this.velLimit;

    return (this.travelDist >= this.maxDistance);
  }

  this.show = function() {
    stroke(255);
    strokeWeight(6);

    point(this.pos.x, this.pos.y);
  }
}
