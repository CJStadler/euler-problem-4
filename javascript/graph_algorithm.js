function graph_algorithm(n, algorithm_function, container_id) {
  var svg = init_graph(container_id, n);

  var multiplications = [];

  var multiply_and_graph = function(f1, f2) {
    var product = f1 * f2;

    multiplications.push([f1, f2]);
    graph(svg, multiplications);

    return product;
  };

  algorithm_function(n, multiply_and_graph);
}

function init_graph(container, n) {
  var margin = {top: 20, right: 20, bottom: 20, left: 35},
    width = container.width() - margin.left - margin.right,
    height = 340 - margin.top - margin.bottom;

  var svg = container.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  return svg;
}

function graph(svg, multiplications) {
  var products = svg.selectAll('.product').data(multiplications)

  // Update

  // Enter
}
