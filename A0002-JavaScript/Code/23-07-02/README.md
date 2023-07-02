# 23-07-02 Map对象

## Map对象

Map对象是一种有序的键值对集合，可以通过键来访问值，键不能重复。

## 创建Map对象

```javascript
let data = new Map([
    ['1st', 'a'],
    ['2nd', 'b'],
    ['3rd', 'c'],
]);

console.log(data); // Map { '1st' => 'a', '2nd' => 'b', '3rd' => 'c' }
```

```javascript
let keys = ['1st', '2nd', '3rd'];
let values = ['a', 'b', 'c'];

let data = new Map(
    keys.map(function (key, index) {
        return [key, values[index]];
    })
);

console.log(data); // Map { '1st' => 'a', '2nd' => 'b', '3rd' => 'c' }
```

```javascript
console.log(map.size); // 3
```

## Map对象的get,set方法

```javascript
let data = new Map();
data.set('1st', 'a').set('2nd', 'b').set('3rd', 'c');

console.log(data.get('1st')); // a
console.log(data.get('2nd')); // b
console.log(data.get('3rd')); // c
```

## Map对象的has方法

```javascript
let data = new Map();
data.set('1st', 'a').set('2nd', 'b').set('3rd', 'c');
console.log(data.has('1st')); // true
console.log(data.has('2nd')); // true
console.log(data.has('3rd')); // true
console.log(data.has('4th')); // false
```

注意：has方法使用===比较，比较的是键。NaN===NaN是True。

```javascript
let data = new Map();
data.set(NaN, 'a');
console.log(data.get(NaN)); // a
console.log(data.has(NaN)); // true
```

## Map对象的delete方法

```javascript
let data = new Map();
data.set('1st', 'a').set('2nd', 'b').set('3rd', 'c');
console.log(data.delete('1st')); // true
console.log(data.delete('2nd')); // true
console.log(data.delete('4th')); // false
console.log(data) // Map { '3rd' => 'c' }
```

clear方法可以清空Map对象。

```javascript
let data = new Map();
data.set('1st', 'a').set('2nd', 'b').set('3rd', 'c');
console.log(data.clear()); // undefined
console.log(data); // Map {}
```

## Map对象的forEach方法

```javascript
let data = new Map();
data.set('1st', 'a').set('2nd', 'b').set('3rd', 'c');
for (let key of data.keys()) {
    console.log(key); // 1st 2nd 3rd
}
for (let value of data.values()) {
    console.log(value); // a b c
}
for (let [key, value] of data.entries()) {
    console.log(`${key} : ${value}`); // 1st : a 2nd : b 3rd : c
}
```

forEach方法的回调函数的参数依次为键值对、键、值。

```javascript
let data = new Map();
data.set('1st', 'a').set('2nd', 'b').set('3rd', 'c');
data.forEach(function (value, key) {
    console.log(`${key} : ${value}`); // 1st : a 2nd : b 3rd : c
});
```

Object和Map互换

```javascript
let map = new Map([
    ['name', '张三'],
    ['title', 'Author']
]);
console.log(Object.fromEntries(map)); // { name: '张三', title: 'Author' }

let obj = {
    name: '张三',
    title: 'Author'
};
let map = new Map(Object.entries(obj));
console.log(map); // Map { 'name' => '张三', 'title' => 'Author' }
```

WeakMap对象: WeakMap对象只接受对象作为键名（null除外），不接受其他类型的值作为键名。

```javascript
let obj = {};
let data = new WeakMap();
data.set(obj, 'a');
console.log(data.get(obj)); // a
```

在JavaScript中，`WeakMap`是一种特殊的Map（映射）类型。它是ECMAScript 6（ES6）中引入的一种数据结构，用于存储键值对。与普通的Map不同，`WeakMap`的键必须是对象，并且对键的引用是弱引用。

`WeakMap`的主要特点如下：

1. 弱引用键：`WeakMap`中的键是弱引用的，这意味着如果没有其他地方引用该键对象，垃圾回收机制可能会自动删除该键及其关联的值。这是与普通`Map`最大的区别之一。因此，`WeakMap`通常用于存储临时数据或者不需要长期保留的数据。

2. 仅支持对象作为键：由于`WeakMap`的键是弱引用的，使用原始类型（例如字符串或数字）作为键是不允许的。键必须是对象。

3. 无迭代和枚举：`WeakMap`没有提供像`Map`中的`keys()`、`values()`和`entries()`方法，也不能使用`for...of`循环迭代。这是为了保护键的弱引用特性。

4. 没有公开的迭代器：`WeakMap`没有提供直接访问其所有键或值的方法。因为键的弱引用特性，无法保证在遍历过程中键仍然存在。

`WeakMap`的主要用途是在某些场景下存储临时数据或与对象关联的私有数据。常见的应用包括缓存、事件处理程序、私有属性等。

以下是`WeakMap`的基本用法示例：

```javascript
const wm = new WeakMap();

const obj1 = {};
const obj2 = {};

wm.set(obj1, 'value1');
wm.set(obj2, 'value2');

console.log(wm.get(obj1)); // 输出：value1
console.log(wm.get(obj2)); // 输出：value2

wm.delete(obj1);
console.log(wm.get(obj1)); // 输出：undefined
```

请注意，由于键的弱引用特性，当不再使用键对象时，它们会被自动清除，并且在`WeakMap`中无法遍历或访问已删除的键。
