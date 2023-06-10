# 2023.06.10

## script的位置

- 放在body里的任意位置：基本上不这么用，因为会阻塞页面的渲染，影响用户体验。
- 放在body结束标签之前：这是最常用的方式，因为可以保证页面的渲染不会被阻塞。这也是提高页面加载速度的一种方式。
- 放在head标签里：这种方式也是常用的。JavaScript函数必须在调用之前定义，所以如果JavaScript函数在页面的头部定义，而在页面的尾部调用，那么就可以把JavaScript代码放在head标签里。

所以上面的第2种方式是最常用的。另外，script标签可以在页面中出现多次，这样可以把不同的JavaScript代码放在不同的script标签里，这样可以更好地组织代码。浏览器会按照script标签出现的顺序依次执行这些代码。

script也可以放在外部文件中，然后通过src属性指定外部文件的位置，这样可以把JavaScript和HTML分离，便于维护。外部的JavaScript文件必须要有.js后缀名，而且最好放在与HTML文件同一个目录下，这样更方便管理。

但是需要注意的是，外部的JavaScript文件不能包含`<script>`标签，只需要包含JavaScript代码即可。并且在页面中script标签指定了src属性后，标签内部的代码会被忽略。

每句JavaScript代码（Statement）最后的分号可以省略，但是省略分号会导致某些情况下的代码不正常，所以建议不要省略分号。

为了增强代码的可读性，还有下面一些规则：

- 一行超过80个字符的代码需要换行
- 换行的位置在左括号，逗号，运算符之后。
- 如果是在一行代码中换行，新的一行需要缩进。

JavaScript区分大小写，所以变量`abc`和变量`ABC`是两个不同的变量。

## 变量

声明一个变量可以用`let`语句，比如：

```javascript
let a = 1, b = 2, c = 'hello';
```

也可以不指定值，这时变量的值为`undefined`：

```javascript
let x;  // x的值为undefined
```

但是，容易忘记初始化变量，所以建议在声明变量时，同时初始化变量。

`let`语句是JavaScript的新标准，它在旧版本的浏览器中无法运行，但是，在新版本的浏览器中，为了兼容旧版本的代码，仍然可以用`var`语句来声明变量。

`var`语句在全局作用域中声明的变量，依旧是全局变量，例如：

```javascript
var course = 'Learn JavaScript';
alert(course);  // 'Learn JavaScript'
alert(window.course);  // 'Learn JavaScript'
```

在函数内部使用`var`声明的变量则是局部变量，例如：

```javascript
function foo() {
    var course = 'Learn JavaScript';
    alert(course);  // 'Learn JavaScript'
}
foo();
alert(course);  // Uncaught ReferenceError: course is not defined
```

当然也可以不用`var`语句声明变量，这时，变量的作用域是全局作用域：

```javascript
function foo() {
    course = 'Learn JavaScript';
    alert(course);  // 'Learn JavaScript'
}
foo();
alert(course);  // 'Learn JavaScript'
```

在函数内部定义的变量，如果没有用`var`或者`let`声明，该变量就自动被视为全局变量：

```javascript
function foo() {
    var course = 'Learn JavaScript';
    alert(window.course);  // 'Learn JavaScript'
}
foo();
```

推荐通过`var`或者`let`声明变量，因为不声明就默认为全局变量容易造成难以发现的错误。

## 常量

常量是指在程序运行中不可变的量。在JavaScript中，用`const`声明一个常量：

```javascript
const PI = 3.14;
```

但是用`const`声明的变量实际上仍然可以改变！例如：

```javascript
const PI = 3.14;
PI; // 3.14
PI = 3; // Uncaught TypeError: Assignment to constant variable.
```

但是，改变常量的值会导致运行时报错，而不是编译时报错，所以用`const`声明常量时需要保证编译时就能确定其值。

## 类型

JavaScript是一种动态类型语言，也就是说，变量的类型没有限制，变量可以随时改变类型：

```javascript
var a = 123; // a是整数
a = 'ABC'; // a变为字符串
```

这种灵活性有利有弊。如果变量本来是用来表示一个数字，结果给它赋了字符串，那么就会导致运行错误。所以，总是用`var`声明变量非常重要！

JavaScript的数据类型，可以分为两大类：

- 原始类型（Primitive data types）：包括`number`、`bigint`、`string`、`boolean`、`null`、`undefined`和`Symbol`。
- 对象类型（Object types）：包括`Object`、`Array`、`Function`等。

### boolean

下面的值都是`false`：

- `undefined`，`null`，`NaN`
- 空字符串 `''`
- 零值 `0`，`-0`，`0n`

其他值都是`true`，包括所有对象、数组、字符串、空字符串`''`、空数组`[]`、空对象`{}`，甚至还有字符串`'false'`。

### number

JavaScript不区分整数和浮点数，统一用`number`表示，以下都是合法的`number`类型：

```javascript
123; // 整数123
0.456; // 浮点数0.456
1.2345e3; // 科学计数法表示1.2345x1000，等同于1234.5
-99; // 负数
0xff00; // 十六进制表示的255
-0xff00; // 十六进制表示的-255
0o377; // 八进制表示的255
0b11111111; // 二进制表示的255
```

