// start slingin' some d3 here.

var enemies = [];
for (var i = 0; i <= 25; i++) {
  enemies.push(0);
}

var player = [0];

var width = 960,
  height = 500;

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);
// .append("g");
  // .attr("transform", "translate(32," + (height / 2) + ")");

////////////////////////////////////////////////////////

var drag = d3.behavior.drag()
  .origin(function(d) {
    return d;
  })
  .on("dragstart", dragstarted)
  .on("drag", dragged)
  .on("dragend", dragended);

function dragstarted(d) {
  d3.event.sourceEvent.stopPropagation();
  d3.select(this).classed("dragging", true);
}

function dragged(d) {
  var p = d3.select(this);
  d3.select(this)
    .attr("x", function(d) {
      return +p.attr("x") + d3.event.dx;
    })
    .attr("y", function(d) {
     return +p.attr("y") + d3.event.dy;
   });
}

function dragended(d) {
  d3.select(this).classed("dragging", false);
}
// function dragmove(d) {
//   console.log(this.x, d3.event.dx);
//   d3.select(this)
//       .attr("x",  function(d, i) {
//         console.log("x:", i);
//         return d + d3.event.dx;
//       })
//       .attr("y",  function(d, i ) {
//         console.log("y: ", i);
//         return d + d3.event.dy;});
// }


//////////////////////////////////////////////////////

var update = function(enemy, hero) {
  var enemies = svg.selectAll("circle")
    .data(enemy);

  enemies.attr("class", "enemies");

  enemies.enter().append("circle")
    .attr("r", 10)
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



  enemies.attr("cx", function() {
    return Math.floor(Math.random() * (width - 0));
  });
  enemies.attr("cy", function() {
    return Math.floor(Math.random() * (height - 0));
  });


};
update(enemies, player);

setInterval(function() {
      update(enemies, player);
    }, 1000 );



