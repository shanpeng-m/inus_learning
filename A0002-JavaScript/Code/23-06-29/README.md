# 2023-06-29 集合操作

## 1. 相关定义

在JavaScript，有许多用于集合操作的对象，例如Array、Set、Map等等。

Array 是数组，是一种有序的集合，可以通过索引来访问其中的元素，值可以重复。Map可以理解为键值对，可以通过键来访问值，键不能重复。Set是一种无序且唯一的集合，可以通过值来访问，值不能重复。

如何创建一个新的数组

```javascript
let list = new Array();
let list = new Array(1, 2, 3);
let list = new Array(10); // 创建一个长度为10的数组
let list = [1, 2, 3];
```

### 追加删除元素

```javascript
let list = [1, 2, 3];
list.push(4); // 追加元素
list.unshift(0); // 在数组头部添加元素
console.log(list); // [0, 1, 2, 3, 4]
console.log(list.pop()); // 4
console.log(list.shift()); // 0
console.log(list); // [1, 2, 3]
```

pop和shift不光会删除元素，还会返回删除的元素。如果不想删除元素，只想返回元素，可以使用slice方法或者at方法。

```javascript
let list = [1, 2, 3];
console.log(list.slice(-1)); // [3]
console.log(list.slice(0, 1)); // [1]
console.log(list.slice(1, 2)); // [2]
console.log(list.slice(1)); // [2, 3]
console.log(list); // [1, 2, 3]
console.log(list.at(-1)); // 3
console.log(list.at(0)); // 1
console.log(list.at(1)); // 2
```

splice方法可以删除元素，也可以添加元素。

```javascript
let list = [1, 2, 3];
console.log(list.splice(1, 1)); // [2]
console.log(list); // [1, 3]
console.log(list.splice(1, 0, 2)); // [] 这里在索引1的位置添加元素2
console.log(list); // [1, 2, 3]
console.log(list.splice(1, 1, 4)); // [2] 这里在索引1的位置删除元素2，并添加元素4
console.log(list); // [1, 4, 3]
```

splice方法的第一个参数是索引，第二个参数是删除的元素个数，第三个参数是添加的元素。

indexOf方法可以查找元素的索引，如果元素不存在，返回-1。

```javascript
let list = [1, 2, 3];
console.log(list.indexOf(1)); // 0
console.log(list.indexOf(2)); // 1
console.log(list.indexOf(3)); // 2
console.log(list.indexOf(4)); // -1
```

lastIndexOf方法从后往前查找元素的索引，如果元素不存在，返回-1。

```javascript
let list = [1, 2, 3, 1, 2, 3];
console.log(list.lastIndexOf(1)); // 3
console.log(list.lastIndexOf(2)); // 4
console.log(list.lastIndexOf(3)); // 5
console.log(list.lastIndexOf(4)); // -1
```

includes方法可以判断元素是否存在，返回布尔值。

```javascript
let list = [1, 2, 3];
console.log(list.includes(1)); // true
console.log(list.includes(2)); // true
console.log(list.includes(3)); // true
console.log(list.includes(4)); // false
```

如果要判断元素在整个数组中所有的位置

```javascript
let list = [1, 2, 3, 1, 2, 3];
let num = 1;
let result = [];
list.forEach(function (v, i) {
  if (v === num) {
    result.push(i);
  }
});
console.log(result); // [0, 3]
```

flat方法可以将多维数组转换为一维数组。

```javascript
let list = [1, 2, [3, 4, [5, 6]]];
console.log(list.flat()); // [1, 2, 3, 4, [5, 6]]
console.log(list.flat().flat()); // [1, 2, 3, 4, 5, 6]
console.log(list.flat(2)); // [1, 2, 3, 4, 5, 6]
console.log(list.flat(Infinity)); // [1, 2, 3, 4, 5, 6]
```

length属性可以获取数组的长度。

```javascript
let list = [1, 2, 3];
console.log(list.length); // 3
```

join方法可以将数组转换为字符串。

```javascript
let list = [1, 2, 3];
console.log(list.join()); // 1,2,3
console.log(list.join('')); // 123
console.log(list.join('-')); // 1-2-3

let list2 = ['hoge', null, undefined, []];
console.log(list2.join()); // hoge,,,
```

copyWithin方法可以将数组中的元素复制到其他位置。

```javascript
let list = [1, 2, 3, 4, 5];
console.log(list.copyWithin(0, 3)); // [4, 5, 3, 4, 5] 将索引3开始的元素复制到索引0开始的位置
console.log(list.copyWithin(0, 3, 4)); // [4, 2, 3, 4, 5] 将索引3开始的元素复制到索引0开始的位置，复制到索引4结束
console.log(list.copyWithin(0, -2, -1)); // [4, 2, 3, 4, 5] 将索引-2开始的元素复制到索引0开始的位置，复制到索引-1结束
```

copyWithin方法的第一个参数是复制到的位置，第二个参数是复制的开始位置，第三个参数是复制的结束位置。

from方法可以将类数组对象转换为数组。

```javascript
let list = Array.from('abc');
console.log(list); // ['a', 'b', 'c']
```

from方法的第一个参数是类数组对象，第二个参数是回调函数，第三个参数是回调函数的this对象。

```javascript
let list = Array.from('abc', function (v) {
  return v + this.suffix;
}, { suffix: '!' });
console.log(list); // ['a!', 'b!', 'c!']
```

fill方法可以填充数组。

