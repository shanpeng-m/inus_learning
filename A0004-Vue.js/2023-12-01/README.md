# 2023-12-01

## 3-1-3 Event Object

事件对象是一个包含事件有关信息的对象。

在事件处理函数中，会自动传入一个事件对象作为参数。通常写成 `e` 或 `event`。

例如

```html
<div id="app">
  <button @click="handleClick">按钮</button>
</div>
```

```javascript
Vue.createApp({
  methods: {
    handleClick(e) {
      console.log(e)
    }
  }
}).mount('#app')
```

事件对象中包含了大量的信息，例如：

- `e.target`：触发事件的元素
- `e.type`：事件类型, 例如 `click`, `mouseover` 等
- `e.clientX`：鼠标点击位置相对于浏览器窗口的水平坐标
- `e.clientY`：鼠标点击位置相对于浏览器窗口的垂直坐标
- `e.pageX`：鼠标点击位置相对于文档的水平坐标
- `e.pageY`：鼠标点击位置相对于文档的垂直坐标
- `e.screenX`：鼠标点击位置相对于屏幕的水平坐标
- `e.screenY`：鼠标点击位置相对于屏幕的垂直坐标
- `e.offsetX`：鼠标点击位置相对于触发事件的元素的水平坐标
- `e.offsetY`：鼠标点击位置相对于触发事件的元素的垂直坐标
- `e.timeStamp`：事件触发时的时间戳
- `e.preventDefault()`：阻止默认行为
- `e.stopPropagation()`：阻止事件冒泡 (阻止事件向父元素传递)

例如：

```html
<div id="app">
    <div id="main" @mousemove="handleMouseMove">
        screen: {{ screenX }} / {{ screenY }}<br>
        page: {{ pageX }} / {{ pageY }}<br>
        client: {{ clientX }} / {{ clientY }}<br>
        offset: {{ offsetX }} / {{ offsetY }}
    </div>
</div>
```

```javascript
Vue.createApp({
    data() {
        return {
            screenX: 0,
            screenY: 0,
            pageX: 0,
            pageY: 0,
            clientX: 0,
            clientY: 0,
            offsetX: 0,
            offsetY: 0
        };
    },
    methods: {
        handleMouseMove(e) {
            this.screenX = e.screenX;
            this.screenY = e.screenY
            this.pageX = e.pageX
            this.pageY = e.pageY
            this.clientX = e.clientX
            this.clientY = e.clientY
            this.offsetX = e.offsetX
            this.offsetY = e.offsetY
        }
    }
}).mount('#app')
```

可以在event handler中加入参数，例如：

```html
<div id="app">
    <button @click="handleClick('hello', 'world')">按钮</button>
</div>
```

```javascript
Vue.createApp({
    methods: {
        handleClick(arg1, arg2) {
            console.log(arg1, arg2)
        }
    }
}).mount('#app')
```

也可以通过$event访问事件对象，例如：

```html
<div id="app">
    <button @click="handleClick('hello', 'world', $event)">按钮</button>
</div>
```

```javascript
Vue.createApp({
    methods: {
        handleClick(arg1, arg2, e) {
            console.log(arg1, arg2, e)
        }
    }
}).mount('#app')
```

## 3-2 表单关联的dereactive

### 3-2-1 双向data绑定

Vue.js 中的双向数据绑定是一个核心特性，它允许自动将用户界面与数据模型（通常是一个 JavaScript 对象）同步。这意味着，当数据模型中的数据改变时，界面会自动更新以反映这些改变；反过来，当用户界面中的数据（比如表单输入）改变时，数据模型也会自动更新。

这种双向绑定通常通过 Vue.js 的 `v-model` 指令来实现。在标准的 HTML 元素（如输入框、选择框、文本区域等）上使用 `v-model` 可以创建数据的双向绑定。例如：

```html
<input v-model="message">
```

这里，`message` 是 Vue 实例中的一个数据属性。任何对这个输入框的更改都会实时反映到 `message` 属性上，同时，如果 `message` 属性的值在其他地方被改变，这个输入框的显示内容也会更新。

