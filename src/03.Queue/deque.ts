export default class Deque<T> {
  private count: number; // 队列的大小
  private lowestCount: number; // 第一个元素的索引
  private items: any;

  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  /**
   * 在双端队列前端添加新的元素
   */
  addFront(element: T) {
    if (this.isEmpty()) {
      this.addBack(element);
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = element;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.items[0] = element;
    }
  }

  /**
   * 在双端队列后端添加新的元素
   */
  addBack(element: T) {
    this.items[this.count] = element;
    this.count++;
  }

  /**
   * 从双端队列前端移除第一个元素，并返回被移除的元素
   */
  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  /**
   * 从双端队列后端移除第一个元素，并返回被移除的元素
   */
  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  /**
   * 返回双端队列前端的第一个元素
   */
  peekFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  /**
   * 返回双端队列后端的第一个元素
   */
  peekBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  /**
   * 判断双端队列是否为空
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * 返回双端队列包含的元素个数
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
    if (this.isEmpty()) {
      return '';
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}
