/**
 * 递归求斐波那契数
 */
function fibonacci(n: number) {
  if (n < 1) return 0;
  if (n <= 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(3)); // 2
console.log(fibonacci(5)); // 5
console.log(fibonacci(10)); // 55
