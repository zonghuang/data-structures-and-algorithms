import Deque from '../deque';

/**
 * 回文检查器
 * 回文是正反都能读通的单词、词组、数或一系列字符的序列，例如 madam 或 racecar
 */
export function palindromeChecker(aString: string) {
  if (aString === undefined || aString === null || (aString !== null && aString.length === 0)) {
    return false;
  }

  const deque = new Deque<string>();
  const lowerString = aString.toLocaleLowerCase().split(' ').join('');
  let firstChar: string;
  let lastChar: string;

  for (let i = 0; i < lowerString.length; i++) {
    deque.addBack(lowerString.charAt(i));
  }

  while (deque.size() > 1) {
    firstChar = deque.removeFront();
    lastChar = deque.removeBack();
    if (firstChar !== lastChar) {
      return false;
    }
  }

  return true;
}
