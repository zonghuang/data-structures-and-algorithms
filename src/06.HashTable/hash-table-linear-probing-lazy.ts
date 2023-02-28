import { defaultToString } from '../utils/index';
import { ValuePairLazy } from '../models/value-pair-lazy';

export default class HashTableLinearProbingLazy<K, V> {
  protected table: { [key: string]: ValuePairLazy<K, V> };

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
   * 在散列表中和 ValuePairLazy 类中设置键和值
   */
  put(key: K, value: V) {
    if (key != null && value != null) {
      const hash = this.hashCode(key);

      if (this.table[hash] == null || (this.table[hash] != null && this.table[hash].isDeleted)) {
        this.table[hash] = new ValuePairLazy(key, value);
      } else {
        let index = hash + 1;
        while (this.table[index] != null && !this.table[hash].isDeleted) {
          index++;
        }
        this.table[index] = new ValuePairLazy(key, value);
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
      if (this.table[position].key === key && !this.table[position].isDeleted) {
        return this.table[position].value;
      }
      let index = position + 1;
      while (
        this.table[index] != null &&
        (this.table[index].key !== key || this.table[index].isDeleted)
      ) {
        if (this.table[index].key === key && this.table[index].isDeleted) {
          return undefined;
        }
        index++;
      }
      if (
        this.table[index] != null &&
        this.table[index].key === key &&
        !this.table[index].isDeleted
      ) {
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
      if (this.table[position].key === key && !this.table[position].isDeleted) {
        this.table[position].isDeleted = true;
        return true;
      }
      let index = position + 1;
      while (
        this.table[index] != null &&
        (this.table[index].key !== key || this.table[index].isDeleted)
      ) {
        index++;
      }
      if (
        this.table[index] != null &&
        this.table[index].key === key &&
        !this.table[index].isDeleted
      ) {
        this.table[index].isDeleted = true;
        return true;
      }
    }
    return false;
  }

  /**
   * 返回散列表中值的个数
   */
  size() {
    let count = 0;
    Object.values(this.table).forEach((valuePair) => {
      count += valuePair.isDeleted === true ? 0 : 1;
    });
    return count;
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
