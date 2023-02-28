const set = new Set();
set.add(1);
set.add(2);
console.log(set.values());
console.log(set.has(1));
console.log(set.size);
console.log(set.delete(1));
console.log(set.clear());

const setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

const setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);

/**
 * 并集运算
 */
const union = (setA, setB) => {
  const unionSet = new Set();
  setA.forEach((value) => unionSet.add(value));
  setB.forEach((value) => unionSet.add(value));
  return unionSet;
};

console.log(union(setA, setB));

/**
 * 交集运算
 */
const intersection = (setA, setB) => {
  const intersectionSet = new Set();
  setA.forEach((value) => {
    if (setB.has(value)) {
      intersectionSet.add(value);
    }
  });
  return intersectionSet;
};

console.log(intersection(setA, setB));

/**
 * 差运算
 */
const difference = (setA, setB) => {
  const differenceSet = new Set();
  setA.forEach((value) => {
    if (!setB.has(value)) {
      differenceSet.add(value);
    }
  });
  return differenceSet;
};

console.log(difference(setA, setB));

// 使用扩展运算符
// Step 1. 将集合转化为数组
// Step 2. 执行需要的运算
// Step 3. 将结果转化回集合

// 使用扩展运算符进行 并集 运算
const unionSet = new Set([...setA, ...setB]);

// 使用扩展运算符进行 交集 运算
const intersectionSet = new Set([...setA].filter((x) => setB.has(x)));

// 使用扩展运算符进行 差集 运算
const differenceSet = new Set([...setA].filter((x) => !setB.has(x)));

export {};