```javascript
let list = [1, 2, 3];
console.log(list.fill(0)); // [0, 0, 0] 填充0
console.log(list.fill(0, 1)); // [1, 0, 0] 从索引1开始填充
console.log(list.fill(0, 1, 2)); // [1, 0, 3] 从索引1开始填充，到索引2结束
console.log(list.fill(0, -2, -1)); // [1, 0, 0] 从索引-2开始填充，到索引-1结束
```

fill方法的第一个参数是填充的元素，第二个参数是填充的开始位置，第三个参数是填充的结束位置。

```javascript
let list = [1, 2, 3];
let copy = list.from(list);
console.log(copy); // [1, 2, 3]
console.log(copy === list); // false
```

from 和直接 = 赋值的区别是，from方法会创建一个新的数组，直接 = 赋值是引用赋值。

sort方法可以对数组进行排序。

```javascript
let list = [3, 2, 1];
console.log(list.sort()); // [1, 2, 3]
```

如果想要倒序排序，可以使用reverse方法。

```javascript
let list = [3, 2, 1];
console.log(list.sort().reverse()); // [3, 2, 1]
```

如果只想倒过来排列，可以使用reverse方法。

```javascript
let list = [3, 2, 1];
console.log(list.reverse()); // [1, 2, 3]
```

如果排序不是按照你想要的方式进行，可以使用sort方法的回调函数。

```javascript
let list = [3, 2, 1];
console.log(list.sort(function (a, b) {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
})); // [1, 2, 3]
```

如果a大于b，返回正数，a小于b，返回负数，a等于b，返回0。

比如

```javascript
let classes = ['部长', '副部长', '主任', '部员'];
let members = [
  { name: '张三', class: '部员' },
  { name: '李四', class: '主任' },
  { name: '王五', class: '部长' },
  { name: '赵六', class: '副部长' },
];

console.log(members.sort(function (a, b) {
  return classes.indexOf(a.class) - classes.indexOf(b.class);
})); // [{name: "王五", class: "部长"}, {name: "赵六", class: "副部长"}, {name: "李四", class: "主任"}, {name: "张三", class: "部员"}]
```

如果想每次返回随机的排列

```javascript
let list = [1, 2, 3];
console.log(list.sort(function () {
  return Math.random() - 0.5;
})); // [2, 3, 1] 每次返回随机的排列
```

map方法可以对数组中的每个元素进行处理。

```javascript
let list = [1, 2, 3];
console.log(list.map(function (v) {
  return v * 2;
})); // [2, 4, 6]
```

flatMap = map + flat

```javascript
let list = [1, 2, 3, 4, 5, 6];
console.log(list.flatMap(function (v) {
  return [v, v * 2];
})); // [1, 2, 2, 4, 3, 6, 4, 8, 5, 10, 6, 12]
console.log(list.Map(function (v) {
  return [v, v * 2];
})); // [[1, 2], [2, 4], [3, 6], [4, 8], [5, 10], [6, 12]]
```

```javascript
let list = [10, 42, null, 73, 8];
console.log(list.flatMap(function (v) {
    if (v === null) {
        return [];
    } return [v];
})); // [10, 42, 73, 8]
```

find方法可以查找数组中符合条件的元素。

```javascript
let list = [1, 2, 3];
console.log(list.find(function (v) {
  return v > 1;
})); // 2
```

find的返回值是符合条件的元素，如果没有符合条件的元素，返回undefined。

```javascript
let books = [
  { name: 'JavaScript高级程序设计', price: 99 },
  { name: 'JavaScript权威指南', price: 88 },
  { name: 'ES6标准入门', price: 66 },
];
console.log(books.find(function (book) {
  return book.price < 70;
})); // {name: "ES6标准入门", price: 66}
```

some方法可以判断数组中是否有符合条件的元素。

```javascript
let list = [1, 2, 3];
console.log(list.some(function (v) {
  return v > 1;
})); // true
```

some的返回值是布尔值，如果有符合条件的元素，返回true，否则返回false。

every方法可以判断数组中是否所有元素都符合条件。

```javascript
let list = [1, 2, 3];
console.log(list.every(function (v) {
  return v > 1;
})); // false
```

every的返回值是布尔值，如果所有元素都符合条件，返回true，否则返回false。

filter方法可以过滤数组中符合条件的元素。

```javascript
let list = [1, 2, 3];
console.log(list.filter(function (v) {
  return v > 1;
})); // [2, 3]
```

filter的返回值是一个新的数组，包含符合条件的元素。

```javascript
let books = [
  { name: 'JavaScript高级程序设计', price: 99 },
  { name: 'JavaScript权威指南', price: 88 },
  { name: 'ES6标准入门', price: 66 },
];
console.log(books.filter(function (book) {
  return book.price < 90;
})); // [{name: "JavaScript权威指南", price: 88}, {name: "ES6标准入门", price: 66}]
```

reduce方法可以对数组中的元素进行累加。

```javascript
let list = [1, 2, 3, 4];
console.log(list.reduce(function (a, b) {
  return a + b;
})); // 10
console.log(list.reduce(function (a, b) {
  return a * b;
})); // 24
```

rightReduce方法可以对数组中的元素进行反向累加。

```javascript
let list = [['apple', 2], ['orange', 3], ['banana', 4]];
console.log(list.reduce(function (a, b) {
  return a.concat(b);
})); // ["apple", 2, "orange", 3, "banana", 4]
console.log(list.reduceRight(function (a, b) {
  return a.concat(b);
})); // ["banana", 4, "orange", 3, "apple", 2]
```
