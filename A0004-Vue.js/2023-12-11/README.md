
# 2023-12-11

## 5-1 内置组件

### 5-1-1 component组件

在 Vue.js 中，`component` 是一个特殊的内置组件，它用于动态地绑定到不同的组件。通过使用 `component` 组件，你可以在同一个挂载点上切换多个组件，而这些组件可以是自定义组件或者其他内置组件。这非常有用于实现如标签页、多视图等功能。

### 基本用法

`component` 组件使用 `is` 属性来决定应该渲染哪个组件。`is` 属性的值通常是一个字符串，对应注册过的组件名，或者是一个组件对象。

让我们通过一个例子来详细说明：

#### 1. 定义组件

首先，定义两个简单的组件：

```vue
<script>
export default {
  name: 'ComponentA',
  template: '<div>组件 A</div>'
}
</script>
```

```vue
<script>
export default {
  name: 'ComponentB',
  template: '<div>组件 B</div>'
}
</script>
```

#### 2. 使用 `component` 组件

然后，在父组件中，使用 `component` 组件来动态切换这两个组件：

```vue
<template>
  <div>
    <button @click="currentComponent = 'ComponentA'">显示组件 A</button>
    <button @click="currentComponent = 'ComponentB'">显示组件 B</button>
    
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';

export default {
  data() {
    return {
      currentComponent: 'ComponentA'
    };
  },
  components: {
    ComponentA,
    ComponentB
  }
}
</script>
```

在这个例子中，当你点击不同的按钮时，`currentComponent` 的值会改变，这会导致 `component` 组件渲染不同的组件。这种方式非常灵活，可以根据应用的状态或用户的操作动态地渲染不同的内容。

### keep-alive

在 Vue.js 中，`keep-alive` 是一个内置组件，用于保持组件状态或避免重新渲染。`keep-alive` 包裹动态组件时，会缓存非活动组件的实例，而不是销毁它们。当组件在 `keep-alive` 内部再次被渲染时，它们的状态会被保留，包括组件的数据和DOM状态。

### 使用场景

`keep-alive` 特别适用于以下情况：

- 保持组件状态：当用户需要在多个视图之间切换时，你不希望失去之前的状态。
- 性能优化：重用组件可以避免重复的渲染过程，从而提升性能。

### 基本用法

结合 `keep-alive` 和动态组件 `component` 的例子如下：

#### 1. 定义组件

首先，定义两个简单的组件，比如 `ComponentA` 和 `ComponentB`：

```vue
<!-- ComponentA.vue -->
<template>
  <div>组件 A</div>
</template>

<!-- ComponentB.vue -->
<template>
  <div>组件 B</div>
</template>
```

#### 2. 使用 `keep-alive` 和 `component`

然后，在父组件中使用 `keep-alive` 包裹 `component` 组件：

```vue
<template>
  <div>
    <button @click="currentComponent = 'ComponentA'">显示组件 A</button>
    <button @click="currentComponent = 'ComponentB'">显示组件 B</button>
    
    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';

export default {
  data() {
    return {
      currentComponent: 'ComponentA'
    };
  },
  components: {
    ComponentA,
    ComponentB
  }
}
</script>
```

在这个例子中，当用户切换组件时，`keep-alive` 会缓存非活动组件的状态。例如，如果 `ComponentA` 包含了用户输入的数据，当用户切换到 `ComponentB`，然后再切换回 `ComponentA` 时，`ComponentA` 中的数据会被保留。

### 注意

- `keep-alive` 仅适用于动态组件或单个视图组件。
- 它不会缓存自身不是动态组件的普通元素。
- `keep-alive` 会导致组件生命周期钩子的行为变化，例如 `created` 钩子不会在每次激活时被调用，而是使用 `activated` 和 `deactivated` 钩子。

通过使用 `keep-alive`，你可以创建更加流畅和响应快速的应用，同时保持用户界面的状态一致性。

### teleport

Vue 的 `teleport` 是一个内置组件，它的主要作用是将其内部的 DOM 元素“传送”到一个指定的位置，通常是在当前 Vue 应用的根 DOM 树之外。这对于当你需要移动某些内容到文档的其他部分，例如将模态框、提示框或下拉菜单移动到 `<body>` 元素的末尾，以避免样式或布局问题时，是非常有用的。

### 基本用法

`teleport` 组件使用 `to` 属性来指定目标元素的选择器，其子元素将被传送到该选择器对应的 DOM 元素。

#### 示例：模态框

