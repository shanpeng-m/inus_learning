# 23-11-4 prototype属性

JavaScript 中的 `prototype` 属性是一个非常重要的概念，它是函数对象的一个特性。JavaScript 是一种基于原型的语言，这意味着对象可以通过复制一个现有对象来创建，而不是通过实例化一个类来创建。在这种模式中，`prototype` 属性用于实现继承和共享属性。

这里有一些关于 `prototype` 属性的关键点：

1. **每个函数都有一个 `prototype` 属性**：在 JavaScript 中，每个函数创建时都会自带一个 `prototype` 属性，它默认是一个只有一个 `constructor` 属性的对象，该 `constructor` 属性指向函数本身。

2. **构造器用途**：当一个函数被用作构造器（即使用 `new` 关键字调用时），新创建的对象会继承该函数的 `prototype` 属性。这意味着所有通过同一个构造器创建的实例都会共享同一个原型对象。

3. **原型链**：每个 JavaScript 对象都有一个内部链接指向另一个对象，称为其原型。当试图访问一个对象的属性时，如果在该对象本身上没有找到，JavaScript 会沿着这个链接（原型链）查找，直到找到该属性或者达到原型链的末端。

4. **原型继承**：当一个对象继承另一个对象的原型时，它将能够使用其原型上定义的属性和方法。这是 JavaScript 中实现继承的一种方式。

5. **原型的修改**：如果你修改一个函数的 `prototype` 对象，所有继承该原型的实例都会受到影响。这可以用来动态地添加新的属性或方法到所有实例中。

举一个简单的例子：

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(this.name + ' makes a noise.');
}

var dog = new Animal('Dog');
dog.speak(); // 输出: Dog makes a noise.
```

在这个例子中，`Animal` 函数有一个 `prototype` 属性，该属性是一个对象，这个对象有一个名为 `speak` 的方法。当我们使用 `new Animal('Dog')` 创建一个新的 `Animal` 实例时，这个实例会继承 `Animal.prototype`，所以 `dog` 实例可以访问 `speak` 方法。

在编程语言中，原型（Prototype）和类（Class）是两种不同的面向对象编程范式。尽管它们在概念上有一定的相似性，因为它们都用于创建对象并定义对象之间的关系和继承模式，但它们在定义、使用和继承方面有根本的区别。

## 原型（Prototype）

- **基于原型的语言**：在JavaScript这样的基于原型的语言中，对象直接继承自其他对象。你可以创建一个对象，然后再创建另一个继承自第一个对象的对象，没有类的概念。
- **动态修改**：原型允许动态修改。这意味着你可以在运行时动态地给对象添加属性和方法。所有继承自该原型的对象都会立即获得这些新的属性和方法。
- **原型链**：对象的属性和方法查找是通过原型链来实现的，这是一个链接对象的列表，JavaScript引擎会沿着这个链向上查找，直到找到相应的属性或者到达链的终点。

## 类（Class）

- **基于类的语言**：在Java、C++、C#等这样的基于类的语言中，类是创建对象的蓝图或模板。类定义了属性和方法，然后你可以创建该类的实例，每个实例都会拥有类定义的属性和方法。
- **静态定义**：类通常在定义时就固定了。一旦类被定义，你就不能动态地给类添加新的属性和方法，而需要修改类定义本身。
- **继承**：类支持基于模板的继承，通常是单继承，意味着一个类只能继承自另一个类。但有些语言支持多继承。

JavaScript ES6之前是没有类语法的，但是ES6引入了`class`关键字，让基于原型的继承看起来更像是基于类的继承。尽管如此，JavaScript中的“类”实质上仍然是基于原型的。`class`语法提供了一种更清晰和更熟悉的方式来创建和管理对象原型，但它背后的原型继承机制并没有改变。

举个例子，使用ES6的`class`语法：

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  speak() {
    console.log(this.name + ' barks.');
  }
}

let dog = new Dog('Rex');
dog.speak(); // 输出: Rex barks.
```

