/**
 * 记忆化斐波那契数
 */
function fibonacciMemoization(n: number) {
  const memo = [0, 1];
  const fibonacciMem = (n) => {
    if (memo[n] != null) return memo[n];
    return memo[n] = fibonacciMem(n - 1) + fibonacciMem(n - 2);
  };
  return fibonacciMem(n);
}

console.log(fibonacciMemoization(3)); // 2
console.log(fibonacciMemoization(5)); // 5
console.log(fibonacciMemoization(10)); // 55
