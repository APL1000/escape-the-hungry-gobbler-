// Create buttons with consistent style and reuse
function createPlayButton(button) {
  if (button == 0) {
    if (!playButton) {
      playButton = createButton("Play", width / 2 - 75, height / 2 - 60, 150, 75);
      playButton.setStyle({
        textSize: 30,
        fillBg: color("orange"),
        fillBgHover: color("yellow"),
        fillLabel: color(0),
        rounding: 12,
        strokeBg: color(0),
      });
    }
    playButton.visible = true;
    playButton.enabled = true;
  }

  if (button == 1) {
    if (!playButton2) {
      playButton2 = createButton("Play", width / 2 - 60, height / 2 + 60, 150, 75);
      playButton2.setStyle({
        textSize: 30,
        fillBg: color("orange"),
        fillBgHover: color("yellow"),
        fillLabel: color(0),
        rounding: 12,
        strokeBg: color(0),
      });
    }
    playButton2.visible = true;
    playButton2.enabled = true;
  }

  if (button == 2) {
    if (!backButton) {
      backButton = createButton("Back To Menu", width / 2 - 75, height / 2 + 40, 150, 50);
      backButton.setStyle({
        textSize: 30,
        fillBg: color("orange"),
        fillBgHover: color("yellow"),
        fillLabel: color(0),
        rounding: 12,
        strokeBg: color(0),
      });
    }
    backButton.visible = true;
    backButton.enabled = true;
  }

  if (button == 3) {
    if (!leaderboardButton) {
      leaderboardButton = createButton("Leaderboard", width / 2 - 50, height / 2 - 25, 100, 50);
      leaderboardButton.setStyle({
        fillBg: color("orange"),
        fillBgHover: color("yellow"),
        fillLabel: color(0),
        rounding: 12,
        strokeBg: color(0),
      });
    }
    leaderboardButton.visible = true;
    leaderboardButton.enabled = true;
  }

  if (button == 4) {
    if (!saveButton) {
      saveButton = createButton("Save Score", width / 2 - 75, height / 2 + 100, 150, 50);
      saveButton.setStyle({
        textSize: 30,
        fillBg: color("orange"),
        fillBgHover: color("yellow"),
        fillLabel: color(0),
        rounding: 12,
        strokeBg: color(0),
      });
    }
    saveButton.visible = true;
    saveButton.enabled = true;
  }

  if (button == 5) {
    if (!initialsBox) {
      initialsBox = createButton("Play", width / 2 - 50, height / 2 - 60, 150, 75);
      initialsBox.setStyle({
        textSize: 30,
        fillBg: color("orange"),
        fillBgHover: color("yellow"),
        fillLabel: color(0),
        rounding: 12,
        strokeBg: color(0),
      });
    }
    initialsBox.visible = true;
    initialsBox.enabled = true;
  }

  if (button == 6) {
    if (!locationBox) {
      locationBox = createButton("Play", width / 2 - 50, height / 2 - 60, 150, 75);
      locationBox.setStyle({
        textSize: 30,
        fillBg: color("orange"),
        fillBgHover: color("yellow"),
        fillLabel: color(0),
        rounding: 12,
        strokeBg: color(0),
      });
    }
    locationBox.visible = true;
    locationBox.enabled = true;
  }
}

// Winner screen display
function winnerScreen() {
  textAlign(CENTER, CENTER);
  fill(0, 0, 0, 200);
  rect(50, 50, 600, 200);

  textSize(72);
  fill("limegreen");
  text("YOU WIN", width / 2, height / 4);

  textSize(24);
  text("Double tap to play again!", width / 2, height / 2.5);

  gameOver = true;
  drawGui();

  if (currentScreen == "play" && backButton && backButton.isPressed) {
    backButton.visible = false;
    saveButton.visible = false;
    currentScreen = "menu";
    createPlayButton(0);
  }

  if (currentScreen == "play" && saveButton && saveButton.isPressed) {
    updateLeaderboard(
      localStorage.getItem("gobblerplayerInitials"),
      localStorage.getItem("gobblerplayerLocation"),
      score
    );
    currentScreen = "leaderboard";
  }
}

// Loser screen display
function loserScreen() {
  fill(236, 252, 3, 200);
  rect(50, 50, 600, 200);
  fill("red");
  textSize(96);
  textAlign(CENTER, CENTER);
  text("Game Over!", width / 2, height / 4);
  textSize(24);
  text("Double tap to play again!", width / 2, height / 2.5);

  gameOver = true;
  enemySpeed = 0;
  playerSpeed = 0;

  if (currentScreen == "play" && backButton && backButton.isPressed) {
    backButton.visible = false;
    backButton.enabled = false;
    saveButton.visible = false;
    saveButton.enabled = false;
    currentScreen = "menu";
    createPlayButton(0);
  }
  drawGui();

  if (currentScreen == "play" && saveButton && saveButton.isPressed) {
    updateLeaderboard(
      localStorage.getItem("gobblerplayerInitials"),
      localStorage.getItem("gobblerplayerLocation"),
      score
    );
    currentScreen = "leaderboard";
  }
}