Vue.js 实现双向绑定的原理主要依赖于 JavaScript 的属性特性（如 getters 和 setters）以及事件监听。Vue.js 通过这些机制来监视数据模型的变化，并自动更新相应的 DOM 元素；同时监听 DOM 元素的变化，来更新数据模型。这样，数据和界面就能保持同步。

例如：

```html
<div id="app">
    <form>
        <label for="name"> 姓名：</label>
        <input type="text" id="name" v-model="myName">
    </form>
    <div> 你好，{{ myName }}！</div>
</div>
```

```javascript
Vue.createApp({
    data() {
        return {
            myName: ''
        }
    }
}).mount('#app')
```


需要注意的是，使用v-model时，表单的输入框的初始化的value属性会被忽略。

### 3-2-2 Radio Button

radio按钮是一组互斥的选项，用户只能选择其中的一个。也可以使用v-model绑定。

```html
<div id="app">
    <form>
        <label for="dog">Dog</label>
        <input type="radio" id="dog" value="Dog" v-model="animal">
        <br />
        <label for="cat">Cat</label>
        <input type="radio" id="cat" value="Cat" v-model="animal">
        <br />
        <label for="others">Others</label>
        <input type="radio" id="others" value="Others" v-model="animal">
    </form>
    <div> You like {{ animal }}！</div>
</div>
```

```javascript
Vue.createApp({
    data() {
        return {
            animal: 'Dog'
        }
    }
}).mount('#app')
```

### 3-2-6 上传文件

```html
<div id="app">
    <form>
        <label for="file">上传文件：</label>
        <input ref="upfile" type="file" id="file" @change="handleFileChange">
    </form>
    <div> 你上传的文件是：{{ file }}！</div>
</div>
```

```javascript
Vue.createApp({
    data() {
        return {
            file: ''
        }
    },
    methods: {
        handleFileChange(e) {
            const fl = this.$refs.upfile.files[0];
            const data = new FormData();
            data.append('file', fl, fl.name);
            fetch('upload.php', {
                method: 'POST',
                body: data
            })
            .then(res => res.text())
            .then(res => {
                this.file = res;
            })
            .catch(err => {
                window.alert('Error: ${error.message}');
            });
        }
    }
}).mount('#app')
```

在HTML或Vue.js中，`ref`属性通常与Vue.js一起使用，而不是作为标准HTML属性。在Vue.js中，`ref`用于为DOM元素或子组件注册一个引用信息（reference）。这样，你可以在Vue实例的其它部分（如方法或计算属性中）通过 `this.$refs` 访问这些元素或子组件。这是一种直接从Vue实例操作DOM的方式。

例如：

```html
<input ref="myInput">
```

在Vue组件的JavaScript代码中，你可以使用 `this.$refs.myInput` 来访问这个输入框。这在需要直接处理DOM元素（如设置焦点、读取或修改值等）时特别有用。

至于 `FormData`，这是一个JavaScript API，用于构造一个表单数据的集合，通常用于发送AJAX请求。你可以使用 `FormData` 对象来轻松构造键值对集合，并使用XMLHttpRequest或fetch API将其发送到服务器。它主要用于处理表单数据，特别是包含文件上传时。

例如：

```javascript
var formData = new FormData();
formData.append('username', 'johndoe');
formData.append('avatar', fileInputElement.files[0]);
```

在这个例子中，`formData` 对象被用来包含用户名和一个头像文件，然后可以通过AJAX发送到服务器。FormData API自动将数据设置为适当的格式（如多部分表单数据），这在处理文件上传等复杂表单数据时非常方便。

### 3-2-7 bind的选项

在使用v-model时，可以使用很多选项。

例如：.number，.trim

```html
<div id="app">
    <form>
        <label for="age"> 年龄：</label>
        <input type="text" id="age" v-model.number="myAge">
    </form>
    <div> 你的年龄是：{{ myAge }}！</div>
</div>
```

```javascript
Vue.createApp({
    data() {
        return {
            myAge: 0
        }
    }
}).mount('#app')
```

```html
<div id="app">
    <form>
        <label for="name"> 姓名：</label>
        <input type="text" id="name" v-model.trim="myName">
    </form>
    <div> 你好，{{ myName }}！</div>
</div>
```

```javascript
Vue.createApp({
    data() {
        return {
            myName: ''
        }
    }
}).mount('#app')
```

