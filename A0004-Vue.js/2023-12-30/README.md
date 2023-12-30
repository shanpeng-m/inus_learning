# 23-12-30

## Reactive

Vue 的 `reactive` 函数是 Vue 3 中的一个核心功能，用于创建响应式对象。这个概念是基于 JavaScript 的 Proxy 功能，允许 Vue 跟踪一个对象的属性访问和修改。这样，当对象的属性改变时，Vue 可以自动更新 DOM，这是实现数据驱动视图的关键。

下面是一个使用 `reactive` 的例子：

```javascript
import { reactive, watchEffect } from 'vue';

// 创建一个响应式对象
const state = reactive({
  count: 0
});

// watchEffect 函数用于监听响应式对象的变化
watchEffect(() => {
  console.log(`count is: ${state.count}`);
});

// 修改 state.count 的值，watchEffect 会自动执行
state.count++;
```

在这个例子中：

1. 我们首先通过 `reactive` 函数创建了一个响应式对象 `state`。
2. `state` 对象有一个属性 `count`。
3. 使用 `watchEffect` 函数监听 `state` 对象。任何对 `state` 的修改都会触发 `watchEffect` 内的回调函数执行。
4. 当我们修改 `state.count` 的值时，由于 `state` 是响应式的，所以 `watchEffect` 的回调函数会被触发，打印出新的 `count` 值。

在 Vue 应用中，这种机制允许数据（`state`）和视图（模板）紧密绑定，从而当数据变化时，视图能够自动更新。这就是 Vue 中响应式系统的基本工作原理。

Vue 的响应式系统并不是通过不断查询值是否改变来实现的，而是采用了一种更高效的机制，主要基于 JavaScript 的 Proxy 特性。下面是 Vue 响应式系统的大致工作原理：

1. **使用 Proxy 封装对象：** 当你使用 `reactive` 函数创建一个响应式对象时，Vue 内部实际上是用 Proxy 封装了你的原始对象。Proxy 可以拦截对象的多种操作，包括属性读取、属性赋值、删除属性等。

2. **跟踪依赖（Dependency Tracking）：** 当响应式对象的某个属性被读取时，Vue 的响应式系统会记录这个操作，这个过程被称为“依赖收集”。例如，如果你在某个组件的渲染函数中读取了响应式对象的某个属性，这个渲染函数就成为了该属性的依赖。

3. **触发更新（Triggering Updates）：** 当响应式对象的某个属性被修改时，Proxy 的拦截器会被触发。Vue 会查找所有依赖于这个属性的依赖（如渲染函数、计算属性、观察者等），并重新执行它们，从而更新视图或执行相关的副作用。

这个机制的关键点在于，Vue 不需要定时检查数据是否变化，而是通过 Proxy 的拦截能力，在数据变化的那一刻立即知晓，并触发相应的更新。这样，Vue 可以以非常高效和响应快速的方式来处理数据变化和视图更新，同时避免了不必要的性能开销。

## Computed

Vue 的 `computed` 方法用于定义计算属性。计算属性是基于它们的响应式依赖进行缓存的。只有当它们依赖的响应式属性发生变化时，它们才会重新计算。这使得计算属性非常适合执行成本较高的计算，同时避免在每个渲染周期中不必要地重新计算。

下面是一个使用 `computed` 的例子：

```vue
<template>
  <div>
    <p>Original message: "{{ message }}"</p>
    <p>Reversed message: "{{ reversedMessage }}"</p>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    // 创建一个响应式引用
    const message = ref('Hello Vue');

    // 使用 computed 创建一个计算属性
    const reversedMessage = computed(() => {
      return message.value.split('').reverse().join('');
    });

    return {
      message,
      reversedMessage
    };
  }
};
</script>
```

在这个例子中：

1. 我们首先使用 `ref` 创建了一个响应式引用 `message`。
2. 然后使用 `computed` 创建了一个计算属性 `reversedMessage`。这个计算属性依赖于 `message` 的值，并返回 `message` 的反转字符串。
3. 在模板中，我们显示原始的 `message` 和计算后的 `reversedMessage`。

关键点：

- 当 `message` 的值改变时，`reversedMessage` 会自动重新计算。如果 `message` 没有改变，那么对 `reversedMessage` 的访问将返回上一次计算的结果，而不会重新执行计算函数。
- 这种机制在处理复杂或计算成本较高的场景时非常有用，因为它可以避免不必要的计算，提高应用的性能。

## watch and watchEffect

在 Vue 中，`watch` 和 `watchEffect` 是两种用于观察和响应 Vue 实例数据变化的方法，它们都是 Vue 3 的响应式系统的一部分，但它们在使用方式和应用场景上有所不同。

### watch 方法

`watch` 方法用于观察一个特定的数据源，并在数据源变化时运行一个回调函数。它非常适合于在数据变化时执行异步或开销较大的操作。

**例子**：

