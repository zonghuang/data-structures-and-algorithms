/**
 * 迭代求斐波那契数
 */
function fibonacciIterative(n: number) {
  let fibNMinus2 = 0;
  let fibNMinus1 = 1;
  let fibN = n;
  for (let i = 2; i <= n; i++) { // n >= 2
    fibN = fibNMinus1 + fibNMinus2; // f(n-1) + f(n-2)
    fibNMinus2 = fibNMinus1;
    fibNMinus1 = fibN;
  }
  return fibN;
}

console.log(fibonacciIterative(3)); // 2
console.log(fibonacciIterative(5)); // 5
console.log(fibonacciIterative(10)); // 55
