export type DiffFunction<T> = (a: T, b: T) => number;

export function defaultDiff<T>(a: T, b: T): number {
  return Number(a) - Number(b);
}
