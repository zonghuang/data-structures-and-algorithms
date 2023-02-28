import { defaultEquals, EqualsFunction } from '../utils/index';
import { Node } from '../models/linked-list-node';

export default class LinkedList<T> {
  protected count = 0;
  protected head: Node<T> | undefined;

  constructor(protected equalsFn: EqualsFunction<T> = defaultEquals) {}

  /**
   * 向链表尾部添加一个新元素
   */
  push(element: T) {
    const node = new Node(element);
    let current;

    if (this.head == null) {
      this.head = node;
    } else {
      current = this.head;

      while (current.next != null) {
        current = current.next;
      }

      current.next = node;
    }
    this.count++;
  }

  /**
   * 向链表的特定位置插入一个新的元素
   */
  insert(element: T, index: number) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);

      if (index === 0) {
        const current = this.head;
        node.next = current;
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  /**
   * 返回链表中特定位置的元素
   */
  getElementAt(index: number) {
    if (index >= 0 && index <= this.count) {
      let node = this.head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined;
  }

  /**
   * 从链表中移除一个元素
   */
  remove(element: T) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  /**
   * 从链表的特定位置移除一个元素
   */
  removeAt(index: number) {
    if (index >= 0 && index < this.count) {
      let current = this.head;

      if (index === 0) {
        this.head = current.next;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }

  /**
   * 返回元素在链表中的索引
   */
  indexOf(element: T) {
    let current = this.head;

    for (let i = 0; i < this.size() && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }

    return -1;
  }

  /**
   * 返回链表的第一个元素
   */
  getHead() {
    return this.head;
  }

  /**
   * 返回链表包含的元素个数
   */
  size() {
    return this.count;
  }

  /**
   * 判断链表是否为空
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * 清空链表
   */
  clear() {
    this.head = null;
    this.count = 0;
  }

  /**
   * 创建 toString 方法
   */
  toString() {
    if (this.head == null) {
      return '';
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }
}
