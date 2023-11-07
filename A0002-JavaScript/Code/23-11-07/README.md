# 23-11-07 - `window` 对象

## JavaScript - `window` 对象

JavaScript 中的 `window` 对象代表了浏览器窗口，并且作为全局对象在浏览器的环境中扮演着核心的角色。在浏览器环境中，`window` 对象具有多重作用：

1. **全局对象**：在浏览器环境中，全局变量都是 `window` 对象的属性，全局函数是 `window` 对象的方法。

2. **窗口操作**：通过 `window` 对象，我们可以控制浏览器窗口的行为，例如打开新窗口、关闭窗口、调整窗口大小、查询窗口大小和位置等。

3. **浏览器对象模型（BOM）**：`window` 对象是浏览器对象模型（BOM）的一部分，它提供了与浏览器交互的方法和属性，包括对浏览器历史、屏幕、位置和导航器的访问。

以下是 `window` 对象中一些常用的属性和方法的简要介绍：

### 属性

- `window.document`：指向 `document` 对象，它代表了加载在窗口中的 HTML 文档。
- `window.location`：提供了当前窗口的 URL 信息，可以用来获取地址、重定向到新的页面等。
- `window.history`：允许对浏览器的会话历史进行操作，比如后退和前进。
- `window.screen`：包含了有关用户屏幕的信息，如宽度和高度。
- `window.innerWidth` 和 `window.innerHeight`：提供了窗口内容区域的尺寸。
- `window.localStorage` 和 `window.sessionStorage`：提供了Web存储API，允许存储键值对数据。

### 方法

- `window.alert()`：显示一个带有消息和一个确认按钮的警告框。
- `window.confirm()`：显示一个带有消息和确认及取消按钮的对话框。
- `window.prompt()`：显示一个带有消息、输入框和确认取消按钮的对话框。
- `window.open()`：打开一个新的浏览器窗口或标签页。
- `window.close()`：关闭当前窗口。
- `window.setTimeout()` 和 `window.setInterval()`：分别用于设置延迟执行函数和重复执行函数的定时器。
- `window.clearTimeout()` 和 `window.clearInterval()`：分别用于取消由 `setTimeout()` 和 `setInterval()` 设置的定时器。

### 事件

`window` 对象也是事件的触发者，例如：

- 当用户调整浏览器窗口大小时会触发 `resize` 事件。
- 当页面加载完成后触发 `load` 事件。
- 当页面即将卸载时触发 `beforeunload` 事件。

### 使用例子

```javascript
// 显示一个简单的警告框
window.alert("Hello, world!");

// 询问用户是否真的想要离开页面
window.onbeforeunload = function() {
  return "你确定要离开吗？";
};

// 打开一个新的窗口
let newWindow = window.open("https://www.example.com", "_blank");

// 设置一个5秒后执行的函数
let timeoutID = window.setTimeout(function() {
  alert("这是5秒后的消息！");
}, 5000);

// 每隔1秒钟执行一次的定时器
let intervalID = window.setInterval(function() {
  console.log("这条消息会每隔1秒钟打印一次");
}, 1000);

// 获取窗口的宽度和高度
let width = window.innerWidth;
let height = window.innerHeight;
```

在 JavaScript 中，`console` 对象是一个内建的对象，提供了访问浏览器控制台的功能。控制台通常用于输出调试信息，但它也可以做更多的事情。`console` 对象的方法可以在浏览器的开发者工具中执行，以便开发者可以记录信息、警告、错误等，或者进行JavaScript表达式的即时评估。

以下是 `console` 对象的一些常用方法：

### 输出方法

- `console.log()`：最常用的方法，用于输出普通的日志信息。
- `console.info()`：用于输出信息性消息，与 `log()` 类似，在不同浏览器中可能显示图标不同。
- `console.warn()`：用于输出警告信息，通常会有警告图标和不同的文本颜色以区别于普通日志。
- `console.error()`：用于输出错误信息，错误信息通常带有错误图标，并且有不同的颜色。
- `console.debug()`：用于输出调试信息，与 `log()` 方法相似，但是可以根据浏览器的设置来开启或关闭调试信息的显示。

### 分组方法

- `console.group()`：创建一个新的内联消息组，后续的所有消息都会被缩进，表示它们属于这个组。
- `console.groupCollapsed()`：同 `group()`，但是新创建的消息组是默认折叠的，用户可以点击展开。
- `console.groupEnd()`：结束当前的消息组。

### 计时方法

- `console.time()`：启动一个计时器，可以用来跟踪操作耗时。
- `console.timeEnd()`：停止对应的计时器，并输出所耗费的时间。
- `console.timeLog()`：记录当前计时器的值。

### 其他方法

- `console.table()`：将复杂的数据结构以表格的形式输出，便于查看。
- `console.clear()`：清空控制台信息。
- `console.assert()`：如果断言的第一个参数为 `false`，则输出信息。用于进行条件判断，输出不符合条件时的错误信息。
- `console.trace()`：输出当前的堆栈跟踪。
- `console.count()`：计数输出某个标签被调用的次数。
- `console.dir()`：以 JSON 的形式显示一个对象的属性，可以深入查看对象。

### 使用例子

```javascript
// 常规日志输出
console.log("这是一个普通的日志信息。");

// 信息性消息
console.info("这是一个信息性的消息。");

// 警告信息
console.warn("这是一个警告信息。");

// 错误信息
console.error("这是一个错误信息。");

// 分组输出
console.group("我的分组");
console.log("第一项");
console.log("第二项");
console.groupEnd();

// 计时器
console.time("计时器");
// 执行一些操作...
console.timeEnd("计时器");

// 断言
console.assert(1 === 2, "这将会输出错误信息，因为1不等于2");

// 显示对象属性
console.dir(document.head);

// 堆栈跟踪
console.trace("跟踪");

// 计数器
console.count("计数器");
console.count("计数器");
console.count("计数器");
```

`console` 对象中的方法通常用于开发阶段来辅助开发者调试代码，但它们也可用于运行时的日志记录等用途。它们的实际表现可能会根据不同的浏览器有所差异。在编写生产级别的代码时，应该考虑到这些方法可能会对性能有所影响，并且在生产环境中应该减少或移除调试代码。
