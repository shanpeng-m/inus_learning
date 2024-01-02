# 24-01-01

## Vue CLI

在Vue.js开发中，CLI（命令行界面）和CDN（内容分发网络）用于引入Vue库的方式有显著区别，各有优缺点，适用于不同的场景。

1. **Vue CLI（命令行界面）**:
   - **描述**: Vue CLI是一个基于命令行的工具，用于创建和管理Vue.js项目。它提供了一套完整的构建工具，支持Webpack、Babel、ESLint等。
   - **优点**:
     - **项目结构**: 自动创建一个标准的项目结构，有利于大型应用的开发。
     - **模块打包和优化**: 使用Webpack等工具，可以进行代码拆分和延迟加载，优化应用性能。
     - **热重载**: 开发时，代码更改后可以即时反映在浏览器上，无需手动刷新。
     - **易于维护**: 项目配置和依赖管理更加系统和规范。
   - **缺点**:
     - **学习曲线**: 需要学习Webpack、Babel等构建工具的使用。
     - **初始化时间较长**: 创建项目和安装依赖可能需要一些时间。
     - **资源消耗较大**: 对系统资源的消耗比较大，特别是在低配置的机器上。

2. **Vue CDN（内容分发网络）**:
   - **描述**: 通过CDN直接在HTML文件中引入Vue.js，适用于小型项目或快速原型开发。
   - **优点**:
     - **快速上手**: 只需在HTML中添加几行代码即可开始开发。
     - **轻量级**: 不需要安装任何构建工具或依赖管理。
     - **适合小项目**: 对于简单或体积较小的项目来说，这是一个快速有效的解决方案。
   - **缺点**:
     - **功能限制**: 缺乏CLI提供的构建和优化工具。
     - **性能优化受限**: 难以进行代码拆分和延迟加载等高级优化。
     - **不适合大型项目**: 难以管理复杂的项目依赖和文件结构。

**哪种更好？**

- 这取决于你的项目需求。对于大型、复杂的应用程序，使用Vue CLI通常是更好的选择，因为它提供了更多的构建工具和优化选项。而对于小型项目或快速原型开发，使用CDN是一种快速且简便的方法。

- 另外，随着你的项目从原型阶段过渡到生产阶段，可能会需要从CDN迁移到CLI以获得更好的性能和可维护性。

## Webpack

Webpack 是一个现代 JavaScript 应用程序的静态模块打包器（module bundler）。在 Webpack 处理应用程序时，它会递归地构建一个依赖关系图（dependency graph），其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个 bundle（捆包）。

下面是 Webpack 的一些核心概念和功能：

1. **入口（Entry）**: 定义了 Webpack 应用程序的入口点。Webpack 从这里开始构建依赖图。

2. **输出（Output）**: 告诉 Webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。通常是在项目的 `dist` 目录。

3. **加载器（Loaders）**: Webpack 只能理解 JavaScript 和 JSON 文件。加载器让 Webpack 能够处理其他类型的文件，并将它们转换为有效模块，以供应用程序使用以及被添加到依赖图中。

4. **插件（Plugins）**: 用于执行范围更广的任务。插件的范围包括打包优化、资源管理和环境变量注入等。与加载器不同，插件在整个构建过程中都可以被用到。

5. **模式（Mode）**: 通过选择 `development` 或 `production` 中的一个，可以启用 Webpack 相应模式下的内置优化。

6. **模块（Module）**: 在 Webpack 里，一切皆模块。一个模块对应一个文件。Webpack 会从配置的入口模块开始递归地构建出应用程序的依赖图。

Webpack 的主要优点是它可以改善前端资源的加载时间和性能，通过模块化的方法组织代码和资源。它支持代码分割（code splitting）、加载器转换、插件扩展等高级功能，非常适合用于构建复杂和大型的前端应用程序。

## 创建项目

使用 Vue CLI 创建一个新的 Vue.js 项目。

```bash
vue create my-cli
```

创建后，目录如下：

```
my-cli
├── README.md              # 项目说明
├── babel.config.js        # Babel 的配置文件，用于设置代码转译的规则和插件。
├── package-lock.json      # 锁定安装时的包的版本号，确保其他人在npm install时大家的依赖能保持一致。 自动生成，不要手动修改。
├── package.json           # 定义项目的各种元信息，包括项目的依赖包、脚本、版本等信息。
├── jsconfig.json          # JavaScript 的配置文件，用于配置代码编辑器或IDE的行为，如代码补全、模块解析等。
├── vue.config.js          # Vue CLI 项目的配置文件，用于自定义Vue CLI的构建和开发行为。
├── node_modules           # 存放项目所依赖的node模块。
├── public                 # 静态资源目录
│   ├── favicon.ico        # 网站图标
│   └── index.html         # HTML 模板
└── src                    # 源代码目录
    ├── App.vue            # 根组件
    ├── assets             # 静态资源目录
    │   └── logo.png       # 图片
    ├── components         # 组件目录
    │   └── HelloWorld.vue # 示例组件
    ├── main.js            # 应用入口文件
    └── views              # 视图目录
        └── Home.vue       # 示例视图
```