在上面的例子中，`Dog`类继承自`Animal`类，使用`extends`关键字。虽然看起来像是传统的基于类的继承，但实际上它仍然是基于原型的继承。

JavaScript 中对象的原型属性和方法是可以随时被增加、删除和修改的。下面是一些如何操作原型的例子：

## 增加属性或方法

要增加一个属性或方法到原型，你可以直接给原型对象赋值。例如，给所有的数组增加一个 `first` 方法，可以这样做：

```javascript
if (!Array.prototype.first) {
  Array.prototype.first = function() {
    return this[0];
  };
}
```

这段代码首先检查 `Array.prototype` 是否已经有了 `first` 方法，如果没有，它就添加这个方法。这个 `first` 方法返回数组的第一个元素。

## 修改属性或方法

如果原型上已经有了一个属性或方法，你可以通过赋值来修改它：

```javascript
Array.prototype.first = function() {
  if (this.length === 0) {
    throw new Error('Cannot get the first element of an empty array.');
  }
  return this[0];
};
```

这里修改了 `first` 方法，让它在数组为空时抛出一个错误。

## 删除属性或方法

要从原型中删除一个属性或方法，可以使用 `delete` 操作符：

```javascript
delete Array.prototype.first;
```

这行代码会从 `Array` 的原型对象上删除 `first` 方法。任何之前能够访问这个方法的数组实例在这之后都将不能再访问这个方法。

## 注意事项

- 修改全局构造函数的原型被认为是一种不好的实践，因为它会影响到所有其他代码。例如，给 `Array.prototype` 添加方法会影响到所有使用数组的脚本。
- 在现代JavaScript编程中，通常推荐使用类和继承来代替直接操作原型。
- ES6以后，更推荐使用 `class` 语法来定义类和继承关系，它背后也是使用原型链来实现的，但语法更清晰、更易于理解。

总之，操作原型是一个强大但危险的工具。如果不小心使用，可能会导致难以追踪的错误和不兼容问题。在任何修改原型的情况下，都需要确保你完全理解可能的后果。

## Object对象

在JavaScript中，`Object`对象是大多数对象的原型雏形。在JavaScript的原型继承模型中，几乎所有的对象都是`Object`的实例，并从`Object.prototype`继承属性和方法。`Object.prototype`位于原型链的顶端；除了通过`Object.create(null)`创建的对象，几乎所有对象都会继承自`Object.prototype`。

### `Object`对象的角色和特性

- **原型的根**: `Object`是所有对象的父对象。所有通过对象字面量创建的对象或者使用构造器创建的对象都自动继承自`Object.prototype`。
- **全局构造函数**: `Object`也是一个全局构造函数，可以用来创建新的对象。例如：`let obj = new Object();`。

### `Object`构造函数的常用方法

