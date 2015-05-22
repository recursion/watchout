// start slingin' some d3 here.

var enemies = [];
for (var i = 0; i <= 25; i++) {
  enemies.push(0);
}


var width = 960,
  height = 500;

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);
// .append("g");
// .attr("transform", "translate(32," + (height / 2) + ")");


var update = function(data) {
  var enemies = svg.selectAll("circle")
    .data(data);

  enemies.attr("class", "enemies");

  enemies.enter().append("circle")
    .attr("r", 10)
    .attr("cx", width / 2)
    .attr("cy", height / 2);
  // .attr("cx", Math.floor(Math.random() * (width - 0)))
  // .attr("cy", Math.floor(Math.random() * (height - 0)));
  // .circle(function(d) {
  //   return d;
  // });

  enemies.attr("cx", function() {
    return Math.floor(Math.random() * (width - 0));
  });
  enemies.attr("cy", function() {
    return Math.floor(Math.random() * (height - 0));
  });

};
update(enemies);

