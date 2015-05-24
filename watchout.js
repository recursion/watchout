// start slingin' some d3 here.

// Initialize globals
var highScore = 0;
var currentScore = 0;
var timer = Date.now();
var collisions = 0;
var numEnemies = 25;

// SVG Element height and width settings
var width = 960,
  height = 500;

// Create our SVG game board
var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

// setup drag behavior
var drag = d3.behavior.drag()
  .origin(function(d) {
    return d;
  })
  .on("drag", dragged);

// Drag handler
function dragged(d) {
  var grabbedPlayer = d3.select(this);
  grabbedPlayer
    .attr("x", function(d) {
      return +grabbedPlayer.attr("x") + d3.event.dx;
    })
    .attr("y", function(d) {
      return +grabbedPlayer.attr("y") + d3.event.dy;
    });
}

var player = svg.selectAll("rect")
    .data([1])
    .enter().append("rect")
    .call(drag)
    .attr("width", 30)
    .attr("height", 30)
    .attr("x", width / 2)
    .attr("y", 0)
    .attr("id", "player")
    .classed("player", true);

// Create and initialize enemies
var enemies = svg.selectAll("circle")
    .data(d3.range(numEnemies))
    .enter().append("circle")
    .attr("r", function(d) {
      return d;
    })
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .classed("enemies", true);



document.getElementById("current").innerHTML = "Current score: " + Math.floor((Date.now() - timer) / 1000);

d3.timer(collisionDetection);
move(enemies);
setInterval(function() {
  scoreboard();
}, 250);

//////////////////////////////////////////////
//      HELPER FUNCTIONS
////////////////////////////////////////////

// Update scoreboard if there is a collision

function scoreboard() {
  currentScore = Math.floor((Date.now() - timer) / 1000);
  highScore = currentScore > highScore ? currentScore : highScore;
  document.getElementById("high").innerHTML = "High score: " + highScore;
  document.getElementById("collisions").innerHTML = "Collisions: " + collisions;
}

function collisionDetection() {
  // grab the player and toss his values into an object we can use to do collision detection
  var player = {};
  var grabbedPlayer = d3.select(".player");
  player.x = +grabbedPlayer.attr("x");
  player.y = +grabbedPlayer.attr("y");
  player.width = 30;
  player.height = 30;

  // grab enemy and toss his values into an object we can use to do collision detection
  enemies.each(function() {
    var enemy = {};
    var grabbedEnemy = d3.select(this);
    enemy.x = +grabbedEnemy.attr("cx");
    enemy.y = +grabbedEnemy.attr("cy");
    enemy.r = +grabbedEnemy.attr("r");

    // check for collisions
    if (leftCollision(enemy, player) && topCollision(enemy, player)) {
      collisions++;
      timer = Date.now();
    }
    if (leftCollision(enemy, player) && bottomCollision(enemy, player)) {
      collisions++;
      timer = Date.now();
    }
    if (rightCollision(enemy, player) && topCollision(enemy, player)) {
      collisions++;
      timer = Date.now();
    }
    if (rightCollision(enemy, player) && bottomCollision(enemy, player)) {
      collisions++;
      timer = Date.now();
    }
  });
}

function move(element) {
  // Enemies transitions
  element
    .transition().duration(1000)
    .style("fill", function() {
      return "rgb(" + randy(0, 255) + ", " + randy(0, 255) + ", " + randy(0, 255) + ")"
    })
    .attr("r", function() {
      return randy(5, 20);
    })
    .attr("cx", function() {
      return randy(0, width);
    })
    .attr("cy", function() {
      return randy(0, height);
    }).each("end", function() {
      move(d3.select(this));
    });
}

// Create a random number between min and max
function randy(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Collision detection
// is enemyX - enemyRadius within (playerX <-> playerX + playerWidth)
function leftCollision(enemy, player) {
  if ((enemy.x - enemy.r) > player.x && (enemy.x - enemy.r) < (player.x + player.width)) {
    return true;
  }
  return false;
}

// is enemyY - enemyRadius within (playerY <-> playerY + playerHeight)
function topCollision(enemy, player) {
  if ((enemy.y - enemy.r) > player.y && (enemy.y - enemy.r) < (player.y + player.height)) {
    return true;
  }
  return false;
}

// is enemyX + enemyRadius within (playerX <-> playerX + playerWidth)
function rightCollision(enemy, player) {
  if ((enemy.x + enemy.r) > player.x && (enemy.x + enemy.r) < (player.x + player.width)) {
    return true;
  }
  return false;
}

// is enemyY + enemyRadius within (playerY <-> playerY + playerHeight)
function bottomCollision(enemy, player) {
  if ((enemy.y + enemy.r) > player.y && (enemy.y + enemy.r) < (player.y + player.height)) {
    return true;
  }
  return false;
}