```vue
<template>
  <input v-model="inputText" placeholder="Type here">
  <p>Input text: {{ inputText }}</p>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  setup() {
    const inputText = ref('');

    watch(inputText, (newValue, oldValue) => {
      console.log(`Input text changed from ${oldValue} to ${newValue}`);
      // 可以在这里执行更复杂的操作，例如异步请求
    });

    return { inputText };
  }
};
</script>
```

在这个例子中，我们使用 `watch` 来观察 `inputText`。每当 `inputText` 的值变化时，都会执行 `watch` 里的回调函数。

### watchEffect 方法

与 `watch` 相比，`watchEffect` 更加自动和智能。它会自动收集其内部所依赖的所有响应式引用，并在它们变化时重新执行。

**例子**：

```vue
<template>
  <input v-model="inputText" placeholder="Type here">
  <p>Computed text: {{ computedText }}</p>
</template>

<script>
import { ref, watchEffect, computed } from 'vue';

export default {
  setup() {
    const inputText = ref('');
    const computedText = computed(() => inputText.value.toUpperCase());

    watchEffect(() => {
      console.log(`Computed text is now: ${computedText.value}`);
      // 每当 computedText 改变时，这里的代码会重新执行
    });

    return { inputText, computedText };
  }
};
</script>
```

在这个例子中，我们使用 `watchEffect` 来自动观察 `computedText`。每当 `inputText` 的值改变时，由于 `computedText` 是依赖于 `inputText` 的，`watchEffect` 内的回调函数会自动重新执行。

### 区别

- `watch` 需要明确指定要观察的数据源，更适合于对特定数据的变化做出响应。
- `watchEffect` 会自动追踪其函数体内的所有响应式状态的变化，适合于那些对多个响应式状态变化做出响应的场景。

使用 `watch` 和 `watchEffect` 可以使你的 Vue 应用更加响应式和动态，这对于构建复杂的交互和响应式数据流非常有帮助。

## setup

在 Vue 3 中，`setup()` 函数是一个新引入的组件选项，它是 Vue 组件的一个入口点，在组件实例被创建和初始化时被调用。`setup()` 函数是 Composition API（组合式 API）的核心，它使得我们能夠使用 Vue 3 的响应式特性来组织和管理组件的逻辑。

### 主要特点和用法：

1. **生命周期**：`setup()` 函数在组件的 `beforeCreate` 和 `created` 生命周期钩子之间执行。这意味着在 `setup()` 函数中，组件尚未创建 DOM，因此无法访问组件的 DOM 元素或子组件。

2. **响应式状态和逻辑**：在 `setup()` 函数内，你可以使用 Vue 3 的响应式系统（如 `ref`, `reactive`, `computed`, `watch`, `watchEffect` 等）来创建和管理响应式的数据和逻辑。

3. **返回值**：`setup()` 函数可以返回一个对象，该对象的属性和方法将被暴露给组件的其他部分（如模板、计算属性、方法等）和组件的上下文。这使得在模板中可以直接使用 `setup()` 函数返回的响应式状态和方法。

4. **Props 和 Context**：`setup()` 函数接收两个参数：`props` 和 `context`。`props` 是组件接收的属性，而 `context` 提供了一个包含了组件的 `attrs`（属性）、`slots`（插槽）和 `emit`（用于触发事件）的对象。

### 例子：

```vue
<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    // 创建响应式变量
    const count = ref(0);

    // 定义方法
    function increment() {
      count.value++;
    }

    // 暴露给模板
    return {
      count,
      increment
    };
  }
};
</script>
```

在这个例子中：

- 使用 `ref` 创建了一个响应式变量 `count`。
- 定义了一个方法 `increment` 来更新 `count` 的值。
- 在 `setup()` 函数的返回对象中暴露了 `count` 和 `increment`，使它们在模板中可用。

## 组合式 API（Composition API）

组合式 API（Composition API）是 Vue 3 中引入的一组新的 API，旨在提供一种更灵活、更有组织的方式来构建和管理 Vue 组件的逻辑。与 Vue 2 中的选项式 API（Options API）相比，组合式 API 提供了更好的逻辑复用和代码组织能力，特别是在处理复杂组件时更为显著。

### 组合式 API 的关键特性：

1. **更好的逻辑组织和复用**：组合式 API 使得将相关功能的代码组织在一起变得更加容易，无论它们属于数据、方法、计算属性还是生命周期钩子。这对于维护和理解代码非常有帮助，尤其是在处理大型和复杂的组件时。

2. **`setup()` 函数**：组合式 API 的核心是 `setup()` 函数，它是每个使用组合式 API 的组件的入口点。在 `setup()` 函数中，你可以定义响应式状态、计算属性、方法和生命周期钩子。

3. **响应式引用（`ref`）和响应式对象（`reactive`）**：组合式 API 提供了 `ref` 和 `reactive` 函数来创建响应式数据。`ref` 用于定义一个响应式的值，而 `reactive` 用于创建一个响应式的对象。

