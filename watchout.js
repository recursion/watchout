// start slingin' some d3 here.

// Initialize globals
var player = [0];
var highScore = 0;
var currentScore = 0;
var collisions = 0;

// SVG Element height and width settings
var width = 960,
  height = 500;

// Create and initialize enemies
var enemies = [];
for (var i = 0; i <= 0; i++) {
  enemies.push(Math.floor(Math.random() * (20 - 5) + 5));
}

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

// Main update method - all the action is here
var update = function(enemy, hero) {

  var enemies = svg.selectAll("circle")
    .data(enemy);

  var player = svg.selectAll("rect")
    .data(hero)
    .call(drag);

  enemies.attr("class", "enemies");

  // On enter
  enemies.enter().append("circle")
    .attr("r", function(d) {
      return d;
    })
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .classed("enemies", true);

  player.enter().append("rect")
    .attr("width", 30)
    .attr("height", 30)
    .attr("x", width / 2)
    .attr("y", 0)
    .attr("id", "player")
    .classed("player", true);

  // Enemies transitions
  enemies
    .transition()
    .duration(1000)
    .tween("collision", function(d) {
      // grab the player and toss his values into an object we can use to do collision detection
      var player = {};
      var grabbedPlayer = d3.select(".player");
      player.x = +grabbedPlayer.attr("x");
      player.y = +grabbedPlayer.attr("y");
      player.width = 30;
      player.height = 30;

      // grab enemy and toss his values into an object we can use to do collision detection
      var enemy = {};
      var grabbedEnemy = d3.select(this);
      enemy.x = +grabbedEnemy.attr("cx");
      enemy.y = +grabbedEnemy.attr("cy");
      enemy.r = +grabbedEnemy.attr("r");

      // check for collisions
      if (leftCollision(enemy, player) && topCollision(enemy, player)) {
        console.log('BOOM1');
      }
      if (leftCollision(enemy, player) && bottomCollision(enemy, player)) {
        console.log('BOOM2');
      }
      if (rightCollision(enemy, player) && topCollision(enemy, player)) {
        console.log('BOOM3');
      }
      if (rightCollision(enemy, player) && bottomCollision(enemy, player)) {
        console.log('BOOM4');
      }

    })
    .style("fill", function() {
      return "rgb(" + randy(0, 255) + ", " + randy(0, 255) + ", " + randy(0, 255) + ")"
    })
    // .attr("r", function() { return Math.floor(Math.random() * (20 - 5) + 5); })
    // .attr("cx", function() {
    //   return Math.floor(Math.random() * (width - 0));
    // })
    // .attr("cy", function() {
    //   return Math.floor(Math.random() * (height - 0));
    // });
};

// get this party started
update(enemies, player);

// keep in going!
setInterval(function() {
  update(enemies, player);
}, 1000);

//////////////////////////////////////////////
//      HELPER FUNCTIONS
////////////////////////////////////////////

// Create a random number between min and max
function randy(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

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
};

// Collision detection
// is enemyX - enemyRadius within (playerX <-> playerX + playerWidth)
function leftCollision(enemy, player) {
  if ((enemy.x - enemy.r) > player.x && (enemy.x - enemy.r) < (player.x + player.width)) {
    return true;
  }
  return false;
};

// is enemyY - enemyRadius within (playerY <-> playerY + playerHeight)
function topCollision(enemy, player) {
  if ((enemy.y - enemy.r) > player.y && (enemy.y - enemy.r) < (player.y + player.height)) {
    return true;
  }
  return false;
};

// is enemyX + enemyRadius within (playerX <-> playerX + playerWidth)
function rightCollision(enemy, player) {
  if ((enemy.x + enemy.r) > player.x && (enemy.x + enemy.r) < (player.x + player.width)) {
    return true;
  }
  return false;
};

// is enemyY + enemyRadius within (playerY <-> playerY + playerHeight)
function bottomCollision(enemy, player) {
  if ((enemy.y + enemy.r) > player.y && (enemy.y + enemy.r) < (player.y + player.height)) {
    return true;
  }
  return false;
};
