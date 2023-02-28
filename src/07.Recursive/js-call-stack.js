/**
 * js 调用栈
 */
let i = 0;
function recursiveFn() {
  i++;
  recursiveFn();
}

try {
  recursiveFn();
} catch (err) {
  // i = 10959 error: RangeError: Maximum call stack size exceeded
  console.log('i = ' + i + ' error: ' + err);
}
