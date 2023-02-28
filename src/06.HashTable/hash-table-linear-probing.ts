import { defaultToString } from '../utils/index';
import { ValuePair } from '../models/value-pair';

export default class HashTableLinearProbing<K, V> {
  protected table: { [key: string]: ValuePair<K, V> };

  constructor(protected toStrFn: (key: K) => string = defaultToString) {
    this.table = {};
  }

  /**
   * 创建散列函数
   */
  private loseloseHashCode(key: K) {
    if (typeof key === 'number') {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }

  /**
   * 检测一个键是否存在于散列表中
   */
  hashCode(key: K) {
    return this.loseloseHashCode(key);
  }

  /**
   * 在散列表中和 ValuePair 类中设置键和值
   */
  put(key: K, value: V) {
    if (key != null && value != null) {
      const position = this.hashCode(key);

      if (this.table[position] == null) {
        this.table[position] = new ValuePair(key, value);
      } else {
        let index = position + 1;
        while (this.table[index] != null) {
          index++;
        }
        this.table[index] = new ValuePair(key, value);
      }
      return true;
    }
    return false;
  }

  /**
   * 从散列表中检索一个值
   */
  get(key: K) {
    const position = this.hashCode(key);

    if (this.table[position] != null) {
      if (this.table[position].key === key) {
        return this.table[position].value;
      }
      let index = position + 1;
      while (this.table[index] != null && this.table[index].key !== key) {
        index++;
      }
      if (this.table[index] != null && this.table[index].key === key) {
        return this.table[position].value;
      }
    }
    return undefined;
  }

  /**
   * 从散列表中移除一个值
   */
  remove(key: K) {
    const position = this.hashCode(key);

    if (this.table[position] != null) {
      if (this.table[position].key === key) {
        delete this.table[position];
        this.verifyRemoveSideEffect(key, position);
        return true;
      }
      let index = position + 1;
      while (this.table[index] != null && this.table[index].key !== key) {
        index++;
      }
      if (this.table[index] != null && this.table[index].key === key) {
        delete this.table[index];
        this.verifyRemoveSideEffect(key, index);
        return true;
      }
    }
    return false;
  }

  private verifyRemoveSideEffect(key: K, removedPosition: number) {
    const hash = this.hashCode(key);
    let index = removedPosition + 1;
    while (this.table[index] != null) {
      const posHash = this.hashCode(this.table[index].key);
      if (posHash <= hash || posHash <= removedPosition) {
        this.table[removedPosition] = this.table[index];
        delete this.table[index];
        removedPosition = index;
      }
      index++;
    }
  }

  /**
   * 返回散列表中值的个数
   */
  size() {
    return Object.keys(this.table).length;
  }

  /**
   * 检验散列表是否为空
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * 清空散列表内容
   */
  clear() {
    this.table = {};
  }

  /**
   * 返回散列表
   */
  getTable() {
    return this.table;
  }

  /**
   * 创建 toString 方法
   */
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const keys = Object.keys(this.table);
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[keys[i]].toString()}}`;
    }
    return objString;
  }
}
