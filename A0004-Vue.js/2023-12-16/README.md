# 2023-12-16

Vue 3 引入的 Composition API 是一个新的编写组件逻辑的方式，它旨在提高代码的组织性和可复用性。与 Vue 2 中的 Options API 相比，Composition API 提供了更灵活的组织组件逻辑的方法，尤其是在处理复杂组件时。

### Composition API 的核心概念

1. **`setup()` 函数**：这是 Composition API 的核心，所有的组合逻辑都在这个函数中定义。它在组件被创建之前执行，是定义响应式状态和函数的地方。

2. **响应式引用（Reactive References）**：使用 `ref()` 创建一个响应式引用，这使得 Vue 能够跟踪数据的改变并相应地更新视图。

3. **响应式状态（Reactive State）**：使用 `reactive()` 可以创建一个响应式对象，这对于处理复杂的嵌套对象很有用。

4. **生命周期钩子**：如 `onMounted`、`onUpdated`、`onUnmounted` 等，它们用于在组件的不同阶段执行代码。

5. **计算属性（Computed Properties）**：通过 `computed()` 创建，它根据响应式状态的变化重新计算值。

### 示例

假设我们有一个简单的计数器组件：

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const count = ref(0);

    function increment() {
      count.value++;
    }

    return { count, increment };
  }
});
</script>
```

在这个例子中：

- 我们使用 `setup()` 函数来定义组件的逻辑。
- `count` 是一个响应式引用，使用 `ref(0)` 创建，并初始化为 0。
- `increment` 函数用来增加 `count` 的值。
- 在模板中，我们可以直接使用 `count` 和 `increment`，就像它们是组件的数据和方法一样。

通过这种方式，Composition API 使得组件的逻辑更加模块化和可复用，同时也使得代码更容易理解和维护。

理解 `ref(0)` 在 Vue 3 的 Composition API 中是如何工作的，确实对初学者来说可能有些挑战。让我们深入探讨一下这个概念。

### `ref()` 函数的作用

在 Vue 3 的 Composition API 中，`ref()` 函数用于创建一个响应式引用。当你传递一个值给 `ref()` 函数时，它返回一个响应式的对象，这个对象包含一个名为 `value` 的属性。

### 如何使用 `ref()`

当你执行 `const count = ref(0);` 时，发生了以下几件事：

1. **初始化值**：你传递 `0` 给 `ref()` 函数，这意味着你想要创建一个初始值为 0 的响应式数据。

2. **返回响应式对象**：`ref()` 函数返回一个包含 `value` 属性的对象。这个 `value` 属性就是你传递给 `ref()` 的值，即 `0`。

3. **访问和修改**：你可以通过 `count.value` 访问或修改这个值。当 `count.value` 改变时，Vue 会自动跟踪这些变化，并在必要时更新 DOM。

### 为什么使用 `ref()`

Vue 使用 `ref()` 来确保即使是基本类型（如数字、字符串、布尔值）也能够成为响应式数据。在 Vue 的响应式系统中，当这些基本类型的数据发生变化时，视图会自动更新以反映这些变化。

### 例子解释

在计数器组件中，`const count = ref(0);` 这行代码做了以下几件事：

- 创建了一个名为 `count` 的响应式引用。
- 初始化 `count` 的值为 `0`。
- 当你在组件中通过 `count.value++` 改变 `count` 的值时，因为 `count` 是响应式的，Vue 将会自动更新任何使用到 `count` 的地方，如模板中显示的计数值。

## `defineComponent`

`defineComponent` 是 Vue 3 中的一个函数，它用于定义一个 Vue 组件。在使用 Composition API 时，`defineComponent` 提供了几个关键的好处：

### 1. **类型推断与 TypeScript 支持**

- **类型安全**：如果你在使用 TypeScript，`defineComponent` 提供了更好的类型推断。这意味着你在编写组件时会得到更准确的类型提示和编译时检查。
- **自动补全**：在支持的编辑器中，`defineComponent` 可以提供更好的自动补全体验。

### 2. **明确的组件声明**

- 在 Vue 3 中，你可以不使用 `defineComponent` 直接导出一个对象来定义组件，但使用 `defineComponent` 可以更清晰地表明这是一个 Vue 组件，尤其是在与其他 JavaScript/TypeScript 代码一起使用时。

### 3. **对 Vue 特性的支持**

- `defineComponent` 确保了 Vue 的各种特性，如 mixins、extends 等，能够在组件中正常工作。

### 使用 `defineComponent`

在 Vue 3 中，你通常会这样使用 `defineComponent`：

```javascript
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    // Composition API 逻辑
    const state = ref(0);
    
    onMounted(() => {
      console.log('Component is mounted!');
    });

    return { state };
  }
});
```

在这个例子中：

- `defineComponent` 接收一个对象作为参数，这个对象定义了组件的选项。
- `setup` 函数是 Composition API 的核心，用于定义组件的响应式状态、计算属性、方法等。
- 在 `setup` 函数中，可以使用 Composition API 提供的各种函数，如 `ref`, `computed`, `onMounted` 等。
- `setup` 函数返回的对象中的属性和方法，都可以在组件的模板中直接使用。

## 模块化和可复用性

Vue 3 的 Composition API 通过提供更细粒度的代码组织方式，促进了模块化和可复用性。这是通过以下几个关键方面实现的：

### 1. **逻辑关注点分离**

在 Vue 2 的 Options API 中，组件的逻辑通常按照 Vue 的选项（如 `data`, `methods`, `computed`）组织。这意味着，相关的逻辑可能会分散在不同的选项中。例如，一个与特定功能相关的数据、计算属性和方法可能会分别放在 `data`, `computed`, 和 `methods` 中。

而在 Composition API 中，你可以将所有相关的逻辑放在一起。例如，你可以创建一个单独的函数来处理特定的功能，这个函数包含了所有相关的响应式数据、计算属性和方法。这样做的好处是，当阅读或修改一个特定功能的代码时，你不需要在组件的不同部分之间跳转。

### 2. **代码复用**

在 Vue 2 中，代码复用通常通过 mixins 实现，但这可能会导致变量来源不明确和命名冲突。

Composition API 通过提供可复用的组合函数（也称为 composable functions）来解决这个问题。这些函数可以封装一组相关的响应式状态和逻辑，然后在多个组件中重用。由于每个组合函数都是独立的，它们可以轻松地在不同组件之间共享，而不会引入不必要的依赖或冲突。

### 3. **清晰的数据流和状态管理**

使用 Composition API，组件的状态（响应式数据）通常在 `setup()` 函数内部创建和管理。这提供了一个清晰的视图，了解组件的状态是如何初始化的，以及如何随时间变化。这种方式使状态管理更加直观，易于跟踪和维护。

### 4. **更好的类型推断和 TypeScript 集成**

Composition API 的设计非常适合 TypeScript，提供了更好的类型推断。在 TypeScript 项目中，这意味着更清晰的代码，更少的类型断言，以及更好的开发体验。

### 举例

假设你有一个用于获取和显示用户数据的功能。在 Composition API 中，你可以创建一个名为 `useUserData` 的组合函数，它封装了所有相关的响应式状态、计算属性和方法。然后，你可以在多个组件中重用这个函数，而不需要担心状态管理的复杂性或代码重复。

```javascript
function useUserData(userId) {
  const user = ref(null);
  const isLoading = ref(false);

  const fetchUser = async () => {
    isLoading.value = true;
    user.value = await getUserData(userId);
    isLoading.value = false;
  };

  onMounted(fetchUser);

  return { user, isLoading };
}
```

在这个例子中：
`fetchUser = async ()` 是 JavaScript 中的异步函数（async function）声明的一种方式。这种声明创建了一个函数 `fetchUser`，它能够执行异步操作。

### 异步函数 (Async Function)

- **关键字 `async`**: 这个关键字用于声明一个异步函数。它告诉 JavaScript 这个函数将涉及异步操作，如从服务器获取数据、读取文件等。

- **异步操作**: 异步操作指的是那些不会立即完成并且需要一定时间来等待结果的操作。例如，从互联网上下载数据或查询数据库。

- **函数体**: 在 `async` 关键字后面的 `()` 中，你可以定义函数的参数（在这个例子中没有参数）。紧随其后的 `{}` 中是函数的主体，即执行的代码块。

### await 关键字

在异步函数内部，你通常会使用 `await` 关键字。这个关键字用于等待一个异步操作（如一个返回 Promise 的函数）的完成。例如：

```javascript
async function fetchUser() {
  const response = await fetch('https://some-api.com/user');
  const userData = await response.json();
  return userData;
}
```

在这个例子中：

- `fetchUser` 是一个异步函数。
- `fetch('https://some-api.com/user')` 发起一个网络请求，获取用户数据。
- `await` 使 JavaScript 暂停执行，直到 `fetch()` 完成并返回一个响应（`response`）。
- `response.json()` 是另一个异步操作，它解析 JSON 响应。
- 函数最终返回 `userData`。

### 使用场景

在 Vue 应用中，你可能会在组件的 `setup` 函数或其他方法中使用这种异步函数来获取数据，处理异步任务等。

```javascript
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const userData = ref(null);

    const fetchUser = async () => {
      const response = await fetch('https://some-api.com/user');
      userData.value = await response.json();
    };

    onMounted(() => {
      fetchUser();
    });

    return { userData };
  }
});
```

在这个 Vue 组件中，`fetchUser` 是一个异步函数，用于在组件挂载后获取用户数据。这是 `async/await` 在现代 JavaScript 和 Vue 中常见的用法，用于优雅地处理异步逻辑。

当然可以。在 Vue 3 中，响应式引用（Reactive References）和响应式状态（Reactive State）是 Composition API 的核心概念，它们都用于创建和管理可响应数据的变化。让我分别详细解释一下这两个概念。

### 响应式引用（Reactive References）

响应式引用通常是通过 `ref()` 函数创建的。它用于处理基本数据类型（如字符串、数字、布尔值）。

1. **创建响应式引用**：
   - 当你使用 `ref()` 创建一个变量时，你实际上是在创建一个包含一个 `value` 属性的响应式对象。
   - 这个 `value` 属性持有你传给 `ref()` 的实际值。

2. **使用响应式引用**：
   - 在 JavaScript 中，你通过 `.value` 属性访问或修改这个值。
   - 在模板中直接使用时，Vue 会自动解构 `.value` 属性，所以你不需要显式地访问它。

3. **例子**：
   ```javascript
   const count = ref(0); // 创建响应式引用，初始值为 0

   function increment() {
     count.value++; // 在 JavaScript 中修改值
   }
   ```
   - 在这个例子中，`count` 是一个响应式引用。当 `count.value` 改变时，Vue 会自动更新依赖于 `count` 的 DOM。

### 响应式状态（Reactive State）

响应式状态通常是通过 `reactive()` 函数创建的。它用于处理更复杂的数据类型，如对象或数组。

1. **创建响应式状态**：
   - 使用 `reactive()` 可以将一个普通对象转换成一个响应式对象。
   - 对这个对象的任何修改都会触发视图更新。

2. **使用响应式状态**：
   - 你可以直接修改对象的属性，无需使用 `.value`。
   - 它更适合用于复杂的数据结构，如嵌套对象。

3. **例子**：
   ```javascript
   const state = reactive({ count: 0, name: 'Vue' }); // 创建响应式状态

   function increment() {
     state.count++; // 直接修改状态
   }
   ```
   - 在这个例子中，`state` 是一个包含 `count` 和 `name` 的响应式对象。对这些属性的任何修改都将自动反映在视图中。

### 总结

- 使用 `ref()` 创建的响应式引用适用于基本类型的数据，需要通过 `.value` 属性访问或修改。
- 使用 `reactive()` 创建的响应式状态适用于更复杂的数据结构，可以直接修改其属性。
