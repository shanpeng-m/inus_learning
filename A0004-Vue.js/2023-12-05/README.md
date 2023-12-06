# 23-12-05 组件

## 4-1 组件的基本使用

### 4-1-1 组件的定义

javascript

```javascript
Vue.createApp({})
    .component('my-component', {
        template: '<div>{{name}} custom component!</div>',
        data() {
            return {
                name: 'my'
            }
        }
    })
    .mount('#app')
```

app.component('组件名', {组件配置})

### 4-1-2 全局组件和局部组件

在Vue.js中，全局组件和局部组件的主要区别在于它们的注册方式和作用范围。

1. **全局组件**：
   - **注册方式**：使用`Vue.component`方法注册。一旦注册，可以在任何新创建的Vue实例的模板中使用。
   - **作用范围**：应用中的任何组件都可以无限制地使用全局组件，无需在各个组件中重复注册。
   - **示例**：
```javascript
// 定义一个全局组件
Vue.component('my-global-component', {
    template: '<div>A global component</div>'
});
```
在任何组件模板中可以直接使用`<my-global-component></my-global-component>`。

1. **局部组件**：
   - **注册方式**：在组件的`components`选项中注册。仅在定义它的组件中有效。
   - **作用范围**：只能在特定的父组件中使用。它对其他组件是不可见的，这有助于避免全局命名空间的污染。
   - **示例**：
```javascript
// 定义一个局部组件
const MyLocalComponent = {
    template: '<div>A local component</div>'
};

// 在另一个组件中使用
new Vue({
    el: '#app',
    components: {
    'my-local-component': MyLocalComponent
    }
});
```

在`#app`内部可以使用`<my-local-component></my-local-component>`，但在外部无法使用。

**选择使用全局还是局部组件** 取决于应用的需求。全局组件适合于那些需要跨多个组件重复使用的功能（如按钮、输入框等），而局部组件更适合于仅在特定场景中使用的功能，有助于保持代码的清晰和组织。

## 4-2 组件的通信

在Vue.js中，组件间通信是一个核心概念，用于在不同组件之间共享数据和行为。Vue提供了几种不同的方式来实现这一点：

1. **Props**（属性）:
   - **用途**: 父组件向子组件传递数据。
   - **工作原理**: 父组件通过属性传递数据给子组件。子组件通过`props`选项来接收这些数据。
   - **示例**: 
     - 父组件模板中：`<child-component some-prop="value"></child-component>`
     - 子组件定义中：`props: ['someProp']`

2. **Custom Events**（自定义事件）:
   - **用途**: 子组件向父组件发送消息。
   - **工作原理**: 子组件使用`$emit`方法触发事件，父组件通过监听这些事件来接收消息。
   - **示例**: 
     - 子组件中：`this.$emit('my-event', data);`
     - 父组件模板中：`<child-component @my-event="handleEvent"></child-component>`

3. **Provide/Inject**:
   - **用途**: 实现祖先组件向其所有子孙组件传递数据，不论层级有多深。
   - **工作原理**: 祖先组件有一个`provide`选项来提供数据，子孙组件可以使用`inject`选项来接收这些数据。
   - **示例**: 
     - 祖先组件中：`provide: { key: value }`
     - 子孙组件中：`inject: ['key']`

4. **Vuex**:
   - **用途**: 管理和维护应用的整体状态。
   - **工作原理**: Vuex是一个状态管理模式，它提供了一个集中存储所有组件的共享状态的仓库，并以一种可预测的方式来改变这个状态。
   - **示例**: 
     - 在Vuex仓库中定义状态、mutations、actions等。
     - 组件中通过`this.$store.state`访问状态，通过`this.$store.commit`触发同步更新，通过`this.$store.dispatch`触发异步操作。

每种方法都适用于不同的场景。Props和Custom Events是最基本的通信方式，适用于父子组件间的通信。Provide/Inject适用于跨多层级的通信，但应谨慎使用，以避免复杂的依赖关系。Vuex适合于大型应用，可以集中管理所有组件的状态。选择合适的通信方式取决于你的应用结构和需要解决的具体问题。

在Vue中，props的命名和使用支持从小驼峰（camelCase）和连接线（kebab-case）之间的自动转换。这是因为HTML属性是不区分大小写的，所以当你在父组件的模板中使用子组件时，你需要使用连接线（kebab-case）形式。然而，在JavaScript中，属性名通常使用小驼峰（camelCase）形式。Vue智能地在这两种命名约定之间做了桥接。