number选项会将输入框的值转换为数字，trim选项会将输入框的值去掉首尾的空格。

.lazy选项是将绑定的数据延迟到change事件触发时才更新。也就是说，当输入框失去焦点时，才会更新绑定的数据。

```html
<div id="app">
    <form>
        <label for="name"> 姓名：</label>
        <input type="text" id="name" v-model.lazy="myName">
    </form>
    <div> 你好，{{ myName }}！</div>
</div>
```

```javascript
Vue.createApp({
    data() {
        return {
            myName: ''
        }
    }
}).mount('#app')
```

### 3-2-9 双方向data绑定的原理

v-model等于v-bind和v-on的结合。

例如：

```html
<input v-model="str"/>
<input v-bind:value="str" v-on:input="str=$event.target.value"/>
```

二者是等价的。

```html
<div id='app'>
    <form>
        <label for="mail">邮箱：</label>
        <textarea id="mail"
         v-bind:value="mails.join(';')"
         v-on:input="mails=$event.target.value.split(';')"></textarea>
    </form>
    <ul>
        <li v-for="mail in mails">
            {{ mail }}
        </li>
    </ul>
</div>
```

```javascript
Vue.createApp({
    data() {
        return {
            mails: [],
        }
    }
}).mount('#app');
```

## 3-3 和控制相关的derective

### 3-3-1 v-if

v-if指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回真值时被渲染。

例如：

```html
<div id="app">
    <form>
        <label for="show">show or hide：</label>
        <input type="checkbox" id="show" v-model="show">
    </form>
    <div id="panel" v-if="show"> 显示的内容 </div>
    <div v-else> 隐藏的内容 </div>
</div>
```

```javascript
Vue.createApp({
    data() {
        return {
            show: false
        }
    }
}).mount('#app')
```

有多个if-else时，可以这样写

```html
<div id="app">
    <form>
        <label for="show">show or hide：</label>
        <select id="show" v-model="show">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
    </form>
    <div id="panel" v-if="show === 1"> 显示的内容 </div>
    <div v-else-if="show === 2"> 显示的内容2 </div>
    <div v-else-if="show === 3"> 显示的内容3 </div>
    <div v-else> 隐藏的内容 </div>
</div>
```

```javascript
Vue.createApp({
    data() {
        return {
            show: 1
        }
    }
}).mount('#app')
```

### 3-3-2 v-show

v-show指令用于条件性地显示一块内容。这块内容只会在指令的表达式返回真值时被显示，而在假值时被隐藏。

`v-if` 和 `v-show` 是 Vue.js 中用于条件性地显示元素的两个指令，它们有各自的用途和行为差异。下面通过例子来说明这两者之间的主要区别：

### v-if

- `v-if` 指令用于根据表达式的真值来完全添加或移除元素。
- 当条件为假时，`v-if` 控制的元素不会被渲染到DOM中。
- `v-if` 更适合在运行时条件不太可能改变的情况下使用。

```html
<div v-if="isVisible">这个元素只有在isVisible为true时才存在于DOM中。</div>
```

在这个例子中，只有当 `isVisible` 为 `true` 时，`<div>` 元素才会被渲染到 DOM 中。如果 `isVisible` 变为 `false`，这个元素会从 DOM 中被完全移除。

### v-show

- `v-show` 也是用于根据条件显示元素，但它通过切换CSS的 `display` 属性来控制元素的显示与隐藏。
- 即使条件为假，使用 `v-show` 的元素仍然存在于 DOM 中，只是不可见。
- `v-show` 更适合频繁切换显示状态的情况，因为它不涉及DOM元素的添加和移除操作。

```html
<div v-show="isVisible">这个元素始终在DOM中，但只在isVisible为true时可见。</div>
```

在这个例子中，无论 `isVisible` 的值是什么，`<div>` 元素都会存在于 DOM 中。其可见性是通过 CSS 的 `display` 属性控制的（`isVisible` 为 `true` 时显示，为 `false` 时隐藏）。

### 总结

