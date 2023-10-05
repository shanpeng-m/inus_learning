# 23-07-06 Set集合 不重复的值

## Set集合

Set和数组类似，但是Set不允许有重复的值，Set的值是唯一的。但是Set和数组的区别是，Set不是索引，所以不能通过索引获取值，Set是一个对象，所以可以通过对象的方法获取值。所以Set是无序的。用has方法判断是否有某个值，用for of遍历。

## 初始化一个set

```javascript
let data = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
console.log(data); // Set(10) {1, 2, 3, 4, 5, …}
console.log([...data]); // [1, 2, 3, 4, 5, …]
```

```javascript
let data1 = new Set([NaN, NaN]);
console.log(data1); // Set(1) {NaN}
```

```javascript
let data2 = new Set([[], []]);
console.log(data2); // Set(2) {Array(0), Array(0)} 因为数组是引用类型，所以两个空数组不相等
```

## 增加/删除值

```javascript
let data = new Set();
data.add(1).add(2).add(3).add(4).add(5);
console.log(data); // Set(5) {1, 2, 3, 4, 5}
data.delete(1);
console.log(data); // Set(4) {2, 3, 4, 5}
console.log(data.delete(2)); // true
console.log(data.delete(2)); // false
console.log(data); // Set(3) {3, 4, 5}
data.clear();
console.log(data); // Set(0) {}
```

## 判断是否有某个值

```javascript
let data = new Set([1, 2, 3, 4, 5]);
console.log(data.has(1)); // true
console.log(data.has(6)); // false
```

## 遍历

```javascript
let data = new Set([1, 2, 3, 4, 5]);
data.forEach(function (value, key, set) {
    console.log(value);
}); // 1 2 3 4 5
for (let value of data) {
    console.log(value);
} // 1 2 3 4 5
```

## 正则表达式

有许多选项，可以在正则表达式对象中选择。

- g：全局匹配
- i：区分大小写
- m：多行匹配
- s：允许点（.）匹配换行符
- u：unicode模式
- d：记录匹配范围
- y：lastindex属性生效

```javascript
let p = new RegExp('http(s)?://([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=]*)?', 'gi'); // g:全局匹配 i:区分大小写
let p = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/gi; // g:全局匹配 i:区分大小写
let str = 'http://www.baidu.com http://www.sina.com.cn'; // 字符串
console.log(str.match(p)); // ["http://www.baidu.com", "http://www.sina.com.cn"]
```

\表示转义字符，所以要用\\表示\，所以要用\\\\表示\\，所以要用\\\\\\\\表示\\\\。

\w 表示字母数字下划线，等价于\[A-Za-z0-9\]。

/表示正则表达式的开始和结束，所以要用\/表示/。

\w-表示字母数字下划线和-，等价于\[A-Za-z0-9-\]。

test方法用来判断是否匹配，返回true或false。

```javascript
let p = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/gi; // g:全局匹配 i:区分大小写
let str = 'http://www.baidu.com http://www.sina.com.cn'; // 字符串
console.log(p.test(str)); // true
```

match方法用来获取匹配的值，返回一个数组，如果没有匹配到，返回null。

```javascript
let p = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/gi; // g:全局匹配 i:区分大小写
let str = 'http://www.baidu.com http://www.sina.com.cn'; // 字符串
console.log(str.match(p)); // ["http://www.baidu.com", "http://www.sina.com.cn"]
```

matchAll方法用来获取匹配的值，返回一个迭代器，如果没有匹配到，返回null。

```javascript
let p = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/gi; // g:全局匹配 i:区分大小写
let str = 'http://www.baidu.com http://www.sina.com.cn'; // 字符串
console.log(str.matchAll(p)); // RegExpStringIterator {}
```

replace方法用来替换匹配的值，返回一个字符串，如果没有匹配到，返回原字符串。

```javascript
let p = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/gi; // g:全局匹配 i:区分大小写
let str = 'http://www.baidu.com http://www.sina.com.cn'; // 字符串
console.log(str.replace(p, 'URL')); // URL URL
console.log(str.replace(p, '<a href="$&">$&</a>')); // <a href="http://www.baidu.com">http://www.baidu.com</a> <a href="http://www.sina.com.cn">http://www.sina.com.cn</a>
```

split方法用来分割字符串，返回一个数组，如果没有匹配到，返回原字符串。

```javascript
let re = /[\/\.\-]/g;
let str = '2019/12/31';
console.log(str.split(re)); // ["2019", "12", "31"]
```

## 其他对象 - Global对象

Global对象是一个单例对象，它的属性和方法不需要创建对象就可以使用。

你可以直接使用它的属性和方法，也可以使用window对象来调用它的属性和方法。

```javascript
console.log(window.parseInt('123')); // 123
console.log(parseInt('123')); // 123
```

javascript中有特殊值，检查函数，和变换函数以及解码编码和解析函数。

### 特殊值

- NaN Not a Number 表示不是一个数字
- Infinity 表示无穷大
- undefined 表示未定义

### 检查函数

- isNaN(num) 检查是否是NaN
- isFinite(num) 检查是否是有限数字

### 变换函数

- parseInt(str) 将字符串转换为整数
- parseFloat(str) 将字符串转换为浮点数
- String(val) 将值转换为字符串
- Number(val) 将值转换为数字
- Boolean(val) 将值转换为布尔值

### 解码编码和解析函数

