# 23-06-26 基础数据操作 - 对象

## 1. 什么是对象

对象是一种复合的数据类型，它将很多值（属性）组合在一起，可以通过属性名来访问这些值。用来表现一个事物的多个属性。以对象为中心的编程思想称为面向对象编程。JavaScript也是面向对象的编程语言。

Object = Properties + Methods

## 2. 创建对象

创建一个对象最简单的方法就是利用new操作符。

```javascript
let obj = new Object();
```

例如生成一个Date对象：

```javascript
let now = new Date(2022, 11, 31, 23, 59, 59, 999);
```

这叫做对象的实例化。为了实例化对象，对象中有一个专用的方法叫做构造函数。构造函数的作用就是用来初始化对象。new操作符会调用构造函数，生成一个对象实例。

为什么要实例化一个对象呢？

对象是一个抽象的概念，就像我们有人的概念，但是具体到每个实例，你是张三我是李四，每个人都有不同的属性，所以我们需要实例化一个对象，来表示具体的某个人。所以对象的实例化是为了确保每个对象有自己的专用的领域的行为。

## 3. 获取对象属性和方法 - 点运算符

使用点运算符可以获取对象的属性和方法。

```javascript
now.getFullYear(); // 2022
```

本来在调用.运算符时要进行判断，如果对象的属性或方法不存在，会报错。

```javascript
let obj = {};
obj.prop.method(); // Uncaught TypeError: Cannot read property 'method' of undefined
```

```javascript
let str = null;
if (str !== null && str!== undefined) {
    console.log(str.length);
}
```

但是在ES2020中，可以使用可选链运算符`?.`来获取对象的属性和方法。

```javascript
now?.getFullYear(); // 2022
```

如果对象的属性或方法不存在，可选链运算符`?.`会返回`undefined`。

```javascript
let obj = {};
obj?.prop?.method(); // undefined
```

## 4. 静态方法

静态方法是定义在类上的方法，而不是定义在实例上的方法。静态方法通常用于为一个应用程序创建工具函数。

```javascript
Math.max(1, 2, 3); // 3
```

## 5. 内置对象

内置对象是指由JavaScript语言提供的、不依赖于宿主环境的对象，它们在任何JavaScript环境中都可以使用。内置对象的属性和方法在ECMAScript规范中定义。

内置对象包括：

- 基本对象：Object、Function、Boolean、Symbol、Error
- 数字和日期对象：Number、BigInt、Math、Date
- 字符串：String、RegExp
- 可索引的集合对象：Array、TypedArray、Map、Set、WeakMap、WeakSet
- 结构化数据：JSON
- 控制抽象对象：Promise、Generator、GeneratorFunction、AsyncFunction
- 反射：Reflect、Proxy
- 国际化：Intl、Intl.Collator、Intl.DateTimeFormat、Intl.ListFormat、Intl.NumberFormat、Intl.PluralRules、Intl.RelativeTimeFormat

Javascript的内置对象原则上不要用new来创建，因为这样会破坏内置对象的封装性，而且可能会跟宿主环境的内置对象发生冲突。

## String对象

String对象是一个用来表示和操作字符串的全局对象，它是一个构造函数，可以用来生成字符串对象。

```javascript
let str = 'hello';
```

### 获取字符串的长度

```javascript
str.length; // 5
```

### 大小写转换

```javascript
str.toUpperCase(); // HELLO
str.toLowerCase(); // hello
```

如果只想转换字符串的首字母大小写，可以使用下面的方法。

```javascript
str.substring(0, 1).toUpperCase() + str.substring(1); // Hello
```

### 取出指定位置的字符

```javascript
str.charAt(0); // h
str.slice(0, 1); // h (start, end-1)
str[0]; // h 
str.substring(0, 1); // h (start, end-1)
```

如果start和end相同，返回空字符串。

```javascript
str.slice(0, 0); // ''
str.substring(0, 0); // ''
```

如果start > end，slice会返回空字符串。

```javascript
str.slice(1, 0); // ''
```

substring会将两个参数对调

```javascript
str.substring(2, 0); // he
```

如果start或end是负数，slice会将负数转换为字符串长度加上负数，substring会将负数转换为0。

```javascript
str.slice(-1); // o
str.substring(-1); // hello
str.slice(0, -1); // hell
str.substring(0, -1); // ''
```

### 搜索指定字符串

```javascript
str.indexOf('l'); // 2
str.lastIndexOf('l'); // 3
```

