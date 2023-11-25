# 2023-11-25

## vue.js的生命周期

### 什么是生命周期

vue实例从创建到销毁的过程，就是生命周期。vue.js为了控制整个vue的生命周期提供了许多勾子函数也就是lifecycle hooks，这些勾子函数可以让我们在vue的每个生命周期中去执行我们自己的代码。

主要的生命周期是：生成组件->beforeCreate->准备数据->created->编译模板->beforeMount->挂载dom->mounted->数据更新->beforeUpdate->重新渲染->updated->销毁组件->beforeUnmount->销毁组件->unmounted

经常会使用到的生命周期hook有：created、mounted、beforeUnmount

一般在created中进行数据的初始化，mounted中进行dom的操作，beforeUnmount中进行一些清理操作。

具体的写法如下：

```javascript
// javascript 例子
const app = Vue.createApp({
  data() {
    return {
      count: 0
    }
  },
  created() {
    console.log('created')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUnmount() {
    console.log('beforeUnmount')
  }
})
app.mount('#app')

setTimeout(() => {
  app.unmount()
}, 2000)
```

```html
<!-- html 例子 -->
<div id="app">
  <p>{{ count }}</p>
```


还有一些用于debug的hook，renderTracked、renderTriggered、errorCaptured、activated、deactivated。

### 补充；方法的简写和箭头函数

```javascript
// computed_simple.js
Vue.createApp({
  data() {
    return {
      count: 0
    }
  },
  computed: {
    double() {
      return this.count * 2
    }
  }
}).mount('#app')
```

```javascript
// computed_arrow.js
Vue.createApp({
  data() {
    return {
      count: 0
    }
  },
  computed: {
    double: () => this.count * 2
  }
}).mount('#app')
```

例如要写一个计算圆的面积的函数，可以写成如下形式：

```javascript
// circle.js
const circle = function(radius) {
    return radius * radius * Math.PI;
}

// arrow_circle.js
const circle = (radius) => {radius * radius * Math.PI;};
```

如果只有一行代码，可以省略大括号和return。如果只有一个参数，可以省略括号。

箭头函数的注意点：

1. **`this` 关键字的行为**：箭头函数不绑定自己的 `this`，它会捕获其所在上下文的 `this` 值。这意味着在 Vue 组件方法中使用箭头函数时，`this` 可能不会按照预期指向 Vue 实例。

2. **生命周期钩子**：在 Vue 组件的生命周期钩子（如 `created`, `mounted` 等）中使用箭头函数是不推荐的，因为这将导致 `this` 无法正确地指向 Vue 实例。

3. **方法定义**：在定义 Vue 实例的方法时，推荐使用传统的函数定义而非箭头函数，以确保 `this` 正确指向。

4. **事件处理**：在事件处理中使用箭头函数可以避免使用 `.bind(this)` 或在构造器中绑定 `this`。但要注意，如果在模板中直接使用箭头函数，可能会导致性能问题，因为每次渲染都会创建一个新的函数实例。

5. **回调函数**：在需要使用当前 Vue 实例的上下文时（如访问 `data`, `methods`, `computed` 等），使用箭头函数作为回调可能会导致问题，因为 `this` 不会指向 Vue 实例。

6. **模板中的使用**：避免在 Vue 模板中直接使用箭头函数，因为这可能会导致性能下降和意料之外的行为。

7. **兼容性**：箭头函数是 ES6 的一部分，因此在不支持 ES6 的浏览器中无法使用。如果需要支持旧版浏览器，应当使用传统的函数表达式或者通过构建工具（如 Babel）进行转换。

## reactive data

### 什么是响应式数据

响应式数据是指当数据发生变化时，页面会自动发生变化，而不需要手动去更新页面。管理这种响应式数据的方式就是使用vue.js的响应式系统。

### 响应式系统的例子

```html
<div id="app">
  <p>Time:{{current.toLocaleString()}}</p>
</div>
```

```javascript
Vue.createApp({
  data() {
    return {
      current: new Date()
    }
  },
  created() {
    this.timer = setInterval(() => {
      this.current = new Date()
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer)
  }
}).mount('#app')
```

### 理解视图的非同步更新

```html
<div id="app">
  <p>{{ message }}</p>
</div>
```

```javascript
Vue.createApp({
  data() {
    return {
      message: 'Hello Vue.js'
    }
  },
  mounted() {
    this.message = 'Hello World'
    console.log(this.$el.textContent.includes(this.message))
  }
}).mount('#app')
```

