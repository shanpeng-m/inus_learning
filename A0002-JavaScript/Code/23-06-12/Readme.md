# Chapter 3 算数

## 使用decimal.js

### 1. 为什么要使用decimal.js

decimal.js是一个用于浮点数计算的JavaScript库，它可以解决JavaScript浮点数计算的精度问题。因为它内部采用10进制计算，所以它的计算结果和我们人类的计算结果是一致的。防止了JavaScript使用2进制计算的精度问题。

### 2. 如何使用decimal.js

decimal.js的使用非常简单，只需要在页面中引入decimal.js的脚本文件即可：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/decimal.js/10.4.2/decimal.min.js"></script>
```

然后就可以在JavaScript代码中使用Decimal对象了：

```javascript
let x = new Decimal('0.14');
let y = new Decimal('0.29');
console.log(x.add(d2).toNumber());  // 0.43
```

Decimal的方法还可以连续调用：

```javascript
let x = new Decimal('0.14');
let y = new Decimal('0.29');
console.log(x.add(d2).mul(100).toNumber());  // 43
```

## 运算符

1. &= 与运算符
2. ｜= 或运算符
3. ^= 异或运算符
4. &&= 逻辑与运算符 也就是左边的值为真时，才会赋予右边的值
5. ||= 逻辑或运算符 也就是左边的值为假时，才会赋予右边的值
6. ??= 空值合并运算符 也就是左边的值为null或undefined时，才会赋予右边的值
7. <<= 左移运算符
8. >>= 右移运算符
9. >>>= 无符号右移运算符

## 注意

```javascript
let x = 1
let y = x
x = 2
console.log(y)  // 1

let data1 = [1, 2, 3]
let data2 = data1
data1[0] = 4
console.log(data2)  // [4, 2, 3]
```

这是因为数组是引用类型，而数字是值类型。值类型的变量赋值时，是将值复制一份给新的变量，而引用类型的变量赋值时，是将引用复制一份给新的变量，所以当改变其中一个变量的值时，另一个变量的值也会改变。

## 常量

之前说过的使用const声明的叫常量，常量的值不能改变，但是如果常量的值是引用类型，那么引用的对象的值是可以改变的。

```javascript
const data1 = [1, 2, 3]
data1 = [4, 5, 6]  // TypeError: Assignment to constant variable.
data1[0] = 4
console.log(data1)  // [4, 2, 3]
```

## 解构赋值（日语：分割代入）

```javascript
let data = [1, 2, 3]
let [x, y, z] = data
console.log(x)  // 1
console.log(y)  // 2
console.log(z)  // 3
```

可以使用...运算符来获取剩余的值：

```javascript
let data = [1, 2, 3, 4, 5]
let [x, y, ...z] = data
console.log(x)  // 1
console.log(y)  // 2
console.log(z)  // [3, 4, 5]
```

一个对象也可以使用解构赋值：

```javascript
let book = { 
    title: 'JavaScript入门',
     price: 1980,
      stock: 3
};
let { title, price, stock } = book;
console.log(title);  // JavaScript入门
console.log(price);  // 1980
console.log(stock);  // 3
console.log(memo);   // Undefined
```

甚至复杂的对象也可以使用解构赋值：

```javascript
let book = { 
    title: 'JavaScript入门',
    price: 1980,
    stock: 3,
    other: {
        publisher: '技术出版社',
        keyword: 'JavaScript'
    }
};
let { title, price, stock, other: { publisher, keyword } } = book;
console.log(title);     // JavaScript入门
console.log(price);     // 1980
console.log(stock);     // 3
console.log(publisher); // 技术出版社
console.log(keyword);   // JavaScript
```

也可以给变量指定一个别名：

```javascript
let book = { 
    title: 'JavaScript入门',
    price: 1980,
    stock: 3,
    other: {
        publisher: '技术出版社',
        keyword: 'JavaScript'
    }
};

let { title: name, price: cost, stock: count, other: { publisher: company, keyword: key } } = book;
console.log(name);      // JavaScript入门
console.log(cost);      // 1980
console.log(count);     // 3
console.log(company);   // 技术出版社
console.log(key);       // JavaScript
```

## 比较运算符

1. === 严格相等运算符 左边的值和右边的值相等并且类型也相等时，返回true 例如：1 === 1 返回true，1 === '1' 返回false 但是 1 == '1' 返回true
2. !== 严格不相等运算符 左边的值和右边的值不相等或者类型不相等时，返回true
3. ?: 三元运算符 如果左边的值为真，则返回中间的值，否则返回右边的值 用法类似 条件 ? 真 : 假
4. ?? 空值合并运算符 如果左边的值为null或undefined，则返回右边的值，否则返回左边的值 例如：a ?? b 等价于 a !== null && a !== undefined ? a : b。null ?? 5 返回5，undefined ?? 5 返回5，0 ?? 5 返回0，false ?? 5 返回false，'' ?? 5 返回''，NaN ?? 5 返回NaN

## 其他运算符

1. delete 删除对象的属性 例如：delete book.title 表示删除book对象的title属性 但是delete book 表示删除book对象本身 但是delete只能删除对象的自有属性，不能删除继承的属性，也不能删除var声明的变量 例如：var x = 1; delete x; console.log(x) // 1 但是如果是let声明的变量，则会报错 例如：let x = 1; delete x; console.log(x) // Uncaught SyntaxError: Delete of an unqualified identifier in strict mode. 但是如果是全局变量，则可以删除 例如：var x = 1; delete window.x; console.log(x) // Uncaught ReferenceError: x is not defined
2. in 检查对象是否包含某个属性 例如：'title' in book 返回true，'price' in book 返回true，'publisher' in book 返回false
3. instanceof 检查对象是否是某个类的实例 例如：book instanceof Object 返回true，book instanceof Array 返回false
4. new 创建对象 例如：new Object() 创建一个空对象，new Array() 创建一个空数组，new Date() 创建一个Date对象，new RegExp() 创建一个正则表达式对象，new Function() 创建一个函数对象
5. typeof 检查对象的类型 例如：typeof 1 返回number，typeof '1' 返回string，typeof true 返回boolean，typeof undefined 返回undefined，typeof null 返回object，typeof {} 返回object，typeof [] 返回object，typeof new Date() 返回object，typeof new RegExp() 返回object，typeof new Function() 返回function
6. void 无操作运算符
