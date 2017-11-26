async function solution_stopping_at_largest_for_factor(n, multiply) {
  var largest = largest_with_digits(n);
  var smallest = smallest_with_digits(n);
  var palindromes = [];
  var multiplications = 0;

  var first_factor = largest;

  while (first_factor >= smallest) {
    var second_factor = first_factor;

    var product = first_factor * second_factor;

    while (second_factor >= smallest && !is_palindrome(product)) {
      product = await multiply(first_factor, second_factor);
      multiplications += 1;
      second_factor -= 1;
    }

    if (is_palindrome(product)) {
      palindromes.push(product);
    }

    first_factor -= 1;
  }

  return palindromes.sort(function(a, b) { return a-b; }).reverse()[0];
}
