# 23-10-10 Object对象

## Object对象

创建一个Object对象有三个方法：
new运算符，Object.create()，对象字面量。

### new运算符

```javascript
let obj = new Object();
```

### Object.create()

```javascript
let obj = Object.create(null);
```

### 对象字面量

```javascript
let obj = {};
```

## 定义对象的属性

正如前面所说，对象是一系列属性和方法的集合。属性是对象的状态，方法是对象的行为。

例如

```javascript
let member = {
    name: '张三',
    age: 25,
    show: function () {
        console.log(this.name + '今年' + this.age + '岁了');
    }
};

member.show(); // 张三今年25岁了
```

就像上面的例子：

show方法也可以写成

```javascript
let member = {
    name: '张三',
    age: 25,
    show() {
        console.log(this.name + '今年' + this.age + '岁了');
    }
};
```

但是需要注意的是，箭头函数不能用来定义对象的方法，因为箭头函数没有自己的this，它的this是继承自外层代码块的。

### 自动生成属性名

例如：

```javascript
let i = 0;
let member = {
    name : '张三',
    birth : new Date(1990, 2, 3),
    [`memo${++i}`]: '这是第一个备忘录',
    [`memo${++i}`]: '这是第二个备忘录',
    [`memo${++i}`]: '这是第三个备忘录',
};

console.log(member); // { name: '张三', birth: 1990-03-02T16:00:00.000Z, memo1: '这是第一个备忘录', memo2: '这是第二个备忘录', memo3: '这是第三个备忘录' }
```

也就是说，属性名可以是任意的字符串，包括空字符串。如果属性名是数值，会被自动转为字符串。

'use strict';模式下，如果对象有重名的属性，会报错。

```javascript
'use strict';
let member = Object.create(Object.prototype, {
    name: {
        value: '张三',
        writable: true,
        configurable: true,
        enumerable: true
    },
    birth: {
        value: new Date(1990, 2, 3),
        writable: true,
        configurable: true,
        enumerable: true
    },
    memo: {
        value: '这是一个备忘录',
        writable: true,
        configurable: true,
        enumerable: true
    },
});

member.memo = '这是一个新的备忘录';

for (let key in member) {
    console.log(`${key}: ${member[key]}`);
}// name: 张三
// birth: 1990-03-02T16:00:00.000Z
// memo: 这是一个新的备忘录
delete member.memo;
console.log(member.memo); // undefined
```

### getter and setter

```javascript
let member = {
    name: '张三',
    birth: new Date(1990, 2, 3),
    get age() {
        return new Date().getFullYear() - this.birth.getFullYear();
    },
    set age(value) {
        console.log('set age: ' + value);
    }
};

console.log(member.age); // 29
member.age = 100; // set age: 100
console.log(member.age); // 100
```

```javascript
let member = Object.create(Object.prototype, {
    name: {
        value: '张三',
        writable: true,
        configurable: true,
        enumerable: true
    },
    birth: {
        value: new Date(1990, 2, 3),
        writable: true,
        configurable: true,
        enumerable: true
    },
    age: {
        get() {
            let birth = this.birth;
            let current = new Date();
            let c_birth = new Date(current.getFullYear(), birth.getMonth(), birth.getDate());
            retrun (current.getFullYear() - birth.getFullYear()) + (c_birth.getTime() > current.getTime() ? -1 : 0)
        },
        configurable: true,
        enumerable: true
        set(value) {
            console.log('set age: ' + value);
        }
    },
    gender: {
        get() {
            if (!this._gender) {return 'unkonwn';}
            return this._gender;
        },
        set(value) {
            if (!['male', 'female', 'unknown'].includes(value)) {
                throw new Error('gender is invalid');
            }
            this._gender = value;
        },
        configurable: true,
        enumerable: true
    },
});

member.gender = 'male';
console.log(member.gender); // male
console.log(member.age); // 29
```