// Main play screen
function playScreen() {
  if (currentScreen == "play") {
    image(gameBackground, 0, 0, width, height);

    if (setupTrue == true) {
      selectEnemyPos();
      spawnTripTile();
      displayCountdown();
      spawnPuddles();

      if (start == true) {
        startTime = millis();
        start = false;
      }

      enemySpeed = 3;
      playerSpeed = 5;

      gameStatus = "play";

      loop();
    } else {
      collideTile();
      tripPlayer();

      if (slimePuddles(playerX, playerY)) {
        playerSpeed = 2;
      } else {
        playerSpeed = 5;
      }

      fill(0, 150, 255);
      image(playerFrame, playerX, playerY, 50, 50);

      fill(255, 50, 50);
      image(
        foodMonsterImg,
        enemyX - 30,
        enemyY - 30,
        enemySize + 60,
        enemySize + 60
      );

      if (playerImmune == true) {
        text(((immuneTimer - immuneTime / 100) / 100).toFixed(1), playerX + 40, playerY - 30);
        image(immuneShield, playerX - 5, playerY - 5, 60, 60);
      }

      tripTile.x += tripTile.speedX;
      tripTile.y += tripTile.speedY;

      if (tripTile.x <= 0 || tripTile.x + tripTile.size >= width) {
        tripTile.speedX *= -1;
      }
      if (tripTile.y <= 0 || tripTile.y + tripTile.size >= height) {
        tripTile.speedY *= -1;
      }

      fill("yellow");
      image(toiletImg, tripTile.x - 10, tripTile.y - 10, tripTile.size + 20, tripTile.size + 20);

      if (gameStatus == "play") {
        timer();
        movePlayer();
        spawnBoxes();
        drawBoxes();

        let dx = playerX - enemyX;
        let dy = playerY - enemyY;
        let distance = dist(enemyX, enemyY, playerX, playerY);

        if (distance > 0) {
          enemyX += (dx / distance) * enemySpeed;
          enemyY += (dy / distance) * enemySpeed;
        }

        if (
          collides(playerX, playerY, playerSize, enemyX, enemyY, enemySize) &&
          playerImmune != true
        ) {
          gameStatus = "lose";
          createPlayButton(2);
          createPlayButton(4);
        }
      }
    }

    if (gameStatus == "win") {
      winnerScreen();
    }
    if (gameStatus == "lose") {
      loserScreen();
    }
    if (playerImmune == true) {
      immuneDuration();
    }
  }
}

// Main menu display and interaction
function drawMenu() {
  if (currentScreen == "menu") {
    if (initialsInput) initialsInput.hide();
    if (locationSelect) locationSelect.hide();

    try {
      if (backButton) {
        backButton.visible = false;
        backButton.enabled = false;
      }
      if (saveButton) {
        saveButton.visible = false;
        saveButton.enabled = false;
      }
    } catch {}

    try {
      if (playButton2) {
        playButton2.visible = false;
        playButton2.enabled = false;
      }
    } catch {}

    try {
      if (initialsBox) {
        initialsBox.visible = false;
        initialsBox.enabled = false;
      }
      if (locationBox) {
        locationBox.visible = false;
        locationBox.enabled = false;
      }
    } catch {}

    image(menuBackground, 0, 0, width, height);

    stroke("black");
    strokeWeight(3);
    fill("yellow");
    textAlign(CENTER, CENTER);
    textSize(60);
    text("Escape the Hungry \n Gobbler", width / 2, 120);

    drawGui();

    if (leaderboardButton) {
      leaderboardButton.draw();
      leaderboardButton.onPress = function() {
        currentScreen = "leaderboard";
        leaderboardScreen();
      };
    }

    if (playButton) {
      playButton.draw();
    }

    if (currentScreen == "menu" && playButton && playButton.isPressed) {
      currentScreen = "select";
      strokeWeight(1);
      playButton.visible = false;
      createPlayButton(1);
    }
  }
}

// Player initials and location selection screen
function selectScreen() {
  if (currentScreen == "select") {
    if (!dataLoaded) {
      positionInputs();

      const savedInitials = localStorage.getItem("gobblerplayerInitials");
      const savedLocation = localStorage.getItem("gobblerplayerLocation");

      if (initialsInput && savedInitials) initialsInput.value(savedInitials);
      if (locationSelect && savedLocation) locationSelect.value(savedLocation);

      createPlayButton(5);
      createPlayButton(6);

      dataLoaded = true;
    }

    const initials = initialsInput ? initialsInput.value().trim() : "";
    const location = locationSelect ? locationSelect.value() : "";

    image(gameBackground, 0, 0, width, height);

    stroke("black");
    strokeWeight(3);
    fill("yellow");
    text(" Enter your initials \n and location!", width / 2, height / 2 - 100);

    if (initialsInput) initialsInput.show();
    if (locationSelect) locationSelect.show();

    drawGui();

    if (initialsBox && initialsBox.isPressed && initialsInput) {
      initialsInput.elt.focus();
    }

    if (locationBox && locationBox.isPressed && locationSelect) {
      locationSelect.elt.focus();
    }

    if (playButton2 && playButton2.isPressed) {
      if (initials.length >= 3 && location != "") {
        localStorage.setItem("gobblerplayerInitials", initials);
        localStorage.setItem("gobblerplayerLocation", location);

        currentScreen = "play";
        strokeWeight(1);

        if (initialsInput) initialsInput.hide();
        if (locationSelect) locationSelect.hide();

        playButton2.visible = false;

        try {
          if (initialsBox) {
            initialsBox.visible = false;
            initialsBox.enabled = false;
          }
          if (locationBox) {
            locationBox.visible = false;
            locationBox.enabled = false;
          }
        } catch {}

        dataLoaded = false;
      } else {
        alert("Please enter 3 initials and select a location!");
      }
    }
  }
}

