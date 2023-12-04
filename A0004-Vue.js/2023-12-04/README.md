# 2023-12-04

## 3-4 绑定数据的derective

### 3-4-1 v-bind 把数据绑定到属性上

```html
<div id="app">
    <form>
        <label for="memo">Memo:</label>
        <input type="text" id="memo" v-bind="attrs"/>
    </form>
</div>
```

```javascript
Vue.createApp({
    data() {
        return {
            attrs: {
                size: 20,
                maxlength: 20,
                required: true
            }
        }
    }
}).mount('#app');
```

相当于

```html
<input type="text" id="memo" size="20" maxlength="20" required=true/>
```

设定的属性重复的时候，后面的会覆盖前面的。

### 3-4-2 v-html 把数据绑定到元素的innerHTML上

```html
<div id="app">
    <div v-html="html"></div>
</div>
```

```javascript
Vue.createApp({
    data() {
        return {
            html: '<span style="color: red">Hello</span>'
        }
    }
}).mount('#app');
```

上面的相当于

```html
<div id="app">
    <div><span style="color: red">Hello</span></div>
</div>
```

### 3-4-3 v-once 只绑定一次

```html
<div id="app">
    <div v-once>{{message}}</div>
</div>
```

```javascript
Vue.createApp({
    data() {
        return {
            message: 'Hello'
        }
    }
}).mount('#app');
```

上面的相当于

```html
<div id="app">
    <div>Hello</div>
</div>
```

使用场景：当数据不会变化的时候，使用v-once，可以提高性能。

### 3-4-4- v-bind:style 绑定样式

```html
<div id="app">
    <div v-bind:style="style">{{message}}</div>
</div>
```

```javascript
Vue.createApp({
    data() {
        return {
            message: 'Hello',
            style: {
                color: 'red',
                fontSize: '20px'
            }
        }
    }
}).mount('#app');
```

甚至可以直接写成

```html
<div id="app">
    <div v-bind:style="{color: 'red', fontSize: '20px'}">{{message}}</div>
</div>
```

```javascript
Vue.createApp({
    data() {
        return {
            message: 'Hello'
        }
    }
}).mount('#app');
```

v-bind:style 可以根据浏览器的变化，自动补充浏览器前缀。

例如：在Chrome中，会自动补充-webkit-。

```html
<div id="app">
    <div v-bind:style="{color: 'red', fontSize: '20px', display: '-webkit-box'}">{{message}}</div>
</div>
```

```javascript
Vue.createApp({
    data() {
        return {
            message: 'Hello'
        }
    }
}).mount('#app');
```

上面的相当于

```html
<div id="app">
    <div style="color: red; font-size: 20px; display: -webkit-box;">Hello</div>
</div>
```

### 3-4-5 v-bind:class 绑定class

```html
<div id="app">
    <div class="small" v-bind:class="{color, frame: isChange}">
        Hello World
    </div>
</div>
```

```javascript
Vue.createApp({
    data() {
        return {
            color: true,
            isChange: true
        }
    }
}).mount('#app');
```

上面的相当于

```html
<div id="app">
    <div class="small color frame">
        Hello World
    </div>
</div>
```

### 3-4-6 v-cloak 防止闪烁

`v-cloak` 是 Vue.js 提供的一个特殊指令，主要用于在 Vue 实例完全编译渲染结束之前隐藏未编译的标记。这个指令特别有用于防止在加载和编译过程中显示原始的花括号语法（{{ }}），从而提升用户体验。

### 如何使用 v-cloak

通常，你会在一个带有 `{{ }}` 插值的元素上添加 `v-cloak` 指令。然后，在 CSS 中定义一个 `v-cloak` 规则，用于在 Vue 实例挂载之前隐藏这个元素。

#### 示例 HTML：

```html
<!-- 在根元素或任何需要隐藏未编译内容的元素上添加 v-cloak -->
<div id="app" v-cloak>
  {{ message }}
</div>
```

