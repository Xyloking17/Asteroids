let player;
let asteroidArray = [];

let BORDER_BUFFER = 4;
let MAX_ASTEROIDS = 7;


function setup() {
	createCanvas(windowWidth, windowHeight);
	player = new Ship(width/2, height/2);
}



function draw() {
	background(0);
	stroke(255);


	player.show();
	player.update();

	for(let i = 0; i < asteroidArray.length; i++) {
		let a = asteroidArray[i];

		a.show();
		a.update();

		for(let j = 0; j < player.bullets.length; j++) {
			let b = player.bullets[j];

			if(a.collisionDetected(b)) {
				a.split();
	      asteroidArray.splice(i, 1);
				player.bullets.splice(j, 1);
			}
		}

		if(!player.isDead && a.collisionDetected(player)) {
			a.split();
			asteroidArray.splice(i, 1);
			player.reset();
		}
	}

	if(!player.isDead) {
		generateAsteroids();
	}
	else {
		stroke(0);
		fill(255);
		textSize(50);
		textAlign(CENTER, CENTER);
		text("Press SPACE to Start", width/2, height/3);
	}

	checkKeys();
}
