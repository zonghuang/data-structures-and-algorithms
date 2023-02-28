import { defaultEquals, EqualsFunction } from '../utils/index';
import { Node } from '../models/linked-list-node';
import LinkedList from './linked-list';

export default class CircularLinkedList<T> extends LinkedList<T> {
  constructor(protected equalsFn: EqualsFunction<T> = defaultEquals) {
    super(equalsFn);
  }

  /**
   * 向链表尾部添加一个新元素
   */
  push(element: T) {
    const node = new Node(element);
    let current;

    if (this.head == null) {
      this.head = node;
    } else {
      current = this.getElementAt(this.size() - 1);
      current.next = node;
    }

    node.next = this.head;
    this.count++;
  }

  /**
   * 向链表的特定位置插入一个新的元素
   */
  insert(element: T, index: number) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      let current = this.head;

      if (index === 0) {
        if (this.head == null) {
          this.head = node;
          node.next = this.head;
        } else {
          node.next = current;
          current = this.getElementAt(this.size() - 1);
          this.head = node;
          current.next = this.head;
        }
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
   * 从链表的特定位置移除一个元素
   */
  removeAt(index: number) {
    if (index >= 0 && index < this.count) {
      let current = this.head;

      if (index === 0) {
        if (this.size() === 1) {
          this.head = undefined;
        } else {
          const removed = this.head;
          current = this.getElementAt(this.size() - 1);
          this.head = this.head.next;
          current.next = this.head;
          current = removed;
        }
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
}