#### 示例 CSS：

```css
/* 当 v-cloak 存在时，隐藏元素 */
[v-cloak] {
  display: none;
}
```

在这个例子中，当页面初次加载时，用户将不会看到像 `{{ message }}` 这样的未编译文本。Vue 实例准备就绪并完成编译后，`v-cloak` 指令将被自动移除，CSS 规则不再适用，因此元素变为可见。

### 为什么使用 v-cloak

在一些情况下，尤其是在网速较慢或者脚本较大时，Vue 的编译过程可能会有轻微延迟。在这个短暂的时间里，用户可能会看到原始的插值表达式，比如 `{{ message }}`，而不是它们被替换后的值。使用 `v-cloak` 可以避免这种情况，直到 Vue 完成编译，应用变得可交互。

## 3-5 高级事件处理

### 3-5-1 事件修饰符

在 Vue.js 中，事件处理修饰符是一些特殊的后缀，用于在模板中的事件监听器上指示 Vue 以特定的方式处理 DOM 事件。这些修饰符使得事件处理的逻辑更简洁、清晰，并且可以更容易地在模板内部实现复杂的事件处理。

以下是一些常用的 Vue 事件处理修饰符：

1. **.stop** - 调用 `event.stopPropagation()`，阻止事件继续传播（即阻止事件冒泡）。

```html
<button @click.stop="doThis">点击我</button>
```

2. **.prevent** - 调用 `event.preventDefault()`，阻止事件的默认行为（如阻止表单提交）。

```html
<form @submit.prevent="onSubmit">提交</form>
```

`.prevent` 修饰符在 Vue.js 中用于调用 `event.preventDefault()`，阻止事件的默认行为，在多种场景中都非常有用。以下是一些常见的使用场景：

### 1. 阻止表单提交

最常见的用例是阻止表单的默认提交行为。在传统的 HTML 表单提交中，当点击提交按钮或按下回车键时，表单会尝试将数据提交到服务器，页面会重新加载或跳转。在单页应用（SPA）中，这种行为通常不需要，因为数据通常是通过 AJAX 请求异步发送的。

```html
<form @submit.prevent="onSubmit">
  <!-- 表单内容 -->
  <button type="submit">提交</button>
</form>
```

在这个例子中，当用户提交表单时，`.prevent` 修饰符会阻止表单的默认提交行为，允许 `onSubmit` 方法处理数据，比如发送 AJAX 请求，而不会导致页面重新加载或跳转。

### 2. 阻止链接默认跳转

当你在 `<a>` 标签上使用点击事件处理器时，你可能不希望点击链接时触发页面跳转或刷新。

```html
<a href="https://example.com" @click.prevent="handleClick">
  点击我
</a>
```

在这个例子中，点击链接时将不会导致浏览器跳转到 `href` 指定的 URL，而是执行 `handleClick` 方法。

### 3. 阻止事件冒泡中的默认行为

在某些情况下，你可能需要在处理事件冒泡时阻止默认行为。

```html
<div @click="divClick">
  <button @click.prevent="buttonClick">点击我</button>
</div>
```

在这里，点击按钮将执行 `buttonClick` 函数，但不会触发 `<button>` 的默认行为（如果有的话），同时 `.prevent` 也会阻止事件冒泡到 `<div>`，所以 `divClick` 不会被执行。

### 4. 处理复杂的交互

在需要更复杂的交互时，如拖放操作、自定义的滑动控件等，阻止默认行为可以防止浏览器执行与这些操作冲突的默认动作。

1. **.capture** - 使用事件捕获模式，即内部元素触发的事件先在此处处理，然后才是冒泡阶段。

```html
<div @click.capture="doThis">点击我</div>
```

4. **.self** - 只当事件在该元素本身（而不是子元素）触发时才触发回调。

```html
<div @click.self="doThat">点击我</div>
```