启动项目：

```bash
cd my-cli
npm run serve
```

构建项目

```bash
npm run build
```

构建后会在项目根目录下生成一个 `dist` 目录，里面包含了构建后的静态资源文件。

部署项目：

将 `dist` 目录下的文件部署到服务器上即可。

## 其他命令

```bash
vue add @vue/xxx # 添加vue插件
vue add xxx      # 添加第三方插件
vue add router   # 添加路由
vue add vuex     # 添加状态管理

npm install -g @vue/cli-service-global # 全局安装 @vue/cli-service-global，可以在命令行中使用 vue serve 和 vue build 命令
vue serve        # 在开发环境中快速原型开发一个单文件组件

vue ui           # 启动一个可视化的项目管理界面
```

## SFC 单文件组件

SFC（Single File Component）是 Vue.js 单文件组件的缩写，是 Vue.js 应用程序的基本组成部分。它由三部分组成：

1. **模板（Template）**: 用于声明组件的 HTML 结构。
2. **脚本（Script）**: 用于声明组件的 JavaScript 代码。
3. **样式（Style）**: 用于声明组件的 CSS 样式。

SFC 的优点是它将组件的所有相关内容都放在一个文件中，便于组件的编写和维护。另外，SFC 还支持预处理器（如 Less、Sass、Stylus 等）和 CSS Modules。

## export 关键词

在 JavaScript 中，`export` 关键字用于从一个模块中导出函数、对象、原始值或类，以便可以在其他模块中通过 `import` 语句使用它们。这是实现模块化 JavaScript 的一部分，使得代码可以分割成可重用的部分，有助于组织和维护大型代码库。

### 使用 `export` 的两种主要方式：

1. **命名导出（Named Exports）**:
   - 可以导出多个值。
   - 每个值都有其名称，`import` 时需要使用相同的名称。

   ```javascript
   // 导出单个特性
   export const myVariable = "someValue";

   // 导出多个特性
   export function myFunction() { ... }
   export class MyClass { ... }
   ```

   在导入时，你需要使用相同的名称：

   ```javascript
   import { myVariable, myFunction, MyClass } from './myModule.js';
   ```

2. **默认导出（Default Exports）**:
   - 每个模块只能有一个默认导出。
   - 导入时可以使用任意名称。

   ```javascript
   // 默认导出
   export default function() { ... }  // 匿名函数
   // 或
   const myFunction = () => { ... }
   export default myFunction;
   ```

   导入默认导出的值：

   ```javascript
   import anyNameYouLike from './myModule.js';
   ```

### 使用 `export` 的好处：

- **可维护性**：模块化代码更容易维护和理解。
- **重用性**：可以在不同的文件或项目中重用模块。
- **命名空间**：通过模块化可以避免全局命名空间污染。
- **依赖管理**：明确地声明依赖关系，使得依赖管理更清晰。

在现代 JavaScript 开发中，`export` 和 `import` 已成为组织和构建大型应用程序的基石。

## script setup 语法

在 Vue 3 中，`<script setup>` 是一种新的组件编写方式，它提供了一种更简洁、声明式的语法来使用 Composition API。这种语法是 Vue 3.2 中引入的，旨在简化组件代码的组织方式，并使其更具可读性和易用性。

### `<script setup>` 的关键特性：

1. **简化的 Composition API 语法**:
   - 在 `<script setup>` 中，你可以直接使用 Composition API 的特性，如 `ref`, `reactive`, `computed`, `watch`, `onMounted` 等，而不需要在 `setup()` 函数中显式声明它们。

2. **顶层 `import` 语法**:
   - 允许你在顶层使用 `import` 语句导入所需的功能和组件，而不需要将它们包裹在 `setup()` 函数内。

3. **直接定义组件的 props 和 emits**:
   - 使用 `defineProps` 和 `defineEmits` 函数可以直接在顶层定义组件的 `props` 和 `emits`，无需额外的配置对象。

4. **更紧凑的组件定义**:
   - `<script setup>` 使得组件的代码更加紧凑和集中，避免了传统的 `options API` 中繁琐的配置和嵌套。

