export default class Queue<T> {
  private count: number; // 队列的大小
  private lowestCount: number; // 第一个元素的索引
  private items: any;

  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  /**
   * 向队列添加元素
   */
  enqueue(element: T) {
    this.items[this.count] = element;
    this.count++;
  }

  /**
   * 移除队列中第一个元素，并返回被移除的元素
   */
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }

    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  /**
   * 返回队列第一个元素
   */
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items[this.lowestCount];
  }

  /**
   * 判断队列是否为空
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * 返回队列包含的元素个数
   */
  size() {
    return this.count - this.lowestCount;
  }

  /**
   * 清空队列
   */
  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  /**
   * 创建 toString 方法
   */
  toString() {
    if (this.isEmpty) {
      return '';
    }

    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}
