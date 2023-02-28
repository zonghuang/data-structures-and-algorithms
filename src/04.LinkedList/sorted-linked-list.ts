import {
  Compare,
  defaultCompare,
  defaultEquals,
  CompareFunction,
  EqualsFunction
} from '../utils/index';
import LinkedList from './linked-list';

export default class SortedLinkedList<T> extends LinkedList<T> {
  constructor(
    protected equalsFn: EqualsFunction<T> = defaultEquals,
    protected compareFn: CompareFunction<T> = defaultCompare
  ) {
    super(equalsFn);
  }

  /**
   * 向链表尾部添加一个新元素
   */
  push(element: T) {
    if (this.isEmpty()) {
      super.push(element);
    } else {
      const index = this.getIndexNextSortedElement(element);
      super.insert(element, index);
    }
  }

  /**
   * 向链表的特定位置插入一个新的元素
   */
  insert(element: T, index: number = 0) {
    if (this.isEmpty()) {
      return super.insert(element, 0);
    }
    index = this.getIndexNextSortedElement(element);
    return super.insert(element, index);
  }

  /**
   * 获取插入元素的位置
   */
  private getIndexNextSortedElement(element: T) {
    let current = this.head;
    let i = 0;

    for (; i < this.size() && current; i++) {
      const comp = this.compareFn(element, current.element);
      if (comp === Compare.LESS_THAN) {
        return i;
      }
      current = current.next;
    }

    return i;
  }
}
