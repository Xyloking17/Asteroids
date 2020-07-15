
//checks if a given element is within the screen
//borders, and moves them accordingly
function checkBorders(element) {
  if(element.pos.x < -BORDER_BUFFER){
    element.pos.x = width + BORDER_BUFFER;
  }
  else if(element.pos.x > width + BORDER_BUFFER){
    element.pos.x = -BORDER_BUFFER;
  }

  if(element.pos.y < -BORDER_BUFFER){
    element.pos.y = height + BORDER_BUFFER;
  }
  else if (element.pos.y > height + BORDER_BUFFER){
    element.pos.y = -BORDER_BUFFER;
  }
}



//control handling
function checkKeys() {
  if(!player.isDead) {
    if(keyIsDown(65) || keyIsDown(37)) //"a" || LEFT_ARROW
    player.rotateShip(-1);

    if(keyIsDown(68) || keyIsDown(39)) //"d" || RIGHT_ARROW
    player.rotateShip(1);

    if(keyIsDown(87) || keyIsDown(38)) //"w" || UP_ARROW
    player.applyForce();
  }
}

function keyPressed() {
  switch (keyCode) {
    case 32: //SPACE
      if(!player.isDead)
        player.fire();
      else
        player.isDead = false;
      break;

  }
}

function mouseClicked() {
  if(!player.isDead)
    player.fire();
}