假设你想创建一个模态框组件，但由于 CSS 样式限制（比如 `overflow` 或 `z-index` 问题），你需要将模态框的 DOM 移动到 `<body>` 元素的末尾。

##### 1. 模态框组件

```vue
<template>
  <teleport to="body">
    <div class="modal">
      <div class="modal-content">
        <h2>我是一个模态框</h2>
        <p>这里是模态框的内容...</p>
        <button @click="close">关闭</button>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
```

##### 2. 使用模态框

在父组件中，你可以这样使用这个模态框组件：

```vue
<template>
  <div>
    <button @click="showModal = true">打开模态框</button>
    <Modal v-if="showModal" @close="showModal = false" />
  </div>
</template>

<script>
import Modal from './Modal.vue';

export default {
  components: {
    Modal
  },
  data() {
    return {
      showModal: false
    };
  }
}
</script>
```

在这个例子中，`<teleport>` 组件将模态框的 DOM 元素传送到 `<body>` 标签的末尾。这可以解决由于 CSS 的限制或者组件嵌套导致的样式和布局问题。

`teleport` 组件在处理诸如模态框、通知、弹出窗口等需要从其父组件的 DOM 结构中独立出来的 UI 元素时非常有用。它可以帮助你更好地控制这些元素的布局和样式，而无需担心它们的原始位置可能会带来的限制。

## 5-1-4 suspense组件

Vue.js 中的 `Suspense` 组件是 Vue 3 引入的一个新特性，用于处理异步组件的加载状态。它允许你在等待异步组件或异步依赖加载时，展示一个备用内容（如加载指示器），从而增强用户体验。

### 基本用法

`Suspense` 组件通常与异步组件一起使用。一个异步组件可以通过 `defineAsyncComponent` 方法来定义，它允许你延迟加载一个组件。

#### 示例：异步加载组件

假设有一个异步加载的组件 `AsyncComponent`：

```vue
<!-- AsyncComponent.vue -->
<template>
  <div>我是异步加载的组件！</div>
</template>
```

你可以使用 `defineAsyncComponent` 来定义这个异步组件：

```javascript
// 在父组件或者组件的脚本部分
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    AsyncComponent: defineAsyncComponent(() =>
      import('./AsyncComponent.vue')
    )
  }
};
```

然后，使用 `Suspense` 来包裹这个异步组件，并提供备用的内容：

```vue
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>加载中...</div>
    </template>
  </Suspense>
</template>
```

在这个例子中：

- `#default` 插槽包含了异步组件 `AsyncComponent`。
- `#fallback` 插槽提供了一个备用内容，即当异步组件正在加载时显示的内容。

### 使用场景

- 当你的组件或者组件的部分依赖项需要异步加载时，比如基于路由的代码分割。
- 在等待数据加载时提供更好的用户体验，比如显示加载指示器或者占位符。

### 注意事项

- `Suspense` 目前仅支持异步组件的加载，不适用于数据请求等其他异步操作。
- 使用 `Suspense` 时，确保你的环境支持 Vue 3。

通过使用 `Suspense`，你可以优雅地处理组件的加载状态，提供更流畅的用户体验，特别是在网络环境较差或者需要加载大组件时。

## 5-2 使用v-model的双向数据绑定

自定义的组件中也可以使用 `v-model` 来实现双向数据绑定。

```html
<div id="app">
    <my-input v-model="message"></my-input>
    <p>message: {{message}}</p>
</div>
```

```javascript
Vue.createApp({
    data() {
        return {
            message: ''
        }
    }
}).component('my-input', {
    props: ['modelValue'],
    emits: ['update:modelValue'],
    template: `
        <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
    `
}).mount('#app')
```

## 5-3 动画

```html
<div id="app">
    <input type="button" value="show/dismiss" v-on:click="onclick" />
    <!-- 动画在这里 -->
    <transition>
        <div id="panel" v-show="flag">The words should be shown...</div>
    </transition>
```

```javascript
Vue.createApp({
    data() {
        return {
            flag: true
        }
    },
    methods: {
        onclick() {
            this.flag = !this.flag
        }
    }
}).mount('#app')
```

```css
#panel {
    border: 1px solid #000;
    width: 350px;
    overflow: hidden;
}
.v-enter-active, .v-leave-active {
    transition: height 1s;
}

.v-enter-from {
    height: 0;
}

.v-enter-to {
    height: 180px;
}

.v-leave-from {
    height: 180px;
}

.v-leave-to {
    height: 0;
}
```
