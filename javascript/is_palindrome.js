function is_palindrome(n) {
  var forward = n.toString();
  var backward = n.toString().split('').reverse().join('');
  return forward === backward;
}