在mounted中修改message的值，但是在mounted中打印message的值，发现message的值并没有改变。这是因为vue.js在修改数据时，会将数据的修改放到一个队列中，然后在下一个事件循环中，清空队列，将队列中的数据进行更新。

`$nextTick`可以让我们在下一个事件循环中执行我们的代码。

```javascript 
Vue.createApp({
  data() {
    return {
      message: 'Hello Vue.js'
    }
  },
  mounted() {
    this.message = 'Hello World'
    this.$nextTick(() => {
      console.log(this.$el.textContent.includes(this.message))
    })
  }
}).mount('#app')
```


在 Vue 中，页面更新不是同步的，这是因为 Vue 使用了异步更新队列。这意味着当你更改数据时，视图不会立即更新。Vue 会将所有的数据变更放入队列中，以便高效地进行批量更新。这个机制是为了避免不必要的重复渲染和计算，从而提高性能。

### 理解 Vue 的异步更新机制

1. **数据变更聚合**：当你在同一个 "tick"（或者说是事件循环中的一次迭代）中更改多个数据属性时，Vue 会将这些更改合并到一个队列中。
2. **高效的 DOM 更新**：Vue 等待所有数据更改结束后，在下一个 "tick" 执行 DOM 更新。这样可以避免在一个事件循环中多次更改 DOM，因为多次更改 DOM 是非常耗性能的操作。
3. **异步更新的挑战**：有时，你可能需要在数据变更后立即基于新的 DOM 状态执行操作。但由于更新是异步的，此时新的 DOM 还未被渲染。

### 使用 `$nextTick`

`$nextTick` 是 Vue 实例的一个方法，用于在 DOM 更新完成后执行某些操作。它返回一个 Promise，你可以在其 `.then` 方法中执行需要在 DOM 更新后进行的操作。

#### 使用场景

- 当你需要在数据变更后立即操作更新后的 DOM 时。
- 在单元测试中，确保 Vue 完成了 DOM 更新。

## watch

Vue 的 `watch` 选项允许你监视 Vue 实例上的数据变化，并在数据变化时运行特定的代码。它是响应式编程的一个核心特性，非常适合于执行异步操作或昂贵的运算响应数据的变化。

### 基本用法

在 Vue 组件中，你可以使用 `watch` 选项来监视特定的数据属性。当被监视的属性发生变化时，指定的回调函数会被调用。

```javascript
new Vue({
  data: {
    a: 1,
    b: 2
  },
  watch: {
    a: function (newValue, oldValue) {
      // 这个函数会在 `a` 的值改变时被调用
      console.log(`a 从 ${oldValue} 变成了 ${newValue}`);
    }
  }
});
```

在这个例子中，每当 `a` 的值改变时，就会输出一条日志记录其新旧值。

### 深度监听

默认情况下，Vue 不会检测对象内部属性的变化。要观察对象内部属性的变化，需要使用 `deep` 选项。

```javascript
new Vue({
  data: {
    user: {
      name: 'Alice',
      age: 25
    }
  },
  watch: {
    user: {
      handler: function (newValue, oldValue) {
        console.log('用户信息发生了变化');
      },
      deep: true
    }
  }
});
```

在这个例子中，无论 `user` 对象的哪个属性发生变化，监视器都会被触发。

### 立即触发

使用 `immediate` 选项，可以在 Vue 实例创建时立即触发回调，而不必等到被监视的属性首次变化。

```javascript
new Vue({
  data: {
    c: 3
  },
  watch: {
    c: {
      handler: function (newValue, oldValue) {
        console.log(`c 的当前值为 ${newValue}`);
      },
      immediate: true
    }
  }
});
```

在这个例子中，监视器会在实例创建时立即执行一次，输出 `c` 的初始值。

### 结合计算属性

监视器也可以用来监视计算属性：

```javascript
new Vue({
  data: {
    d: 4,
    e: 5
  },
  computed: {
    sum: function () {
      return this.d + this.e;
    }
  },
  watch: {
    sum: function (newValue, oldValue) {
      console.log(`总和从 ${oldValue} 变成了 ${newValue}`);
    }
  }
});
```

在这个例子中，当 `d` 或 `e` 的值发生变化，导致计算属性 `sum` 的值发生变化时，监视器会被触发。
