function graph_algorithm(n, algorithm_function, container_selector) {
  var svg = init_graph(container_selector, n);

  var multiplications = [];

  var multiply_and_graph = function(f1, f2) {
    var product = f1 * f2;

    multiplications.push([f1, f2]);
    graph(svg, multiplications);

    return product;
  };

  return algorithm_function(n, multiply_and_graph);
}

function init_graph(container_selector, n) {
  var margin = {top: 20, right: 20, bottom: 20, left: 35},
    width = 500 - margin.left - margin.right,
    height = 340 - margin.top - margin.bottom;

  var svg = d3.select(container_selector).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  return svg;
}

function graph(svg, multiplications) {
  console.log(multiplications.length);
  var products = svg.selectAll('.product').data(multiplications);

  // Update

  // Enter
  products.enter().append("text")
    .classed('product', true)
    .text(function(d) { return `${d[0]}*${d[1]}=${d[0]*d[1]}`; })
    .attr('dx', 100)
    .attr('dy', function(d, i) { return i*50; });
}
