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

## 其他对象

Global对象是一个单例对象，它的属性和方法不需要创建对象就可以使用。