- 使用 `v-if` 时，条件为假的元素不会渲染到 DOM 中。
- 使用 `v-show` 时，元素始终渲染到 DOM 中，但会根据条件切换可见性。
- `v-if` 适合于条件不经常改变的情况，因为它涉及真实的DOM操作。
- `v-show` 适合于频繁改变条件的情况，因为它仅改变元素的显示状态，不涉及DOM操作。

### 3-3-3 v-for

`v-for` 是 Vue.js 中用于渲染列表的一个指令。它可以遍历数组或对象的属性，并对每个项生成一个模板块。

### 基本用法 - 遍历数组

假设你有一个数组，你想为数组中的每个项生成一个列表元素。

```javascript
data() {
  return {
    items: ['苹果', '香蕉', '橘子']
  };
}
```

在模板中，你可以使用 `v-for` 来遍历这个数组：

```html
<ul>
  <li v-for="item in items" :key="item">{{ item }}</li>
</ul>
```

在这个例子中，`v-for="item in items"` 指令会遍历 `items` 数组，`item` 变量代表数组中的当前元素。`:key="item"` 是一个重要的部分，它为每个列表元素提供一个唯一的键值（在这个案例中是数组元素的值）。Vue 使用这个键来优化DOM的更新。

### 遍历对象的属性

你也可以使用 `v-for` 来遍历一个对象的属性。

```javascript
data() {
  return {
    object: {
      title: 'How to Vue',
      author: 'Jane Doe',
      published: '2020'
    }
  };
}
```

在模板中遍历这个对象：

```html
<ul>
  <li v-for="(value, key) in object" :key="key">
    {{ key }}: {{ value }}
  </li>
</ul>
```

这里，`v-for="(value, key) in object"` 会遍历对象的每个属性，其中 `key` 是属性名，`value` 是对应的值。`:key="key"` 提供了每个列表项的唯一键。

### 遍历数组的索引

有时，你可能需要访问数组元素的索引。

```html
<ul>
  <li v-for="(item, index) in items" :key="index">
    {{ index }} - {{ item }}
  </li>
</ul>
```

在这个例子中，`v-for="(item, index) in items"` 会提供当前元素的索引 `index` 和值 `item`。`index` 可以用于跟踪列表中元素的位置。

### 总结

`v-for` 是 Vue.js 中一个非常强大的指令，用于根据数组或对象的元素生成重复的DOM元素。在使用 `v-for` 时，始终提供一个唯一的 `:key`，这对于 Vue 来说，是有效管理 DOM 元素的关键。通过结合 `v-for` 和 `v-if`，你可以创建动态且响应式的列表显示。

在 Vue.js 中，`<template>` 标签用于声明性地渲染 DOM 元素或组件。它不是一个实际的 DOM 元素，而是一个提供结构化模板的容器，用于包含一段可复用的 HTML。重要的是，`<template>` 标签不会渲染到最终的 HTML 结构中，它只是作为一个包裹或条件渲染的机制。

### 基本用法

`<template>` 标签常与 `v-if`, `v-for` 等指令一起使用，来控制一组元素的渲染。

#### 使用 v-if

```html
<template v-if="isLoggedIn">
  <header>欢迎回来!</header>
  <p>你有新消息。</p>
</template>
```

在这个例子中，只有当 `isLoggedIn` 为 `true` 时，`<header>` 和 `<p>` 元素才会被渲染。`<template>` 标签本身不会出现在渲染后的DOM中。

#### 使用 v-for

```html
<template v-for="item in items">
  <li>{{ item.name }}</li>
  <li>{{ item.description }}</li>
</template>
```

这里，`v-for` 被用于遍历 `items` 数组，并为每个项目渲染两个 `<li>` 元素。这个 `<template>` 将不会被渲染为实际的 DOM 元素，只是用来包裹循环内容。

### 插槽分发（Slot Distribution）

在 Vue 组件中，`<template>` 还可以与 `<slot>` 结合使用，用于分发内容到组件的插槽中。

```html
<!-- 在父组件中 -->
<my-component>
  <template v-slot:header>
    <h1>这是标题</h1>
  </template>

  <template v-slot:default>
    <p>这是主要内容</p>
  </template>
</my-component>
```

在这个例子中，`<template v-slot:header>` 和 `<template v-slot:default>` 定义了如何分发内容到 `my-component` 组件的 `header` 和默认插槽中。
