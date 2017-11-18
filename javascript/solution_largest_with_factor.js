function solution_largest_with_factor(n) {
  var largest = largest_with_digits(n);
  var smallest = smallest_with_digits(n);
  var palindromes = [];
  var multiplications = 0;

  var first_factor = largest;

  while (first_factor >= smallest) {
    var second_factor = first_factor;

    while (second_factor >= smallest) {
      var product = first_factor * second_factor;
      multiplications += 1;

      if (is_palindrome(product)) {
        palindromes.push(product);
        break;
      }

      second_factor -= 1;
    }

    first_factor -= 1;
  }

  console.log(multiplications);
  return palindromes.sort(function(a, b) { return a-b }).reverse()[0];
}