这里是如何在Vue中使用这两种形式的一个示例：

1. **子组件定义中使用小驼峰（camelCase）**：
   ```javascript
   Vue.component('child-component', {
     props: ['myProp'],
     template: '<div>{{ myProp }}</div>'
   });
   ```

2. **父组件模板中使用连接线（kebab-case）**：
   ```html
   <child-component my-prop="value"></child-component>
   ```

在这个例子中，`myProp`是子组件中定义的prop。然而，在父组件的模板中，我们使用`my-prop`来传递这个prop。Vue会自动处理这两种命名风格之间的转换，让你可以在JavaScript中使用驼峰命名，同时在模板中遵循HTML的命名规则。

### 不要在组件内修改props的值

在Vue.js中，组件内部直接修改prop的值是一个常见的反模式，通常应该避免。这是因为props的主要目的是让父组件能够传递数据给子组件，而子组件直接修改这些值可能会导致应用的数据流难以理解和维护。下面是关于为什么不应该在组件内修改prop的值的几个要点：

1. **单向数据流**：Vue的组件体系设计为单向数据流。这意味着prop应该被视为从父组件流向子组件的只读数据。子组件改变prop可能导致父组件的状态与子组件的状态不同步，从而引起数据流中的不一致。

2. **源数据的所有权**：Prop的值应该由提供这个prop的父组件来控制。如果子组件能修改prop，它实际上就对父组件的状态产生了影响，这违反了组件间明确的界限和封装。

3. **预测性和可维护性**：如果组件内部改变了它的props，会使得组件的行为变得难以预测和理解。这种模式可能导致bug，并且使得组件难以维护。

如果你需要根据prop的值在子组件内部做出响应或更改，你可以：

- 使用prop的值来初始化一个本地的响应式数据属性。
- 使用计算属性来派生新的值。
- 如果需要通知父组件变化，可以通过事件向父组件发出通知（使用`this.$emit`）。

例如，如果你想根据一个prop初始化一个内部数据属性，可以这样做：

```javascript
props: ['initialValue'],
data() {
  return {
    // 初始化一个内部属性，基于prop的值
    internalValue: this.initialValue
  };
}
```

这样，`internalValue`是一个内部状态，可以自由修改，而不会影响到父组件传递的`initialValue` prop。如果需要将更改反馈给父组件，可以使用事件。

### 使用$emit通知父组件

在 Vue.js 中，`$emit` 是一种在组件间进行通信的方法，尤其是用于子组件向父组件发送消息。这是实现组件间通信的常用技术之一，尤其当你需要让父组件知道某些事件发生在子组件中时。

### 原理

`$emit` 的工作原理基于 Vue 的自定义事件系统。当一个子组件需要通知其父组件发生了某个事件时，它会 "发射"（emit）一个事件。这个事件可以附带一些参数，这些参数可以传递给父组件。父组件监听这个事件，并定义一个方法来响应这个事件。

### 使用方法

#### 步骤 1: 子组件发射事件

子组件使用 `$emit` 发射一个事件，并可以传递数据作为参数。

**子组件 (ChildComponent.vue):**

```vue
<template>
  <button @click="notifyParent">点击我</button>
</template>

<script>
export default {
  methods: {
    notifyParent() {
      // 发射一个名为 'childEvent' 的事件，传递 'someData' 作为参数
      this.$emit('childEvent', 'someData');
    }
  }
}
</script>
```

在这个例子中，当按钮被点击时，`notifyParent` 方法会被调用，它使用 `$emit` 来发射 `childEvent` 事件，并传递字符串 `'someData'` 作为参数。

#### 步骤 2: 父组件监听事件

父组件在使用子组件的地方监听这个事件，并定义一个方法来响应这个事件。

**父组件 (ParentComponent.vue):**

```vue
<template>
  <div>
    <child-component @childEvent="handleChildEvent"></child-component>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  methods: {
    handleChildEvent(data) {
      console.log("事件被触发，接收到的数据:", data);
      // 这里可以根据接收到的数据执行更多操作
    }
  }
}
</script>
```

在父组件中，通过 `@childEvent="handleChildEvent"` 监听子组件发射的 `childEvent` 事件。当这个事件发生时，`handleChildEvent` 方法被调用，接收从子组件发送的数据（在这个例子中是字符串 `'someData'`）。

