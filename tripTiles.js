tripTile = { x: 100, y: 100, size: 50, speedX: 1.5, speedY: 1 };

function collideTile() {
  if (
    collides(
      playerX,
      playerY,
      playerSize,
      tripTile.x,
      tripTile.y,
      tripTile.size
    ) &&
    tripCooldown == false
  ) {
    playerFrozen = "trip";
    tripCooldown = true;
    setTimeout(() => {
      tripCooldown = false;
    }, 2000);
  }
}

function tripPlayer() {
  if (playerFrozen == "trip") {
    playerFrozen = "tripping";
    tripCount = 5;
  }
  if (playerFrozen == "tripping") {
    if (tripCount > 0) {
      playerX += lastMove.x;
      playerY += lastMove.y;
      tripCount -= 1;
      playerAnimation += 2;
    } else {
      playerFrozen = true;
      setTimeout(() => {
        playerFrozen = false;
      }, 1000);
    }
  }
}

function spawnTripTile() {
  let safeDistance = 100; // how far from player it must spawn

  // Keep finding a random spot until it's far enough
  do {
    tripTile.x = random(width - tripTile.size);
    tripTile.y = random(height - tripTile.size);
  } while (dist(playerX, playerY, tripTile.x, tripTile.y) < safeDistance);

  // Random direction (between -3 and 3, excluding very slow)
  tripTile.speedX = random([-2, -1, 1, 2]);
  tripTile.speedY = random([-2, -1, 1, 2]);
}

function spawnPuddles() {
  // Spawn puddles once if not already
  if (puddles.length === 0) {
    for (let i = 0; i < puddleCount; i++) {
      puddles.push({
        x: random(50, width - 50),
        y: random(50, height - 50),
      });
    }
  }
}

function slimePuddles(playerX, playerY) {
  // Draw and check collisions
  let slowed = false;
  for (let puddle of puddles) {
    noStroke();
    fill(100, 220, 100, 180); // slimy green
    image(slimeImg, puddle.x, puddle.y, puddleW, puddleH);
    // Collision detection (simple box style)
    if (collides(playerX, playerY, playerSize, puddle.x, puddle.y, puddleW)) {
      slowed = true;
    }
  }

  // Return whether the player is slowed (so you can apply it easily)
  return slowed;
}
