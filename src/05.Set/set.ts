export default class Set<T> {
  private items: any;

  constructor() {
    this.items = {};
  }

  /**
   * 向集合添加一个新元素
   */
  add(element: T) {
    if (this.has(element)) {
      return false;
    }
    this.items[element] = element;
    return true;
  }

  /**
   * 从集合移除一个元素
   */
  delete(element: T) {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }

  /**
   * 判断元素是否在集合中
   */
  has(element: T) {
    // 不是所有的对象都继承了 Object.prototype，
    // 甚至继承了 Object.prototype 的对象上的 hasOwnProperty 方法也有可能被覆盖
    // return this.items.hasOwnProperty(element)

    // in 运算符则返回表示对象在原型链上是否有特定属性的布尔值

    // 更安全的做法
    // 返回该对象是否具有特定属性的布尔值
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }

  /**
   * 返回集合所包含元素的数量
   */
  size() {
    return Object.keys(this.items).length;
  }

  /**
   * 判断集合是否为空
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * 移除集合中所有的元素
   */
  clear() {
    this.items = {};
  }

  /**
   * 返回集合中所有值（元素）的数组
   */
  values(): T[] {
    return Object.values(this.items);
  }

  /**
   * 并集
   */
  union(otherSet: Set<T>) {
    const unionSet = new Set<T>();

    this.values().forEach((value) => unionSet.add(value));
    otherSet.values().forEach((value) => unionSet.add(value));

    return unionSet;
  }

  /**
   * 交集
   */
  intersection(otherSet: Set<T>) {
    const intersectionSet = new Set<T>();

    const values = this.values();
    const otherValues = otherSet.values();

    let biggerSet = values;
    let smallSet = otherValues;

    if (otherValues.length - values.length > 0) {
      biggerSet = otherValues;
      smallSet = values;
    }

    smallSet.forEach((value) => {
      if (biggerSet.includes(value)) {
        intersectionSet.add(value);
      }
    });

    return intersectionSet;
  }

  /**
   * 差集
   */
  difference(otherSet: Set<T>) {
    const differenceSet = new Set<T>();

    this.values().forEach((value) => {
      if (!otherSet.has(value)) {
        differenceSet.add(value);
      }
    });

    return differenceSet;
  }

  /**
   * 是否为 otherSet 的子集
   */
  isSubsetOf(otherSet: Set<T>) {
    if (this.size() > otherSet.size()) {
      return false;
    }

    let isSubset = true;
    this.values().every((value) => {
      if (!otherSet.has(value)) {
        isSubset = false;
        return false;
      }
      return true;
    });

    return isSubset;
  }

  /**
   * 创建 toString 方法
   */
  toString() {
    if (this.isEmpty()) {
      return '';
    }

    const values = this.values();
    let objString = `${values[0]}`;
    for (let i = 1; i < values.length; i++) {
      objString = `${objString},${values[i].toString()}`;
    }
    return objString;
  }
}
