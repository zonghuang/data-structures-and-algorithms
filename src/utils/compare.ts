export type CompareFunction<T> = (a: T, b: T) => number;

export enum Compare {
  LESS_THAN = -1,
  BIGGER_THAN = 1,
  EQUALS = 0
}

export function defaultCompare<T>(a: T, b: T): number {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

export function reverseCompare<T>(compareFn: CompareFunction<T>): CompareFunction<T> {
  return (a, b) => compareFn(b, a);
}
