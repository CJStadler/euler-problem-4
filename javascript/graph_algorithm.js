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
  var width = 500;

  var svg = d3.select(container_selector).append("svg")
    .attr("width", width);

  init_first_factor_column(svg, n);
  init_second_factor_column(svg, n);

  return svg;
}

function init_first_factor_column(svg, n) {
  var column = svg.append('g')
    .attr('id', 'first-column')
    .attr('width', 100);

  init_column_factors(column, n)
}

function init_column_factors(column, n) {
  var largest = largest_with_digits(n);
  var smallest = smallest_with_digits(n);

  var n_digit_numbers = [];
  for (i = largest; i >= smallest; i--) {
    n_digit_numbers.push(i);
  }

  column.selectAll('.number_containers')
    .data(n_digit_numbers)
    .enter()
    .append('g')
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
