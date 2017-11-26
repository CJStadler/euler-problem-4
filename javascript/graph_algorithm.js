function graph_algorithm(n, algorithm_function, container_selector) {
  var svg = init_graph(container_selector, n);

  var multiplications = [];

  var multiply_and_graph = async function(f1, f2) {
    var product = f1 * f2;
    multiplications.push([f1, f2]);
    graph(svg, n, multiplications);
    await sleep(100);

    return product;
  }

  return algorithm_function(n, multiply_and_graph);
}

function init_graph(container_selector, n) {
  var width = 500;

  var svg = d3.select(container_selector).append("svg")
    .attr("width", width)
    .attr('height', 1000);

  init_first_factor_column(svg, n);
  init_second_factor_column(svg, n);

  return svg;
}

function init_first_factor_column(svg, n) {
  var column = svg.append('g')
    .attr('id', 'first-column')
    .attr('height', svg.height)
    .attr('width', 100);

  init_column_factors(column, n);
}

function init_second_factor_column(svg, n) {
  var column = svg.append('g')
    .attr('id', 'second-column')
    .attr('height', svg.height)
    .attr('width', 100)
    .attr('transform', 'translate(200, 0)');

  init_column_factors(column, n);
}

function init_column_factors(column, n) {
  var largest = largest_with_digits(n);
  var smallest = smallest_with_digits(n);

  var scale = d3.scaleLinear()
    .domain([largest, smallest])
    .range([50, 1000]);

  var n_digit_numbers = [];
  for (i = largest; i >= smallest; i--) {
    n_digit_numbers.push(i);
  }

  var number_containers = column.selectAll('.number_containers')
    .data(n_digit_numbers)
    .enter()
    .append('g')
    .attr('transform', function(d) { return `translate(0, ${scale(d)})`; })

  number_containers.append('text')
    .attr('font-size', '10')
    .text(function(d) { return d; });

  number_containers.append('circle')
    .attr('cy', -2)
    .attr('cx', 20)
    .attr('r', 2);
}

function graph(svg, n, multiplications) {
  var largest = largest_with_digits(n);
  var smallest = smallest_with_digits(n);

  var scale = d3.scaleLinear()
    .domain([largest, smallest])
    .range([50, 1000]);

  var product_lines = svg
    .selectAll('.product-lines')
    .data(multiplications);

  // Update

  // Enter
  product_lines.enter()
    .append("line")
    .classed('product-line', true)
    .attr('stroke-width', 1)
    .attr('stroke', 'black')
    .attr('x1', 20)
    .attr('x2', 220)
    .attr('y1', function(d) { return scale(d[0]); })
    .attr('y2', function(d) { return scale(d[1]); });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
