import { defaultToString } from '../utils/index';
import { ValuePair } from '../models/value-pair';

export default class HashTable<K, V> {
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
   * 创建更好的散列函数
   */
  private djb2HashCode(key: K) {
    const tableKey = this.toStrFn(key);
    let hash = 5381;
    for (let i = 0; i < tableKey.length; i++) {
      hash = hash * 33 + tableKey.charCodeAt(i);
    }
    return hash % 1013;
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
      const hash = this.hashCode(key);
      this.table[hash] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  /**
   * 从散列表中检索一个值
   */
  get(key: K) {
    const hash = this.hashCode(key);
    const valuePair = this.table[hash];
    return valuePair == null ? undefined : valuePair.value;
  }

  /**
   * 从散列表中移除一个值
   */
  remove(key: K) {
    const hash = this.hashCode(key);
    const valuePair = this.table[hash];
    if (valuePair != null) {
      delete this.table[hash];
      return true;
    }
    return false;
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
      objString = `${objString},{${keys[0]} => ${this.table[keys[i]].toString()}}`;
    }
    return objString;
  }
}