使用 `$emit` 通知父组件是 Vue 中实现子到父通信的一种有效方式。通过这种方法，子组件可以发射事件，父组件可以监听并响应这些事件。这种通信机制不仅简洁高效，而且有助于保持组件的封装性和可重用性。

当子组件发送多个不同的 `emit` 来通知父组件时，父组件可以通过监听不同的事件名称来区分这些 `emit` 来自哪里。每个 `$emit` 调用通常会包含一个特定的事件名称，这使得父组件能够根据这些名称区分不同的事件来源。

### 示例

假设子组件有两个按钮，每个按钮点击时发出不同的 `emit`。

**子组件 (ChildComponent.vue):**

```vue
<template>
  <button @click="emitEventOne">Emit Event One</button>
  <button @click="emitEventTwo">Emit Event Two</button>
</template>

<script>
export default {
  methods: {
    emitEventOne() {
      // 发射第一个事件
      this.$emit('eventOne', 'Data from Event One');
    },
    emitEventTwo() {
      // 发射第二个事件
      this.$emit('eventTwo', 'Data from Event Two');
    }
  }
}
</script>
```

在这个子组件中，定义了两个方法 `emitEventOne` 和 `emitEventTwo`，分别用于发出名为 `eventOne` 和 `eventTwo` 的事件。

**父组件 (ParentComponent.vue):**

```vue
<template>
  <div>
    <child-component 
      @eventOne="handleEventOne" 
      @eventTwo="handleEventTwo"
    ></child-component>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  methods: {
    handleEventOne(data) {
      console.log("Event One triggered:", data);
    },
    handleEventTwo(data) {
      console.log("Event Two triggered:", data);
    }
  }
}
</script>
```

在父组件中，分别监听这两个事件，并为它们指定了不同的处理函数：`handleEventOne` 用于处理 `eventOne`，`handleEventTwo` 用于处理 `eventTwo`。这样，当子组件发出特定的 `emit` 时，父组件就可以通过不同的事件处理器来区分它们，并知道是哪个部分的代码触发了事件。

通过为不同的 `emit` 指定不同的事件名称，并在父组件中对这些不同的事件设置不同的监听器，可以轻松区分和确定子组件中哪个部分发出了 `emit`。这种模式不仅清晰明了，还有助于维护组件间清晰的通信界限和逻辑流程。

### provide and inject

在 Vue.js 中，`provide` 和 `inject` 是一对用于跨组件树进行通信的选项，主要用于父组件向其所有子孙组件提供数据，而无需通过每个子组件逐层传递。这对于在深层嵌套的组件中共享数据非常有用，例如在组件库或高阶应用中。

### 原理

- **provide**: 父组件使用 `provide` 选项来提供数据。`provide` 可以是一个对象或返回对象的函数。提供的数据可以是响应式的或普通的对象。
- **inject**: 子组件使用 `inject` 选项来声明它希望从其祖先组件接收的数据。`inject` 是一个字符串数组，指定了要注入的属性名。

### 示例

假设我们有一个场景，其中父组件需要向所有子组件提供一个消息。

#### 父组件

首先，在父组件中使用 `provide` 选项：

```vue
<script>
export default {
  provide() {
    return {
      sharedMessage: 'Hello from parent'
    };
  }
}
</script>
```

在这个例子中，父组件提供了一个名为 `sharedMessage` 的数据。

#### 子组件

然后，在任何子组件中，你可以使用 `inject` 选项来接收 `sharedMessage` 数据：

```vue
<script>
export default {
  inject: ['sharedMessage'],
  mounted() {
    console.log(this.sharedMessage); // 输出: 'Hello from parent'
  }
}
</script>
```

在这里，子组件通过 `inject` 选项注入了 `sharedMessage`。现在，这个子组件可以访问由其祖先组件提供的 `sharedMessage` 数据。

### 使用场景

`provide` 和 `inject` 经常在高级应用或组件库中使用，比如在开发提供跨多个组件共享状态的插件时。由于这种方式不需要显示的属性传递，它特别适合于深层嵌套组件的场景。

### 注意事项

- `provide` 和 `inject` 绑定并不是响应式的，除非你传递的是响应式对象。从 Vue 3 开始，你可以使用 `reactive` 函数使提供的对象变成响应式。
- 这种模式虽然强大，但如果过度使用可能会使得组件间的依赖关系变得不明确。因此，建议仅在必要时使用，尤其是在那些需要跨多层级传递数据的场景中。

通过使用 `provide` 和 `inject`，Vue 应用可以实现跨组件层级的通信，同时保持组件的封装性和重用性。

