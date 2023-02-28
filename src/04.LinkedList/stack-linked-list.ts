import DoublyLinkedList from './doubly-linked-list';

export default class StackLinkedList<T> {
  private items: DoublyLinkedList<T>;

  constructor() {
    this.items = new DoublyLinkedList<T>();
  }

  /**
   * 向链表尾部添加一个新元素
   */
  push(element: T) {
    this.items.push(element);
  }

  /**
   * 从链表尾部移除元素，同时返回被移除的元素
   */
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.removeAt(this.size() - 1);
  }

  /**
   * 返回链表尾部的元素
   */
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.getElementAt(this.size() - 1).element;
  }

  /**
   * 判断链表是否为空
   */
  isEmpty() {
    return this.items.isEmpty();
  }

  /**
   * 返回链表包含的元素个数
   */
  size() {
    return this.items.size();
  }

  /**
   * 清空链表
   */
  clear() {
    this.items.clear();
  }

  /**
   * 创建 toString 方法
   */
  toString() {
    return this.items.toString();
  }
}
