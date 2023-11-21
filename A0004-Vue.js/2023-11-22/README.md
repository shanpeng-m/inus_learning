# 2023-11-22

## 1.使用vue.js的准备

最简单的使用方法是直接在页面中引入vue.js的cdn文件

```html
<script src="https://cdn.jsdelivr.net/npm/vue@3.2.29/dist/vue.global.js"></script>
```

在交付时，可以使用vue.js的生产版本，减少文件大小

```html
<!-- 生产版本，优化了尺寸 -->
<script src="https://cdn.jsdelivr.net/npm/vue@3.2.29/dist/vue.global.prod.js"></script>
```

初学者不推荐使用Vue CLI/Vite。这些工具可以帮助我们更好地组织代码，但是会增加学习成本。在成为中级开发人员之前，我们不应该使用这些工具。

### 2.1.1 运行Vue.js程序

一般将script标签写在body标签的最后，这样可以保证在加载script标签之前，页面的DOM已经加载完毕，这样可以避免一些问题。

Vue程序的内核是Vue类，我们需要创建一个Vue类的实例，然后将其挂载到页面的某个元素上。

```html
<body>
    <div id="app">
        {{message}}
    </div>
    <script>
        const app = Vue.createApp({
            data() {
                return {
                    message: 'Hello Vue.js'
                }
            }
        })
        app.mount('#app')
    </script>
</body>
```

createAPP方法接收一个对象，这个对象中包含了Vue程序的配置信息。其中data属性用于定义数据，这个属性的值是一个函数，这个函数返回一个对象，这个对象中包含了我们需要的数据。在Vue程序中，我们可以通过{{message}}的方式来使用这个数据。

{{}}是Vue.js的模板语法，用于将数据渲染到页面中。{{}}中的内容是一个表达式，可以是任意的JavaScript表达式。 但是，我们不应该在{{}}中写太多的逻辑，因为这样会让模板变得复杂，不利于维护。 

v-xxxx是directive，用于给元素添加特殊的功能。例如，v-bind用于绑定数据，v-on用于绑定事件。

v-text和{{}}的作用是一样的，都是用于将数据渲染到页面中。但是，v-text只能用于渲染文本，而{{}}可以渲染任意的JavaScript表达式。

v-pre用于跳过这个元素和它的子元素的编译过程，用于显示原始Mustache标签。例如：

```html 
<span v-pre>{{ this will not be compiled }}</span>
```

页面会显示{{ this will not be compiled }}，而不是这个表达式的值。

v-bind用于绑定数据，它可以简写为:。例如：

```html
<!-- 错误写法 -->
<a href="{{ url }}"> ... </a>
<!-- 完整写法 -->
<a v-bind:href="url">...</a>
<!-- 简写 -->
<a :href="url">...</a>
```

在bind.js中

```javascript
Vue.createApp({
    data() {
        return {
            url: 'https://www.baidu.com'
        };
    }
}).mount('#app')
```

这种属性的值用{{}}不能渲染，因为{{}}只能渲染文本，而href是一个属性，不是文本。所以，我们需要使用v-bind或者:来绑定数据。

布尔值属性的处理，默认情况下，布尔值属性的值为true，如果我们不希望这个属性出现，可以将它的值设置为false。例如：

```html
<div type="button" value="Click it" v-bind:disabled="flag"></div>
```

在bind.js中

```javascript
Vue.createApp({
    data() {
        return {
            flag: true
        };
    }
}).mount('#app')
```

### 2-2-2 计算属性

在Vue程序中，我们可以通过{{}}来渲染数据，但是，如果我们需要对数据进行一些处理，例如格式化，我们应该怎么做呢？

```html
<div id="app">
    <p> {{ localEmail }} </p>
</div>
```

在computed.js中

```javascript
Vue.createApp({
    data() {
        return {
            email: 'ma@shanpeng.im'
        }
    },
    computed: {
        localEmail: function() {
            return this.email.split('@')[0].toLowerCase();
        }
    }.mount('#app')
})
```

这种情况下localEmail不用加括号，因为它是一个计算属性，而不是一个方法。

```javascript
Vue.createApp({
    data() {
        return {
            email: 'ma@shanpeng.im'
        }
    },
    methods: {
        localEmail: function() {
            return this.email.split('@')[0].toLowerCase();
        }
    }.mount('#app')
})
```

这种情况下localEmail需要加括号，因为它是一个方法，而不是一个计算属性。

计算属性的用途是获取那些需要加工处理的数据，而不是简单的返回某个值。

在按下按钮获得一个随机数的例子中，使用计算属性获得的随机数是不会变化的，因为计算属性只有在它的依赖发生改变时才会重新计算。如果我们希望每次都获得一个新的随机数，应该使用方法。