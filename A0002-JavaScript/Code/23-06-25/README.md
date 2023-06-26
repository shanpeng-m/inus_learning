# 2023-06-25 控制语句

## 1. 条件语句

### 1.1 if语句

```javascript
let x = 1;
if (x > 0) {
    console.log('x是正数');
}
```

### 1.2 if...else语句

```javascript
let x = 1;
if (x > 0) {
    console.log('x是正数');
} else {
    console.log('x是负数');
}
```

### 1.3 if...else if...else语句

```javascript
let x = 1;
if (x > 0) {
    console.log('x是正数');
} else if (x < 0) {
    console.log('x是负数');
} else {
    console.log('x是0');
}
```

### 1.4 switch语句

需要注意的是，switch语句中是===比较，而不是==比较。

```javascript
let x = 1;
switch (x) {
    case 1:
        console.log('x是1');
        break;
    case 2:
        console.log('x是2');
        break;
    default:
        console.log('x不是1也不是2');
        break;
}
```

## 2. 循环语句

### 2.1 while语句

```javascript
let x = 1;
while (x <= 10) {
    console.log(x);
    x++;
}
```

### 2.2 do...while语句

```javascript
let x = 1;
do {
    console.log(x);
    x++;
} while (x <= 10);
```

while语句和do...while语句的区别：

- while语句是先判断条件，再执行循环体，如果条件不满足，循环体一次也不会执行；
- do...while语句是先执行循环体，再判断条件，如果条件不满足，循环体至少会执行一次。

### 2.3 for语句

```javascript
for (let x = 1; x <= 10; x++) {
    console.log(x);
}
```

### 2.4 for...in语句

```javascript
let data = { a: 1, b: 2, c: 3 };
for (let key in data) {
    console.log(key + '=' + data[key]); // a=1, b=2, c=3
}
```

### 2.5 for...of语句

```javascript
let data = [1, 2, 3];
for (let value of data) {
    console.log(value); // 1, 2, 3
}
```

### 2.6 for in 和 for of 的区别

在 JavaScript 中，`for...in` 和 `for...of` 是两种不同的循环语句，用于迭代对象和数组的元素。它们有以下区别：

`for...in` 循环用于迭代对象的可枚举属性。它将遍历对象的属性名称，并为每个属性执行循环体中的代码。例如：

```javascript
const obj = { a: 1, b: 2, c: 3 };

for (let prop in obj) {
  console.log(prop); // 输出属性名：a, b, c
  console.log(obj[prop]); // 输出属性值：1, 2, 3
}
```

`for...in` 循环遍历对象的属性名称，包括继承的属性和原型链上的属性。因此，当你使用 `for...in` 循环时，需要注意使用 `hasOwnProperty` 方法过滤掉继承的属性，以确保只迭代对象自身的属性。

```javascript
const obj = { a: 1, b: 2, c: 3 };

for (let prop in obj) {
  if (obj.hasOwnProperty(prop)) {
    console.log(prop); // 输出属性名：a, b, c
    console.log(obj[prop]); // 输出属性值：1, 2, 3
  }
}
```

`for...of` 循环用于迭代可迭代对象（例如数组、字符串、Set、Map 等）的元素。它将遍历对象的可迭代属性，并为每个属性执行循环体中的代码。例如：

```javascript
const arr = [1, 2, 3];

for (let element of arr) {
  console.log(element); // 输出数组元素：1, 2, 3
}
```

`for...of` 循环只遍历对象的值，而不是属性名称。它不会访问对象的原型链或继承的属性。

总结：

- `for...in` 循环用于迭代对象的可枚举属性，包括继承的属性和原型链上的属性。
- `for...of` 循环用于迭代可迭代对象的元素，如数组、字符串、Set、Map 等，不包括对象的属性名称。
- 当迭代对象时，需要使用 `hasOwnProperty` 方法来过滤掉继承的属性。

### 错误处理语句 try...catch...finally

```javascript
try {
    // 可能会发生错误的代码
} catch (e) {
    // 发生错误时执行的代码
} finally {
    // 无论是否发生错误都会执行的代码
}
```

有下面三种组合可以用

- try catch
- try finally
- try catch finally

### throw语句

```javascript
try {
    if (x < 0) {
        throw new Error('x不能小于0');
    }
} catch (e) {
    console.log(e.message); // 出错了
}
```

throw语句的作用是手动中断程序执行，抛出一个错误。它的参数就是错误对象，可以是任意类型的值。一般来说，throw语句抛出的应该是Error对象的实例，表示程序执行过程中发生的错误。

有下面几种常用的错误对象

- EvalError：eval函数没有被正确执行
- RangeError：一个值超出有效范围
- ReferenceError：一个不存在的变量被引用
- SyntaxError：代码没有正确的结构
- TypeError：变量或参数不属于有效类型
- URIError：URI处理函数使用不正确

### debugger语句

```javascript
let x = 1;
debugger;
x++;
console.log(x);
```

debugger语句的作用是，自动触发断点，停止执行，进入debug模式。如果浏览器没有开启debug模式，debugger语句就没有任何效果。

### strict模式

```javascript
'use strict';
```

strict模式是一种特殊的运行模式，它对正常的JavaScript语义做了一些更改。例如，正常模式下，变量可以不声明直接使用，strict模式禁止这种用法，必须先声明变量，再使用它。
