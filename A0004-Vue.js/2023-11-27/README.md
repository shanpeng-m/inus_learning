# 2023-11-27

## Vue 中的指令（以 `v-` 开头的）。

Vue 提供了一系列内置的指令，用于在模板中执行特定的操作。这些指令包括但不限于：

1. `v-bind`: 动态地绑定一个或多个特性，或一个组件 prop 到表达式。
2. `v-model`: 在表单控件或组件上创建双向绑定。
3. `v-for`: 基于源数据多次渲染元素或模板块。
4. `v-if`, `v-else-if`, `v-else`: 根据表达式的值的真假条件渲染元素。
5. `v-on`: 监听 DOM 事件，并在触发时执行一些 JavaScript。
6. `v-show`: 根据表达式之真假值，切换元素的 `display` CSS 属性。
7. `v-pre`: 跳过这个元素和它的子元素的编译过程。
8. `v-cloak`: 这个指令会在关联实例结束编译时被移除。
9. `v-once`: 执行一次性的插值，当数据改变时，插值处的内容不会更新。

每个指令都有其特定的用途。例如，`v-bind` 用于动态地绑定 HTML 属性到表达式，而 `v-on` 用于监听 DOM 事件。

下面是一些简单的例子来演示这些指令的用法：

### `v-bind` 示例

HTML：

```html
<div id="app">
  <img v-bind:src="imageSrc">
</div>
```

JavaScript：

```javascript
new Vue({
  el: '#app',
  data: {
    imageSrc: 'path/to/image.jpg'
  }
});
```

### `v-model` 示例

HTML：

```html
<div id="app">
  <input v-model="message">
  <p>The value of the input is: {{ message }}</p>
</div>
```

JavaScript：

```javascript
new Vue({
  el: '#app',
  data: {
    message: ''
  }
});
```

### `v-for` 示例

HTML：

```html
<div id="app">
  <ul>
    <li v-for="item in items">{{ item.text }}</li>
  </ul>
</div>
```

JavaScript：

```javascript
new Vue({
  el: '#app',
  data: {
    items: [
      { text: 'Item 1' },
      { text: 'Item 2' },
      { text: 'Item 3' }
    ]
  }
});
```

## 和事件相关的指令

### `v-on` 指令

`v-on` 指令用于监听 DOM 事件，并在触发时执行一些 JavaScript 代码。

HTML：

```html 
<div id="app">
  <button v-on:click="handleClick">Click me</button>
  <p>{{ message }}</p>
</div>
```

JavaScript：

```javascript
Vue.createApp({
  data() {
    return {
      message: ''
    };
  },
  methods: {
    handleClick() {
      this.message = 'Hello World'
    }
  }
}).mount('#app')
```

v-on: 这是 Vue 中用于附加事件监听器的指令。
click: 这是具体要监听的 DOM 事件类型，在这里是鼠标点击事件。
handleClick: 这是当事件发生时要调用的方法名。

v-on可以简写为@，例如：

```html
<button @click="handleClick">Click me</button>
```

引号里面的内容是一个表达式，这个表达式的值是一个方法名，这个方法名对应的方法会在事件发生时被调用。

写成 `handleClick()` 和只写 `handleClick` 在 Vue 中有重要区别：

1. **handleClick**:
   - 当你在 `v-on:click` 中使用 `handleClick`（没有括号），你是在传递这个函数的引用。这意味着当点击事件发生时，Vue 将调用这个函数。
   - 这种方式允许你在事件发生时传递原生的事件对象（例如 `MouseEvent`）到 `handleClick` 函数中。如果你的函数需要这个事件对象，Vue 会自动提供它。

2. **handleClick()**:
   - 当你写成 `handleClick()`（有括号）时，你是在指令中直接调用这个函数。这通常不是你想要的，因为它会在 Vue 实例渲染时立即调用该函数，而不是在点击事件发生时。
   - 这种方式通常用于你需要在事件处理器中传递特定参数的情况，而不是使用由事件本身自动传递的事件对象。

例如：