5. **.once** - 事件将只触发一次，之后便解绑监听器。

```html
<button @click.once="doOnce">点击我</button>
```

`.once` 修饰符在 Vue.js 中用于确保事件处理器只触发一次，之后该事件监听器会自动移除。这在某些特定场景中非常有用，例如：

### 1. 防止重复提交

假设你有一个提交表单的按钮，你不希望用户因为多次点击而重复提交表单。

```html
<button @click.once="submitForm">提交表单</button>
```

在这个例子中，无论用户点击多少次按钮，`submitForm` 方法只会被调用一次，从而防止了表单的重复提交。

### 2. 显示一次性通知或弹窗

如果你想显示一条只出现一次的通知或弹窗（例如欢迎消息或引导提示），可以使用 `.once` 修饰符。

```html
<button @click.once="showWelcomeMessage">显示欢迎信息</button>
```

点击按钮后，欢迎信息将显示出来，但随后再点击按钮将不会有任何反应，因为事件监听器在第一次触发后就被移除了。

### 3. 添加一次性的事件监听

在某些情况下，你可能需要在特定元素上添加一次性的事件监听器，比如动画结束事件，你只想监听一次动画结束。

```html
<div @animationend.once="handleAnimationEnd">...</div>
```

一旦动画结束，`handleAnimationEnd` 方法将被调用，然后事件监听器会被移除。

### 4. 避免重复执行开销大的操作

如果你有一个执行开销大的操作（如 AJAX 请求、复杂的计算等），使用 `.once` 可以确保该操作仅执行一次，无论触发多少次事件。

```html
<button @click.once="performExpensiveTask">执行操作</button>
```

1. **.passive** - 表明事件的默认行为（如滚动等）不会被阻止，用于提高移动端的性能。

```html
<div @scroll.passive="onScroll">滚动我</div>
```

这些修饰符可以单独使用，也可以组合使用。例如，如果你想要一个按钮的点击事件只执行一次，并阻止事件冒泡，你可以这样写：

```html
<button @click.once.stop="doThisOnce">点击我</button>
```

冒泡和传播是 DOM 事件在元素层级结构中的两种主要传递方式。为了理解这些概念，我们可以通过一个例子来说明。

### 事件冒泡（Event Bubbling）

事件冒泡是指当一个事件在一个元素上触发时，该事件会依次向上传递到其父元素，一直传到文档的根元素（通常是 `document` 对象）。这意味着，一个事件不仅仅只作用于它直接绑定的元素，还会影响到它的所有父元素。

#### 例子

假设有以下 HTML 结构：

```html
<div id="parent">
    <button id="child">点击我</button>
</div>
```

在这里，`button` 是 `div` 的子元素。如果你在 `button` 上绑定一个点击事件，当你点击按钮时，这个事件会首先在 `button` 上触发，然后冒泡到 `div`，如果 `div` 有父元素，继续向上冒泡。

如果 `div` 也有一个点击事件的监听器，那么即使点击的是 `button`，`div` 的点击事件也会被触发，因为事件从 `button` 冒泡到了 `div`。

### 事件捕获（Event Capturing）

事件捕获与事件冒泡相反。在事件捕获阶段，事件从文档的根元素开始，向下传递到目标元素的路径上的每个元素，最后到达目标元素（触发事件的元素）。

通常，当我们添加事件监听器时，默认是在冒泡阶段处理事件的。但我们可以指定事件处理器在捕获阶段触发。

#### 例子

使用相同的 HTML 结构：

```html
<div id="parent">
    <button id="child">点击我</button>
</div>
```

如果我们在 `div` 和 `button` 上都添加了点击事件监听器，并且将 `div` 的监听器设置为在捕获阶段触发，当点击 `button` 时，事件处理的顺序会是：首先在 `div` 上触发（捕获阶段），然后在 `button` 上触发（冒泡阶段）。

