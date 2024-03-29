import Stack from '../stack';

/**
 * 平衡圆括号
 */
function parenthesesChecker(symbols: string) {
  const stack = new Stack<string>();
  const opens = '([{';
  const closers = ')]}';
  let balanced = true;
  let index = 0;
  let symbol: string;
  let top: string;

  while (index < symbols.length && balanced) {
    symbol = symbols[index];
    if (opens.indexOf(symbol) >= 0) {
      stack.push(symbol);
    } else {
      if (stack.isEmpty()) {
        balanced = false;
      } else {
        top = stack.pop();
        if (!(opens.indexOf(top) === closers.indexOf(symbol))) {
          balanced = false;
        }
      }
    }
    index++;
  }
  return balanced && stack.isEmpty();
}

console.log('{([])}', parenthesesChecker('{([])}')); // true
console.log('{{([][])}()}', parenthesesChecker('{{([][])}()}')); // true
console.log('[{()]', parenthesesChecker('[{()]')); // false