- **`Object.create(proto, [propertiesObject])`**: 创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`。
- **`Object.assign(target, ...sources)`**: 通过复制一个或多个对象来创建一个新的对象。
- **`Object.defineProperty(obj, prop, descriptor)`**: 在一个对象上定义一个新属性，或修改一个对象的现有属性，并返回这个对象。
- **`Object.freeze(obj)`**: 冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象，则不能向这个对象添加新的属性，现有属性不能被删除或者修改，其可写性（writable）和可配置性（configurable）也不能被修改，也不能修改其原型。
- **`Object.is(value1, value2)`**: 比较两个值是否相同。所有的NaN值都相等（这与比较操作符`==`和`===`不同）。

### `Object.prototype`的常用方法

- **`Object.prototype.hasOwnProperty(prop)`**: 返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是是否有指定的键）。
- **`Object.prototype.isPrototypeOf(object)`**: 用于测试一个对象是否存在于另一个对象的原型链上。
- **`Object.prototype.toString()`**: 返回对象的字符串表示。
- **`Object.prototype.valueOf()`**: 返回指定对象的原始值。

### 用途和实例

由于`Object`是所有复杂数据类型的基础，所以它的方法非常有用，特别是在处理对象和原型链时。例如，你可能会使用`Object.create()`来创建一个继承自另一个对象的新对象，或者使用`Object.assign()`来复制对象或合并对象。`Object.defineProperty()`可以用来精确地控制属性的行为和可枚举性。

### 注意事项2

- `Object`对象提供的方法和属性是非常底层的。它们让开发者可以进行细粒度的对象控制和操作。
- JavaScript中的函数也是对象，它们也是`Object`的实例，因此也继承了`Object.prototype`的方法。
- 修改`Object.prototype`会影响所有的对象，这通常是不推荐的，因为它可能会导致意外的副作用。

`Object`在JavaScript中扮演着基础和核心的角色，了解它的行为对于深入理解和有效使用JavaScript是非常关键的。

## JavaScript的面向对象编程

### 类和继承

JavaScript 有 `class` 的概念，尽管它在功能上与传统面向对象编程语言中的类略有不同。JavaScript 的 `class` 语法是在 ES6（ECMAScript 2015）中引入的，它提供了一种更清晰和更简洁的方式来创建对象和处理继承。

在 ES6 之前，JavaScript 使用构造函数和原型链来实现类似类的结构和继承。ES6 的 `class` 语法实际上是这些现有原型继承特性的语法糖，背后的原型继承机制并没有改变。

### 类的声明

一个简单的类可以这样声明：

```javascript
class MyClass {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name}!`);
  }
}

const myInstance = new MyClass('Alice');
myInstance.sayHello(); // 输出: Hello, my name is Alice!
```

### 继承

类的继承可以通过 `extends` 关键字来实现：

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks.`);
  }
}

let dog = new Dog('Rex');
dog.speak(); // 输出: Rex barks.
```

### 静态方法

`class` 也可以定义静态方法，这些方法通常用于实现与类相关的功能，而不是与类的实例相关的功能。

```javascript
class StaticMethodCall {
  static staticMethod() {
    return 'Static method has been called.';
  }
}

console.log(StaticMethodCall.staticMethod()); // 输出: Static method has been called.
```

### Getter 和 Setter

类也可以包含 getter 和 setter 方法，用于控制对特定属性的访问。

```javascript
class MyClass {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    this._name = newName;
  }
}

const myInstance = new MyClass('Alice');
console.log(myInstance.name); // 输出: Alice
myInstance.name = 'Bob';
console.log(myInstance.name); // 输出: Bob
```

### 类表达式

和函数一样，类也可以通过表达式来定义，不必使用声明。

```javascript
const Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
```

### 私有字段和方法

最新的 JavaScript 版本还引入了私有字段和私有方法的概念，允许类的内部状态和行为被封装起来。

```javascript
class MyClassWithPrivateField {
  #privateField;

  constructor() {
    this.#privateField = 42;
  }
}
```

`class` 语法让基于原型的继承看起来更像是基于类的编程，但重要的是要理解，JavaScript 的类本质上仍然是基于原型的。这意味着类方法和行为都是通过原型链来实现的。

### const量

在JavaScript的类定义中，不能直接声明 `const` 变量作为类的属性。类体是执行类成员函数定义的地方，并不是一个声明环境，所以你不能在其中声明一个 `const` 变量。

但是，你可以使用 `static` 关键字来创建类级别的不变属性，这类似于在其他语言中的常量。虽然 `static` 属性的值可以改变，但是遵循编程约定，你可以不去改变它们，从而模拟常量的行为。

例如：

```javascript
class MyClass {
  static readonly MY_CONSTANT = 42;

  myMethod() {
    console.log(MyClass.MY_CONSTANT);
  }
}
```

在这个例子中，`MY_CONSTANT` 被视为一个常量，按照约定不应该修改它的值。它可以通过类名来访问，例如 `MyClass.MY_CONSTANT`，而不是通过类的实例。

如果你想要一个真正的私有常量，你可能需要在类的构造函数外部使用闭包，或者在类的构造函数中使用私有字段（使用 `#` 前缀）。私有字段是ES2022标准引入的新特性，可以这样使用：

