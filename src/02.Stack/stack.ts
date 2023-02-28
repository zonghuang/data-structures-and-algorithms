export default class Stack<T> {
  private count: number;
  private items: any;

  constructor() {
    this.count = 0;
    this.items = {};
  }

  /**
   * 向栈中插入元素
   */
  push(element: T) {
    // 使用 count 变量作为 items 对象的键名，插入的元素则是它的值
    this.items[this.count] = element;
    this.count++;
  }

  /**
   * 移除栈顶的元素，同时返回被移除的元素
   */
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  /**
   * 返回栈顶的元素，但不对栈做任何修改
   */
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  /**
   * 如果栈里没有元素就返回 true，否则返回 false
   */
  isEmpty() {
    return this.count === 0;
  }

  /**
   * 返回栈里的元素个数
   */
  size() {
    return this.count;
  }

  /**
   * 移除栈里的所有元素
   */
  clear() {
    // 方式一
    this.items = {};
    this.count = 0;

    // 方式二
    // while (!this.isEmpty()) {
    //   this.pop();
    // }
  }

  /**
   * 创建一个 toString 方法来打印出栈的内容
   */
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let objString = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}
