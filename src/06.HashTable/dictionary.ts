import { defaultToString } from '../utils/index';
import { ValuePair } from '../models/value-pair';

export default class Dictionary<K, V> {
  private table: { [key: string]: ValuePair<K, V> };

  constructor(private toStrFn: (key: K) => string = defaultToString) {
    this.table = {};
  }

  /**
   * 检测一个键是否存在于字典中
   */
  hasKey(key: K) {
    const tableKey = this.toStrFn(key);
    return this.table[tableKey] != null;
  }

  /**
   * 在字典中和 ValuePair 类中设置键和值
   */
  set(key: K, value: V) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key);
      this.table[tableKey] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  /**
   * 从字典中检索一个值
   */
  get(key: K) {
    const valuePair = this.table[this.toStrFn(key)];
    return valuePair == null ? undefined : valuePair.value;
  }

  /**
   * 从字典中移除一个值
   */
  remove(key: K) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }

  /**
   * 返回字典所包含的所有键名
   */
  keys(): K[] {
    return this.keyValues().map((valuePair) => valuePair.key);
  }

  /**
   * 返回字典所包含的所有数值
   */
  values(): V[] {
    return this.keyValues().map((valuePair) => valuePair.value);
  }

  /**
   * 返回字典中所有[键, 值]对
   */
  keyValues(): ValuePair<K, V>[] {
    return Object.values(this.table);
  }

  /**
   * 迭代字典中所有的键值对
   */
  forEach(callbackFn: (key: K, value: V) => any) {
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
      if (result === false) {
        break;
      }
    }
  }

  /**
   * 返回字典中值的个数
   */
  size() {
    return Object.keys(this.table).length;
  }

  /**
   * 检验字典是否为空
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * 清空字典内容
   */
  clear() {
    this.table = {};
  }

  /**
   * 创建 toString 方法
   */
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const valuePairs = this.keyValues();
    let objString = `${valuePairs[0].toString}`;
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString}, ${valuePairs[i].toString()}`;
    }
    return objString;
  }
}
