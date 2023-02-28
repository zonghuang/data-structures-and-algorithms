import Stack from '../stack';

/**
 * 2 ~ 36 的任意进制算法
 */
function baseCnverter(decNumber: number, base: number) {
  const remStack = new Stack();
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let number = decNumber;
  let rem;
  let baseString = '';

  if (!(base >= 2 && base <= 36)) {
    return '';
  }

  while (number > 0) {
    rem = Math.floor(number % base);
    remStack.push(rem);
    number = Math.floor(number / base);
  }

  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()];
  }
  return baseString;
}

console.log(baseCnverter(100345, 2)); // 11000011111111001
console.log(baseCnverter(100345, 8)); // 303771
console.log(baseCnverter(100345, 16)); // 187F9
console.log(baseCnverter(100345, 35)); // 2BW0