- decodeURI(str) 解码URI
- encodeURI(str) 编码URI
- encodeURIComponent(str) 编码URI组件
- decodeURIComponent(str) 解码URI组件
- eval(exp) 用来执行一个字符串表达式，并返回表达式的值

## 其他对象 - JSON对象

JSON 是JavaScript Object Notation的缩写，它是一种数据交换格式。在性质上，JSON和JavaScript非常亲和，经常用来做数据的异步传输和存储。

JSON（JavaScript Object Notation）是一种轻量级的数据交换格式，它是为了人与计算机之间的通信而设计的。以下是JSON格式和语法的主要要求：

1. **数据结构**：
   - **对象**：对象在JSON中是一个键值对的集合，它由花括号 `{ }` 包围。
   - **数组**：数组是有序的值的列表。它由方括号 `[ ]` 包围。

2. **数据类型**：
   - **字符串**：字符串必须用双引号 `"` 包围。
   - **数字**：可以是整数或浮点数。不支持八进制和十六进制格式。
   - **布尔值**：可以是 `true` 或 `false`。
   - **null**：表示一个空值。
   - **数组**：数组可以包含多种数据类型，包括字符串、数字、布尔值、对象、其他数组等。
   - **对象**：如上所述。

3. **键名**：
   - 对象的键名必须是字符串，且必须用双引号包围。

4. **字符编码**：
   - JSON文本必须使用UTF-8、UTF-16或UTF-32编码。

5. **特殊字符**：
   - 字符串中的特殊字符，如反斜杠、双引号、换行符等，必须使用转义字符进行转义。例如，换行符可以写为 `\\n`。

6. **格式**：
   - JSON不支持注释。
   - 在JSON中，不需要在对象的最后一个键值对后添加逗号。

以下是一个简单的JSON示例，其中包含了上述的大部分数据类型：

```json
{
    "name": "张三",
    "age": 25,
    "isStudent": false,
    "skills": ["Python", "JavaScript", "SQL"],
    "address": {
        "city": "北京",
        "postcode": "100000"
    },
    "spouse": null
}
```

这个示例描述了一个对象，该对象有五个键值对，分别是字符串、数字、布尔值、数组和另一个对象。

例如在JavaScript中，我们可以使用对象字面量来创建一个对象：

```javascript
let org = {
    title: 'JavaScript入门',
    price: 99,
    published: new Date(2019, 10, 1),
};
let js = JSON.stringify(org);
console.log(js); // {"title":"JavaScript入门","price":99,"published":"2019-11-01T16:00:00.000Z"}
let obj = JSON.parse(js);
console.log(obj); // {title: "JavaScript入门", price: 99, published: "2019-11-01T16:00:00.000Z"}
console.log(obj.published.getFullYear()); // 2019
```

## 其他对象 - Symbol对象

Symbol是ES6引入的一种新的数据类型，它是一种类似于字符串的数据类型。

```javascript
let sym1 = Symbol('sym');
let sym2 = Symbol('sym');

console.log(sym1 === sym2); // false
console.log(typeof sym1); // symbol
console.log(sym1.toString()); // Symbol(sym)
console.log(sym1.description); // sym
```

在JavaScript中，`Symbol` 是一个原始数据类型，与 `Number`、`String`、`Boolean` 等其他原始数据类型一样。`Symbol` 的主要特点是每个 `Symbol` 值都是唯一的。这意味着，无论你创建多少个 `Symbol`，它们之间永远不会相等。

以下是 `Symbol` 的一些主要用途和特点：

1. **确保对象属性的唯一性**：  
   当你使用 `Symbol` 作为对象的键时，可以确保不会与该对象上的任何其他属性（键）冲突。这对于定义对象的内部属性和方法特别有用，尤其是在库或框架中，以避免用户意外地覆盖这些属性。

   ```javascript
   const mySymbol = Symbol("description");
   const obj = {
       [mySymbol]: "value"
   };
   ```

2. **表示完全私有属性**：  
   使用 `Symbol` 作为对象键可以创建一个真正的私有属性，因为这些属性不能通过常规的属性枚举方法（例如 `Object.keys` 或 `for...in` 循环）被访问。

3. **定义和使用 Well-Known Symbols**：  
   ECMAScript 规范定义了一些预定义的 `Symbol` 值，称为 "Well-Known Symbols"。这些 `Symbol` 用于表示语言内部的行为。例如，`Symbol.iterator` 用于定义对象的默认迭代器。

   ```javascript
   const arr = [1, 2, 3];
   const iterator = arr[Symbol.iterator]();
   console.log(iterator.next());  // { value: 1, done: false }
   ```

4. **消除魔法字符串**：  
   在某些情况下，可能需要在代码中使用特定的字符串值作为标识符。为了避免潜在的打字错误或名称冲突，可以使用 `Symbol` 来为这些标识符创建唯一的标识。

5. **元编程和属性描述**：  
   通过使用预定义的 `Symbol` 值，可以更改某些默认操作的行为。例如，使用 `Symbol.hasInstance` 可以更改 `instanceof` 操作符的行为。

6. **防止属性名冲突**：  
   当将两个对象合并为一个对象时，使用 `Symbol` 作为属性名可以确保不会有属性名冲突。

总之，`Symbol` 提供了一种创建不可变的、唯一的标识符的方法，这在很多编程场景中都是非常有用的。
