// start slingin' some d3 here.

var enemies = [];
for (var i = 0; i <= 25; i++) {
  enemies.push(Math.floor(Math.random() * (20 - 5) + 5));
}

var randy = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var player = [0];

var width = 960,
  height = 500;

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);
// .append("g");

var drag = d3.behavior.drag()
  .origin(function(d) {
    return d;
  })

.on("drag", dragged);

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

var update = function(enemy, hero) {

  var enemies = svg.selectAll("circle")
    .data(enemy);

  enemies.attr("class", "enemies");

  enemies.enter().append("circle")
    .attr("r", function(d) { return d;})
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .classed("enemies", true);

  var player = svg.selectAll("rect")
    .data(hero)
    .call(drag);

  player.enter().append("rect")
    .attr("width", 30)
    .attr("height", 30)
    .attr("x", width / 2)
    .attr("y", height / 2)
    .classed("player", true);

  enemies
    .transition()
    .duration(1000)
    .style("fill", function() { return "rgb("+randy(0, 255)+", "+randy(0, 255)+", "+randy(0, 255)+")" })
    .attr("r", function() { return Math.floor(Math.random() * (20 - 5) + 5); })
    .attr("cx", function() {
      return Math.floor(Math.random() * (width - 0));
    })
    .attr("cy", function() {
      return Math.floor(Math.random() * (height - 0));
    });
};

update(enemies, player);

setInterval(function() {
  update(enemies, player);
}, 1000);


