function best_solution(n) {
  var largest_palindrome = 0;
  var multiplications = 0;

  var smallest = smallest_with_digits(n);
  var larger_factor = largest_with_digits(n);
  var product;

  do {
    var smaller_factor = larger_factor;

    do {
      product = larger_factor * smaller_factor;

      if (is_palindrome(product) && product > largest_palindrome) {
        largest_palindrome = product;
        smallest = smaller_factor + 1;
      }

      multiplications += 1;
      smaller_factor -= 1;
    } while (smaller_factor >= smallest && !is_palindrome(product));

    larger_factor -= 1;
  } while (larger_factor >= smallest && product >= largest_palindrome);

  return largest_palindrome;
}