```javascript
class MyClassWithPrivateConst {
  #myPrivateConst;

  constructor() {
    this.#myPrivateConst = 42;
    // As per convention, since it's a const, we don't provide a way to change it.
  }

  get myConst() {
    return this.#myPrivateConst;
  }
}

const myInstance = new MyClassWithPrivateConst();
console.log(myInstance.myConst); // 42
```

在这个例子中，`#myPrivateConst` 是一个实例的私有字段，它在类的内部被初始化，外部无法访问，也不会被修改，因此它的行为类似于一个常量。

## this

在JavaScript中，`this` 关键字是一个指示符，它通常指向函数执行时的上下文对象。`this` 的值是在函数被调用时确定的，而不是在函数被定义时确定的。它的值取决于函数的调用方式。

### 全局上下文

在全局执行上下文中（不在任何函数内部），`this` 指向全局对象。在浏览器中，全局对象是 `window`，而在 Node.js 中，是 `global`。

```javascript
console.log(this === window); // 在浏览器中输出 true
```

### 函数上下文

在普通函数调用中，`this` 的值取决于严格模式的使用和函数如何被调用。

```javascript
function myFunction() {
  console.log(this);
}

myFunction(); // 在非严格模式下，this 指向全局对象，严格模式下为 undefined
```

### 方法调用

当函数作为对象的方法被调用时，`this` 指向那个对象。

```javascript
const myObject = {
  method() {
    console.log(this);
  }
};

myObject.method(); // this 指向 myObject
```

### 构造函数

在构造函数中，`this` 指向新创建的对象。

```javascript
function MyConstructor() {
  console.log(this);
  this.value = 42;
}

const instance = new MyConstructor(); // this 指向 instance
```

### 箭头函数

箭头函数不绑定自己的 `this`，它们继承自父执行上下文中的 `this` 值。

```javascript
const myObject = {
  myMethod: function() {
    const arrowFunc = () => {
      console.log(this); // this 与外层函数的 this 相同
    };
    arrowFunc();
  }
};

myObject.myMethod(); // this 在 arrowFunc 中指向 myObject
```

### 显式绑定

使用 `call`、`apply` 或 `bind` 方法，可以将一个特定的对象作为 `this` 的值传递给任何函数。

```javascript
function myFunction() {
  console.log(this);
}

const myContext = { value: 'A' };

myFunction.call(myContext);  // this 指向 myContext 对象
myFunction.apply(myContext); // 与 .call() 类似，但参数是以数组形式传入
const boundFunction = myFunction.bind(myContext);
boundFunction(); // this 指向 myContext 对象
```

### 事件处理器

在DOM事件处理函数中，`this` 通常指向触发事件的元素。

```javascript
const button = document.querySelector('button');
button.addEventListener('click', function() {
  console.log(this); // this 指向 button 元素
});
```

`this` 在JavaScript中是一个复杂且强大的概念，正确理解其工作方式对于编写可预测的代码至关重要。

## 封装

在编程中，封装（Encapsulation）是面向对象编程（OOP）的一个核心概念，它是指将对象的数据（属性）和操作这些数据的方法绑定到一起，对外隐藏对象的实现细节。尽管JavaScript不是一种传统的面向对象语言，它依然提供了封装数据和方法的能力。

在JavaScript中，封装可以通过以下几种方式实现：

### 1. 使用函数作用域和闭包

```javascript
function createCounter() {
  let count = 0;
  return {
    increment() {
      count++;
    },
    getValue() {
      return count;
    }
  };
}

const counter = createCounter();
counter.increment();
console.log(counter.getValue()); // 1
console.log(counter.count);      // undefined, 因为count是私有的
```

在这个例子中，`count` 变量被封装在 `createCounter` 函数内部，外部代码不能直接访问它。

### 2. 使用构造函数和原型

```javascript
function Counter() {
  let count = 0; // 私有变量

  this.increment = function() {
    count++;
  };

  this.getValue = function() {
    return count;
  };
}

const counter = new Counter();
counter.increment();
console.log(counter.getValue()); // 1
```