// Leaderboard data management

// Generate dummy leaderboard and save separately
function generateDummyLeaderboard() {
  const dummyDataKey = "dummyGobblerLeaderboard";
  if (!localStorage.getItem(dummyDataKey)) {
    const sampleInitials = ["AM", "JS", "KT", "LM", "RB", "TD", "CG", "MP", "ZN", "QF"];
    const sampleLocations = ["Canada", "USA", "Japan", "UK", "France", "Germany", "Italy", "Brazil", "India", "Australia"];
    let dummyScores = [];
    for (let i = 0; i < 10; i++) {
      dummyScores.push({
        initials: sampleInitials[Math.floor(Math.random() * sampleInitials.length)],
        location: sampleLocations[Math.floor(Math.random() * sampleLocations.length)],
        score: Math.floor(Math.random() * 90) + 5 // dummy times between 5 and 95 sec capped later
      });
    }
    dummyScores = dummyScores.map(d => ({...d, score: Math.min(d.score, 90)}));
    dummyScores.sort((a,b) => a.score - b.score);
    localStorage.setItem(dummyDataKey, JSON.stringify(dummyScores));
  }
}

// Return merged dummy + real scores sorted ascending, limited to top 10
function getMergedLeaderboard() {
  const dummyDataKey = "dummyGobblerLeaderboard";
  const realDataKey = "gobblerleaderboard";

  let dummyScores = JSON.parse(localStorage.getItem(dummyDataKey)) || [];
  let realScores = JSON.parse(localStorage.getItem(realDataKey)) || [];

  realScores = realScores.filter(entry => entry.score <= 90);

  let merged = [...dummyScores];

  realScores.forEach(real => {
    let idx = merged.findIndex(d => d.initials === real.initials);
    if (idx >= 0) {
      if (real.score < merged[idx].score) merged[idx] = real;
    } else {
      merged.push(real);
    }
  });

  merged.sort((a,b) => a.score - b.score);

  return merged.slice(0, 10);
}

// Save player score updating real leaderboard
function updateLeaderboard(initials, location, score) {
  if (!initials || !location || typeof score !== "number") return;
  if (score > 90) score = 90;

  const realDataKey = "gobblerleaderboard";
  let realScores = JSON.parse(localStorage.getItem(realDataKey)) || [];

  let existing = realScores.find(e => e.initials === initials);

  if (existing) {
    if (score < existing.score) existing.score = score;
    existing.location = location;
  } else {
    realScores.push({initials, location, score});
  }

  realScores = realScores.filter(e => e.score <= 90);
  realScores.sort((a,b) => a.score - b.score);

  if (realScores.length > 10) realScores = realScores.slice(0,10);

  localStorage.setItem(realDataKey, JSON.stringify(realScores));
}

// Leaderboard display screen combining dummy and player scores
function leaderboardScreen() {
  if (currentScreen !== "leaderboard") return;

  generateDummyLeaderboard();

  let leaderboard = getMergedLeaderboard();

  stroke('black');
  strokeWeight(4);
  fill("white");
  image(trophyRoom, 0, 0, width, height);

  if (initialsInput) initialsInput.hide();
  if (locationSelect) locationSelect.hide();
  if (saveButton) { saveButton.visible = false; saveButton.enabled = false; }
  if (playButton) { playButton.visible = false; playButton.enabled = false; }
  if (playButton2) { playButton2.visible = false; playButton2.enabled = false; }

  push();
  noStroke();
  fill(0, 0, 0, 180);
  rect(width / 2 - 370, 60, 320, 400, 20);
  rect(width / 2 + 110, 60, 320, 400, 20);
  pop();

  drawGui();

  fill("yellow");
  textAlign(CENTER);
  textSize(28);
  text("🏆 Daily Leaderboard 🏆", width / 2, 40);
  textSize(22);

  fill("white");
  const leftX = width / 5;
  const rightX = (width / 5) * 4;
  const startY = 100;
  const lineSpacing = 75;

  for (let i = 0; i < leaderboard.length; i++) {
    const entry = leaderboard[i];
    const colX = i < 5 ? leftX : rightX;
    const rowY = startY + (i % 5) * lineSpacing;
    text(`${i + 1}. ${entry.initials} - ${entry.location}\nScore: ${entry.score}s`, colX, rowY);
  }

  if (backButton && backButton.isPressed) {
    currentScreen = "menu";
    createPlayButton(0);
  }
}
