import { Compare, defaultCompare, CompareFunction } from '../utils/compare';
import { Node } from '../models/node';

export default class BinarySearchTree<T> {
  protected root: Node<T>;

  constructor(protected compareFn: CompareFunction<T> = defaultCompare) {}

  /**
   * 获取根节点
   */
  getRoot() {
    return this.root;
  }

  /**
   * 向树中插入一个新的键
   */
  insert(key: T) {
    if (this.root == null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }
  protected insertNode(node: Node<T>, key: T) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      if (node.right == null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }

  /**
   * 在树中查找一个键。
   * 如果节点存在，则返回 true
   * 如果不存在则返回 false
   */
  search(key: T) {
    return this.searchNode(this.root, key);
  }
  protected searchNode(node: Node<T>, key: T): boolean {
    if (node == null) {
      return false;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key);
    }
    // key 等于 node.key
    return true;
  }

  /**
   * 通过中序遍历方式遍历所有节点
   */
  inorderTraverse(callback: Function) {
    this.inorderTraverseNode(this.root, callback);
  }
  protected inorderTraverseNode(node: Node<T>, callback: Function) {
    if (node != null) {
      this.inorderTraverseNode(node.left, callback);
      callback(node.key);
      this.inorderTraverseNode(node.right, callback);
    }
  }

  /**
   * 通过先序遍历方式遍历所有节点
   */
  preorderTraverse(callback: Function) {
    this.preorderTraverseNode(this.root, callback);
  }
  protected preorderTraverseNode(node: Node<T>, callback: Function) {
    if (node != null) {
      callback(node.key);
      this.preorderTraverseNode(node.left, callback);
      this.preorderTraverseNode(node.right, callback);
    }
  }

  /**
   * 通过后序遍历方式遍历所有节点
   */
  postorderTraverse(callback: Function) {
    this.postorderTraverseNode(this.root, callback);
  }
  protected postorderTraverseNode(node: Node<T>, callback: Function) {
    if (node != null) {
      this.postorderTraverseNode(node.left, callback);
      this.postorderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  /**
   * 返回树中最小的值/键
   */
  min() {
    return this.minNode(this.root);
  }
  protected minNode(node: Node<T>) {
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current;
  }

  /**
   * 返回树中最大的值/键
   */
  max() {
    return this.maxNode(this.root);
  }
  protected maxNode(node: Node<T>) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }

  /**
   * 从树中移除某个键
   */
  remove(key: T) {
    this.root = this.removeNode(this.root, key);
  }
  protected removeNode(node: Node<T>, key: T) {
    if (node == null) {
      return null;
    }

    // The key to be deleted is in the left sub-tree
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
      return node;
    }

    // The key to be deleted is in the right sub-tree
    if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
      return node;
    }

    // node is the node to be deleted

    // case 1: a leaf node
    if (node.left == null && node.right == null) {
      node = null;
      return node;
    }

    // case 2: a node with only 1 child
    if (node.left == null) {
      node = node.right;
      return node;
    }
    if (node.right == null) {
      node = node.left;
      return node;
    }

    // case 3: a node with 2 children, get the in-order successor
    const successor = this.minNode(node.right);
    node.key = successor.key;
    node.right = this.removeNode(node.right, successor.key);
    return node;
  }
}
