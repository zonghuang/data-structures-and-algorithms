export default class StackArray<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  /**
   * 添加一个新元素到栈顶
   */
  push(element: T) {
    this.items.push(element);
  }

  /**
   * 移除栈顶的元素，同时返回被移除的元素
   */
  pop() {
    return this.items.pop();
  }

  /**
   * 返回栈顶的元素，但不对栈做任何修改
   */
  peek() {
    return this.items[this.items.length - 1];
  }

  /**
   * 如果栈里没有元素就返回 true，否则返回 false
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * 返回栈里的元素个数
   */
  size() {
    return this.items.length;
  }

  /**
   * 移除栈里的所有元素
   */
  clear() {
    this.items = [];
  }

  toArray() {
    return this.items;
  }

  /**
   * 创建一个 toString 方法来打印出栈的内容
   */
  toString() {
    return this.items.toString();
  }
}