### 示例

以下是一个使用 `<script setup>` 的简单 Vue 3 组件示例：

```vue
<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);

function increment() {
  count.value++;
}
</script>
```

在这个例子中，我们可以直接在 `<script setup>` 中使用 `ref` 从 Vue 引入，定义一个响应式的 `count` 变量，并定义一个 `increment` 方法来改变它的值。这个方法和变量可以直接在模板中使用，无需额外的 `setup()` 函数。

## css scoped 属性

在 Vue.js 中，`<style>` 标签的 `scoped` 属性用于将 CSS 样式限制在当前组件中，避免它们影响到其他组件。这是通过在编译时自动为选择器添加一个属性来实现的，该属性的值是组件的唯一 ID。

```vue
<style scoped>
h1 {
  color: red;
}
</style>
```

在上面的例子中，`h1` 元素的样式只会应用到当前组件中的 `h1` 元素，而不会影响到其他组件中的 `h1` 元素。

## :deep() 选择器

在 Vue.js 中，`:deep()` 选择器用于选择组件内部的所有元素，包括子组件中的元素。

```vue
<style scoped>
.parent :deep(.child) {
  color: red;
}
</style>
```

在上面的例子中，`.parent` 元素内部的所有 `.child` 元素都会应用 `color: red` 样式。

## :slotted() 选择器

在 Vue.js 中，`:slotted()` 选择器用于选择插槽内容中的元素。

```vue
<style scoped>
::slotted(span) {
  color: red;
}
</style>

<template>
  <div>
    <slot></slot>
  </div>
</template>
```

在上面的例子中，插槽内容中的 `span` 元素会应用 `color: red` 样式。

## :global() 选择器

在 Vue.js 中，`:global()` 选择器用于选择全局 CSS 样式。

```vue
<style scoped>
:global(.container) {
  width: 100%;
}
</style>
```

在上面的例子中，`.container` 元素会应用 `width: 100%` 样式，即使它不在当前组件中。

## css中的v-bind 函数

```vue
<template>
  <img alt="Vue logo" src="./my-cli/src/assets/logo.png">
  <p class="highlight">Hello World!</p>
  <input type="button" :value="Change" @click="onclick"/>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            color: 'LightBlue'
        }
    },
    methods: {
        onclick() {
            this.color = 'Yellow';
        }
    }
};
</script>

<style scope>
.highlight {
    boarder: 1px solid red;
    background-color: v-bind(color);
}
</style>
```

## css 模块化

在 Vue 中，`<style module>` 用于实现 CSS 模块化，这是一种封装和局部化组件样式的方法。当你在 `<style>` 标签中添加 `module` 属性时，Vue 会将其视为一个 CSS Module，为该组件内的所有类名生成唯一的哈希值，从而避免了全局样式污染。

### 使用方法：

在 `.vue` 文件中，你可以这样定义一个 CSS Module：

```vue
<template>
  <div :class="$style.container">
    <p :class="$style.text">This is a component with CSS Modules</p>
  </div>
</template>

<script>
export default {
  name: 'MyComponent'
  // 组件的其他选项...
};
</script>

<style module>
.container {
  border: 1px solid #ddd;
  padding: 16px;
}

.text {
  color: blue;
}
</style>
```

在这个例子中：

- CSS 类 `.container` 和 `.text` 在 `<style module>` 中定义。
- 在 `<template>` 中，我们通过绑定 `:class="$style.container"` 和 `:class="$style.text"` 来应用这些样式。`$style` 是一个特殊的对象，它包含了所有 CSS Module 中定义的类名。

### CSS Module 的特点：

1. **局部作用域**：CSS 类名在当前组件内局部化，避免了与其他组件的类名冲突。
2. **可组合性**：CSS Module 支持类名的组合，可以很方便地重用和组合不同的样式。
3. **可维护性和可读性**：由于样式是与组件紧密绑定的，它提高了代码的可维护性和可读性。
4. **与预处理器兼容**：CSS Module 可以与诸如 SCSS、LESS 等 CSS 预处理器一起使用。

### 使用 CSS Module 的好处：

- **避免全局污染**：避免了 CSS 类名在全局范围内冲突的问题。
- **模块化**：有助于在大型应用中管理和维护样式。
- **清晰的依赖关系**：组件和它的样式之间的依赖关系变得非常明确。
- **易于重构和修改**：更改组件的样式不会影响到其他组件。

CSS 模块化是一个非常有用的特性，尤其是在构建大型、复杂的应用程序时，它能够有效地提高代码的组织性和可维护性。