### string

字符串是以单引号`'`或双引号`"`括起来的任意文本，比如`'abc'`，`"xyz"`等等。请注意，`''`或`""`本身只是一种表示方式，并不是字符串的一部分，因此，字符串`'abc'`只有a，b，c这3个字符。

如果`'`本身也是字符串的一部分，那就用`""`括起来，比如：

```javascript
var str = 'I\'m \"OK\"!'; // 'I'm "OK"!'
```

转义字符(escape sequence), 包含很多，例如

- `\n` 换行
- `\t` 制表符
- `\b` 退格符

等等。

如果这行字符串很长，我们可以用\来换行：

```javascript
var str = 'Hello \
World';
```

上面的代码实际上定义了一个多行字符串`'Hello World'`。

### 模板字符串

ES6标准引入了新的`Template String`功能，可以用反引号表示字符串：

```javascript
var name = '小明';
var age = 20;
var message = `你好, ${name}, 你今年${age}岁了!`;
alert(message);
```

### array

数组是一组按顺序排列的集合，集合的每个值称为元素。JavaScript的数组可以包括任意数据类型。例如：

```javascript
[1, 2, 3.14, 'Hello', null, true];
```

数组用`[]`表示，元素之间用`,`分隔。

数组的索引从0开始，也就是说，第一个元素的索引是0，第二个元素的索引是1，以此类推。

要获取数组的长度，直接访问`length`属性：

```javascript
var arr = [1, 2, 3.14, 'Hello', null, true];
arr.length; // 6
```

直接给`Array`的`length`赋一个新的值会导致`Array`大小的变化：

```javascript
var arr = [1, 2, 3];
arr.length; // 3
arr.length = 6;
arr; // arr变为[1, 2, 3, undefined, undefined, undefined]
arr.length = 2;
arr; // arr变为[1, 2]
```

### object

JavaScript的对象是一组由键-值组成的无序集合，例如：

```javascript
var person = {
    name: 'Bob',
    age: 20,
    tags: ['js', 'web', 'mobile'],
    city: 'Beijing',
    hasCar: true,
    zipcode: null
};
```

JavaScript对象的键都是字符串类型，值可以是任意数据类型。上述`person`对象一共定义了6个键值对，其中每个键又称为对象的属性，例如，`person`的`name`属性为`'Bob'`，`zipcode`属性为`null`。

要获取一个对象的属性，我们用对象变量.属性名的方式：

```javascript
person.name; // 'Bob'
person.zipcode; // null
```

也可以用`对象变量['属性名']`的方式来获取，这种方式的好处是，属性名还可以包含空格：

```javascript
person['name']; // 'Bob'
person['zip code']; // null
```

如果属性名包含特殊字符，就必须用`''`括起来：

```javascript
var xiaohong = {
    name: '小红',
    'middle-school': 'No.1 Middle School'
};
```

`xiaohong`的属性`middle-school`不能写成`xiaohong.middle-school`，这是因为`-`会被JavaScript解释为减法。但是，`xiaohong['middle-school']`就可以正确取到`xiaohong`的`middle-school`属性，因为`'...'`字符串可以正确识别`-`。

访问不存在的属性不报错，而是返回`undefined`：

```javascript
var xiaoming = {
    name: '小明'
};

xiaoming.age; // undefined
xiaoming.age = 18; // 新增一个age属性
xiaoming.age; // 18
delete xiaoming.age; // 删除age属性
xiaoming.age; // undefined
delete xiaoming['name']; // 删除name属性
xiaoming.name; // undefined
delete xiaoming.school; // 删除一个不存在的school属性也不会报错
```

如果我们要检测`xiaoming`是否拥有某一属性，可以用`in`操作符：

```javascript
var xiaoming = {
    name: '小明',
    birth: 1990,
    school: 'No.1 Middle School',
    height: 1.70,
    weight: 65,
    score: null
};

'name' in xiaoming; // true
'grade' in xiaoming; // false
```

不过要小心，如果`in`判断一个属性存在，这个属性不一定是`xiaoming`的，它可能是`xiaoming`继承得到的：

```javascript
'toString' in xiaoming; // true
```

因为`toString`定义在`object`对象中，而所有对象最终都会在原型链上指向`object`，所以`xiaoming`也拥有`toString`属性。

要判断一个属性是否是`xiaoming`自身拥有的，而不是继承得到的，可以用`hasOwnProperty()`方法：

```javascript
var xiaoming = {
    name: '小明'
};

xiaoming.hasOwnProperty('name'); // true
xiaoming.hasOwnProperty('toString'); // false
```

### function

JavaScript的函数也是一个对象。JavaScript把每个函数都视为对象，都可以自由地赋值给其他变量，所以，把一个函数赋值给变量，这个变量就是一个函数对象了：

```javascript
var sum = function (x, y) {
    return x + y;
};
```

函数名就是指向函数的变量：

```javascript
sum; // function (x, y) { return x + y; }
sum(1, 2); // 3
```

由于函数是一个对象，所以，`x`和`y`都可以拥有属性：

```javascript
sum.name; // 'sum'
sum.length; // 2
```

因为函数解释起来过于复杂，所以在这里先省略。
