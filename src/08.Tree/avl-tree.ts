import { Node } from '../models/node';
import { Compare, defaultCompare, CompareFunction } from '../utils/compare';
import BinarySearchTree from './binary-search-tree';

enum BalanceFactor {
  UNBALANCED_RIGHT = 1,
  SLIGHTLY_UNBALANCED_RIGHT = 2,
  BALANCED = 3,
  SLIGHTLY_UNBALANCED_LEFT = 4,
  UNBALANCED_LEFT = 5
}

export class AVLTree<T> extends BinarySearchTree<T> {
  constructor(protected compareFn: CompareFunction<T> = defaultCompare) {
    super(compareFn);
  }

  /**
   * 节点高度
   */
  private getNodeHeight(node: Node<T>): number {
    if (node == null) {
      return -1;
    }
    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
  }

  /**
   * 计算树的平衡因子
   */
  private getBalanceFactor(node: Node<T>) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  /**
   * Left left case: rotate right
   *
   *       b                           a
   *      / \                         / \
   *     a   e -> rotationLL(b) ->   c   b
   *    / \                             / \
   *   c   d                           d   e
   *
   */
  private rotationLL(node: Node<T>) {
    const temp = node.left;
    node.left = temp.right;
    temp.right = node;
    return temp;
  }

  /**
   * Right right case: rotate left
   *
   *     a                              b
   *    / \                            / \
   *   c   b   -> rotationRR(a) ->    a   e
   *      / \                        / \
   *     d   e                      c   d
   *
   */
  private rotationRR(node: Node<T>) {
    const temp = node.right;
    node.right = temp.left;
    temp.left = node;
    return temp;
  }

  /**
   * Left right case: rotate left then right
   */
  private rotationLR(node: Node<T>) {
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }

  /**
   * Right left case: rotate right then left
   */
  private rotationRL(node: Node<T>) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }

  /**
   * 向树中插入一个新的键
   */
  insert(key: T) {
    this.root = this.insertNode(this.root, key);
  }

  protected insertNode(node: Node<T>, key: T) {
    if (node == null) {
      return new Node(key);
    } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key);
    } else {
      return node; // duplicated key
    }

    // verify if tree is balanced
    const balanceFactor = this.getBalanceFactor(node);

    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        // Left left case
        node = this.rotationLL(node);
      } else {
        // Left right case
        return this.rotationLR(node);
      }
    }

    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        // Right right case
        node = this.rotationRR(node);
      } else {
        // Right left case
        return this.rotationRL(node);
      }
    }

    return node;
  }

  protected removeNode(node: Node<T>, key: T) {
    node = super.removeNode(node, key);

    if (node == null) {
      return node;
    }

    // verify if tree is balanced
    const balanceFactor = this.getBalanceFactor(node);

    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      // Left left case
      if (
        this.getBalanceFactor(node.left) === BalanceFactor.BALANCED ||
        this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.rotationLL(node);
      }

      // Left right case
      // eg:
      //     e                              e                               e
      //    / \      rotationRR(node.left) / \        roationLL(node)      / \
      //   c  ...   -> rotationRR(a) ->   c   ...   -> roationLL(c) ->    b   ...
      //  /                              /                               / \
      // a                              b                               a   c
      //  \                            /
      //   b
      if (this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationLR(node);
      }
    }

    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      // Right right case
      if (
        this.getBalanceFactor(node.right) === BalanceFactor.BALANCED ||
        this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.rotationRR(node);
      }

      // Right left case
      // eg:
      //     a                              a                           a
      //    / \     rotationLL(node.right) / \       roationRR(node)   / \
      // ...   b    -> rotationLL(d) ->  ...  b   -> roationRR(b) -> ...  c
      //        \                              \                         / \
      //        d                               c                       b   d
      //       /                                 \
      //      c
      if (this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationRL(node);
      }
    }

    return node;
  }
}