4. **计算属性（`computed`）和观察者（`watch`、`watchEffect`）**：与 Vue 2 类似，组合式 API 也提供了 `computed`、`watch` 和 `watchEffect` 函数，但它们现在可以直接在 `setup()` 函数中使用。

5. **生命周期钩子**：Vue 3 的组合式 API 提供了与生命周期相关的函数（如 `onMounted`, `onUpdated`, `onUnmounted` 等），它们可以直接在 `setup()` 函数中使用。

### 例子：

```vue
<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const count = ref(0);

    function increment() {
      count.value++;
    }

    onMounted(() => {
      console.log('Component is mounted!');
    });

    return { count, increment };
  }
};
</script>
```

在这个例子中，我们在 `setup()` 函数中使用了 `ref` 来创建一个响应式变量 `count`，定义了一个方法 `increment` 来更新 `count` 的值，并使用了 `onMounted` 生命周期钩子。

## provide 和 inject
在 Vue 中，`provide` 和 `inject` 是一对用于跨组件传递数据的 API，特别适用于深层嵌套的组件或者当你需要在多个组件之间共享状态时。这种模式允许一个祖先组件（provider）向其所有子孙组件（consumers）提供数据，而无需通过所有层级的 `props` 逐层传递。

### provide 函数

`provide` 函数用于定义一个可以被下游组件使用的数据或方法。它通常在祖先组件的 `setup` 函数内调用。`provide` 接受两个参数：第一个是一个唯一的标识符（通常是一个字符串或 Symbol），第二个是要提供的数据或方法。

### inject 函数

`inject` 函数用于在子组件或后代组件中接收由祖先组件提供的数据或方法。它在子组件的 `setup` 函数中调用，并接受 `provide` 中使用的相同标识符作为参数。

### 例子

假设有一个场景，其中一个根组件需要向多个深层嵌套的子组件提供一些共享数据：

**根组件（提供数据）**:

```vue
<template>
  <div>
    <child-component />
  </div>
</template>

<script>
import { provide, ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

export default {
  components: { ChildComponent },
  setup() {
    const sharedData = ref('Hello from parent');

    provide('sharedKey', sharedData);

    return {};
  }
};
</script>
```

**子组件（接收数据）**:

```vue
<template>
  <div>{{ sharedData }}</div>
</template>

<script>
import { inject } from 'vue';

export default {
  setup() {
    const sharedData = inject('sharedKey');

    return { sharedData };
  }
};
</script>
```

在这个例子中：

- 祖先组件使用 `provide` 函数提供了一个名为 `sharedKey` 的响应式引用 `sharedData`。
- 子组件通过 `inject` 函数注入 `sharedKey` 并能够访问到由祖先组件提供的 `sharedData`。

`provide` 和 `inject` API 在 Vue 应用程序中用于实现跨组件通信，特别是在需要避免繁琐的 `props` 传递时。它们使得状态共享和数据流在组件树中更加灵活和高效。不过，应当谨慎使用这种模式，因为它可能会使得组件之间的依赖关系变得不那么明显。

## 插件（Plugins）

在 Vue 中，插件（Plugin）是一种用于增强和扩展 Vue 功能的资源。插件可以添加全局功能、组件、指令等，它们通常用于为 Vue 应用程序提供特定的功能或集成外部库。

插件的主要特点是它们可以影响全局范围内的 Vue 行为。这包括添加全局方法和属性、添加全局指令、过滤器、混入（mixins）、甚至添加全新的自定义功能，例如路由管理、状态管理等。

### 示例插件：Element Plus 和 Vue I18n

1. **Element Plus**：这是一个基于 Vue 3 的 UI 组件库，它提供了一套完整的高质量组件和工具，使开发者能够快速搭建美观、响应式的界面。安装 Element Plus 后，可以在 Vue 应用中全局使用这些组件，无需在每个组件中单独导入。

2. **Vue I18n**：这是一个国际化插件，用于实现 Vue 应用的多语言支持。它允许你定义多种语言的翻译，并在应用中轻松切换，实现内容的本地化。

### 如何使用插件

使用插件通常涉及以下步骤：

1. **安装插件**：首先，你需要安装插件。这通常通过 npm 完成，例如 `npm install element-plus` 或 `npm install vue-i18n`。

2. **注册插件**：在 Vue 应用中，你需要使用 `Vue.use()` 方法来注册插件。

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.use(ElementPlus);
app.mount('#app');
```

在这个例子中，我们注册了 Element Plus 插件，使其在整个 Vue 应用中可用。

- 当使用插件时，需要注意它们可能对全局环境产生影响，因此应当谨慎选择和配置。
- 一些插件可能需要额外的配置或初始化步骤来完全启用它们的功能。
- 选择那些活跃维护并与 Vue 版本兼容的插件非常重要。

插件是 Vue 生态系统的重要部分，它们使得 Vue 应用程序可以轻松集成各种功能和外部库，提高开发效率和应用质量。