```html
<!-- 传递函数引用，点击时调用 -->
<button v-on:click="handleClick">Click me</button>

<!-- 传递一个立即调用的函数，这通常不是你想要的，除非你需要传递特定的参数 -->
<button v-on:click="handleClick()">Click me</button>
```

如果你的 `handleClick` 方法不需要接收任何特别的参数，而只是想在点击事件发生时调用，那么你应该使用没有括号的形式 `handleClick`。如果你需要传递特定的参数（不是事件对象），那么你可以使用带括号的形式，并在里面指定你的参数，例如 `handleClick(param)`。

### Vue中可以使用的事件

#### form表单事件

- `v-on:submit`：监听表单的提交事件。
- `v-on:focus`：监听元素获取焦点的事件。
- `v-on:blur`：监听元素失去焦点的事件。
- `v-on:change`：监听元素的值发生改变的事件。
- `v-on:selsect`：监听元素被选中的事件。

#### 鼠标事件

- `v-on:click`：监听元素被点击的事件。
- `v-on:dblclick`：监听元素被双击的事件。
- `v-on:mousedown`：监听鼠标按下的事件。
- `v-on:mouseup`：监听鼠标松开的事件。
- `v-on:mousemove`：监听鼠标移动的事件。
- `v-on:mouseover`：监听鼠标移入的事件。
- `v-on:mouseout`：监听鼠标移出的事件。
- `v-on:mouseleave`：监听鼠标离开的事件。
- `v-on:mouseenter`：监听鼠标进入的事件。

#### 键盘事件

- `v-on:keydown`：监听键盘按下的事件。
- `v-on:keyup`：监听键盘松开的事件。
- `v-on:keypress`：监听键盘按下并松开的事件。

#### 其他事件

- `v-on:resize`：监听窗口大小改变的事件。
- `v-on:scroll`：监听元素滚动的事件。
- `v-on:error`：监听资源加载失败的事件。
- `v-on:contextmenu`：上下文菜单事件。

`mouseenter`、`mouseleave`、`mouseover` 和 `mouseout` 是 DOM 中的鼠标事件，它们之间有一些重要的区别：

1. **mouseenter**:
   - 当鼠标指针进入元素或其子元素的时候触发。
   - 不会冒泡，即只在鼠标指针进入绑定了事件监听器的那个元素时触发。
   - 不会因为鼠标指针在其子元素之间移动而重复触发。

2. **mouseleave**:
   - 当鼠标指针离开元素或其子元素的时候触发。
   - 与 `mouseenter` 类似，`mouseleave` 也不冒泡，并且只在鼠标离开绑定了事件监听器的元素时触发。
   - 不会因为鼠标指针在其子元素之间移动而重复触发。

3. **mouseover**:
   - 当鼠标指针移动到元素或其子元素上时触发。
   - 与 `mouseenter` 不同，`mouseover` 事件会冒泡。这意味着它不仅在鼠标指针移动到元素上时触发，也会在鼠标指针移动到其任何子元素上时触发。
   - 可以在鼠标指针在元素的不同子元素之间移动时重复触发。

4. **mouseout**:
   - 当鼠标指针离开元素或其子元素时触发。
   - 类似于 `mouseover`，`mouseout` 事件也会冒泡。
   - 也会在鼠标指针从元素的一个子元素移动到另一个子元素时触发。

- `mouseenter` 和 `mouseleave` 更适用于当你需要处理鼠标指针进入或离开一个元素时的情况，而不希望子元素的移动触发事件。
- `mouseover` 和 `mouseout` 则适用于需要考虑元素及其子元素的情况，且这两者会在指针移动到子元素时重复触发。

## v-error 指令

`v-error` 指令用于监听资源加载失败的事件。

例如在图片加载失败时，显示一张默认的图片：

HTML：

```html
<div id="app">
  <img v-bind:src="imageSrc" v-on:error="handleError">
</div>
```

JavaScript：

```javascript
Vue.createApp({
  data() {
    return {
      imageSrc: 'path/to/image.jpg'
    };
  },
  methods: {
    handleError() {
      this.imageSrc = 'path/to/default-image.jpg';
    }
  }
}).mount('#app')
```