indexOf用来搜索指定字符串第一次出现的位置，lastIndexOf用来搜索指定字符串最后一次出现的位置。

如果指定字符串没有出现，indexOf返回-1，lastIndexOf返回-1。

注意：indexOf和lastIndexOf都是区分大小写的。

字符串的搜索方法还有includes()、startsWith()、endsWith()。

```javascript
str.includes('l'); // true
str.startsWith('h'); // true
str.endsWith('o'); // true
```

字符串去除空格的方法trim()、trimStart()、trimEnd()。

```javascript
let str = ' hello ';
str.trim(); // 'hello'
str.trimStart(); // 'hello '
str.trimEnd(); // ' hello'
```

字符串置换的方法有replace()、replaceAll()。

```javascript
str.replace('l', 'L'); // heLlo
str.replaceAll('l', 'L'); // heLLo
```

字符串分割的方法split()。

```javascript
str.split('l'); // ['he', '', 'o']
str = 'hello world';
str.split(' '); // ['hello', 'world']
```

字符串补全的方法padStart()、padEnd()。

```javascript
str.padStart(10, '0'); // 00000hello
str.padEnd(10, '0'); // hello00000
```

字符串重复的方法repeat()。

```javascript
str.repeat(2); // hellohello
```

字符串Unicode正则化的方法normalize()。什么是Unicode正则化呢？Unicode允许字符的编码方式有多种，比如字母Ô可以写成\u004F\u030C，也可以写成\u01D1。这两种编码方式在Unicode中被视为不同的字符，但是在JavaScript中，它们被视为同一个字符。normalize()方法可以将不同的Unicode编码方式统一为同一种编码方式。

```javascript
str = '\u004F\u030C';
str.normalize(); // Ô
```

## Number对象

Number对象是一个用来表示数字值的全局对象，它是一个构造函数，可以用来生成数字对象。

```javascript
let num = 123;
```

Number对象提供了一些常量。

```javascript
Number.MAX_VALUE; // 1.7976931348623157e+308 如果超过这个值，会返回Infinity，如果要用更大的数，可以使用BigInt对象。
Number.MIN_VALUE; // 5e-324
Number.MAX_SAFE_INTEGER; // 9007199254740991
Number.MIN_SAFE_INTEGER; // -9007199254740991
Number.NaN; // NaN
Number.NEGATIVE_INFINITY; // -Infinity
Number.POSITIVE_INFINITY; // Infinity
```

使用BigInt可以直接在数字后面加n来表示大数。

```javascript
let bigNum = 1234567890123456789012345678901234567890n;
```

注意大数在比较的时候

```javascript
console.log(1n == 1); // true
console.log(1n === 1); // false
```

数值形式变换

```javascript
let num1 = 255
num1.toString(16); // ff
num1.toString(8); // 377
num1.toString(2); // 11111111
```

```javascript
let num2 = 123.456
num2.toFixed(0); // 123
num2.toFixed(1); // 123.5
num2.toFixed(2); // 123.46
num2.toFixed(3); // 123.456
num2.toFixed(7); // 123.4560000
num2.toExponential(1); // 1.2e+2
num2.toPrecision(4); // 123.5
num2.toPrecision(7); // 123.4560
```

字符串转换为数值

```javascript
let str = '123xxx'
Number(str); // NaN
Number.parseInt(str); // 123
Number.parseFloat(str); // 123

let d = new Date()
Number(d); // 1497444451394
Number.parseInt(d); // NaN
Number.parseFloat(d); // NaN

let h = '0x10'
Number(h); // 16
Number.parseInt(h); // 16
Number.parseFloat(h); // 0

let b = '0b11'
Number(b); // 3
Number.parseInt(b); // 0
Number.parseFloat(b); // 0

let e = '1.01e+2'
Number(e); // 101
Number.parseInt(e); // 1
Number.parseFloat(e); // 101
```

## Math对象

方法非常多，和数学有关的基本上都在这个对象里。所以这里就不一一列举了。

## Date对象

Date对象用来表示日期和时间。

```javascript
let d = new Date(); // 当前时间
let d = new Date(2017, 9, 18, 12, 34, 56, 789); // 2017-10-18T04:34:56.789Z 月份是从0开始的，所以9表示10月。
let d = new Date(0); // 1970-01-01T00:00:00.000Z
let d = new Date(2017, 11, 0, 12, 34, 56, 789); // 2017-11-30T04:34:56.789Z 0表示上个月的最后一天。
```
