export function swap(array: any[], a: number, b: number) {
  // const temp = array[a];
  // array[a] = array[b];
  // array[b] = temp;

  [array[a], array[b]] = [array[b], array[a]];
}
