import Stack from '../stack';

// 初始化 Stack 类
const stack = new Stack();

// 验证栈是否为空
console.log(stack.isEmpty()); // true

// 往栈里添加元素
stack.push(2);
stack.push(5);
stack.push(8);

// 打印栈的内容
console.log(stack.toString());

// 查看栈顶的元素
console.log(stack.peek()); // 8

// 查看栈里的元素个数
console.log(stack.size()); // 3

// 验证栈是否为空
console.log(stack.isEmpty()); // false

// 移除栈顶的元素
console.log(stack.pop()); // 8

// 移除栈里的所有元素
stack.clear();

// 验证栈是否为空 (3种方式)
console.log(stack.isEmpty()); // true
console.log(stack.peek()); // undefined
console.log(stack.size()); // 0