通过使用构造函数，你可以创建有特定方法的对象，而这些方法可以访问构造函数中定义的私有变量。

### 3. 使用ES6的类和模块

```javascript
class Counter {
  #count = 0; // 私有字段

  increment() {
    this.#count++;
  }

  getValue() {
    return this.#count;
  }
}

const counter = new Counter();
counter.increment();
console.log(counter.getValue()); // 1
```

在这个例子中，`#count` 是一个私有字段，只能在类的内部被访问和修改。

### 4. 使用模块

模块在JavaScript中是原生支持的封装形式。每个模块只暴露它选择暴露的部分，而内部的实现保持私有。

```javascript
// counter.js
let count = 0;

export function increment() {
  count++;
}

export function getValue() {
  return count;
}

// 在另一个文件中
import { increment, getValue } from './counter.js';

increment();
console.log(getValue()); // 1
```

在这个模块中，变量 `count` 对于导入模块的代码是不可见的。

封装在JavaScript中是通过函数作用域、闭包、类的私有字段和模块来实现的。它帮助创建了定义良好的接口，并且保护了对象的状态和行为，防止了外部代码不恰当地干预内部工作。

## itarator 迭代器

在JavaScript中，迭代器（Iterator）是一个对象，它定义了一个序列并且可能返回一个序列中的一次一个的值（通过调用迭代器的 `next()` 方法）。迭代器对象返回的每个值都包装在一个对象中，这个对象有两个属性：`value` 和 `done`。`value` 属性表示当前的值，而 `done` 是一个布尔值，当迭代器被耗尽时为 `true`。

迭代器是ES6中引入的，作为一种更正式的方式来遍历数据——尤其是对于自定义的数据结构。内建的数据结构如 `Array`、`Map`、`Set` 等都有默认的迭代器。

### 例子：创建一个简单的迭代器

```javascript
function makeRangeIterator(start = 0, end = Infinity, step = 1) {
    let nextIndex = start;
    let iterationCount = 0;

    const rangeIterator = {
       next: function() {
           let result;
           if (nextIndex < end) {
               result = { value: nextIndex, done: false };
               nextIndex += step;
               iterationCount++;
               return result;
           }
           return { value: iterationCount, done: true };
       }
    };
    return rangeIterator;
}

const it = makeRangeIterator(1, 10, 2);

let result = it.next();
while (!result.done) {
 console.log(result.value); // 1, 3, 5, 7, 9
 result = it.next();
}
console.log("Iterated over sequence of size: ", result.value); // 5
```

在这个例子中，`makeRangeIterator` 函数返回一个迭代器，该迭代器会遍历一个范围内的数字。

### 内建迭代器的使用

当使用内建的数据结构时，你通常不需要直接与迭代器交互，因为 `for...of` 循环会自动处理迭代器：

```javascript
const arr = [1, 2, 3, 4, 5];

for (const value of arr) {
  console.log(value); // 1, 2, 3, 4, 5
}
```

在这个例子中，数组 `arr` 的默认迭代器被 `for...of` 循环使用来遍历数组。

### 迭代器协议

迭代器协议定义了产生一系列值（无论是有限还是无限的）的标准方式。任何对象都可以成为迭代器，只要它实现了 `.next()` 方法，该方法返回一个对象，具有 `value` 和 `done` 两个属性。

### 可迭代协议

一个对象如果要成为 *可迭代的*（即可以被 `for...of` 循环遍历），它必须实现 `@@iterator` 方法，意味着对象（或其原型链中的一个对象）必须有一个名为 `Symbol.iterator` 的属性：

```javascript
const obj = {
  start: 1,
  end: 5,
  
  [Symbol.iterator]() {
    let currentValue = this.start;
    const self = this;
    return {
      next() {
        if (currentValue <= self.end) {
          return { value: currentValue++, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for (const value of obj) {
  console.log(value); // 1, 2, 3, 4, 5
}
```

在这个例子中，对象 `obj` 是可迭代的，因为它实现了 `@@iterator` 方法，因此可以使用 `for...of` 循环直接遍历。