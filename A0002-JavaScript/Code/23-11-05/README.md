# 23-11-05 HTML或者XML操作 DOM（Document Object Model）

## 什么是DOM？

JavaScript的文档对象模型（DOM）是一个跨平台和语言独立的接口，它允许程序和脚本动态地访问和更新文档的内容、结构和样式。DOM将一个HTML或XML文档表现为一个树状结构，其中每个节点都是一个对象，代表文档中的一部分。

### DOM的节点类型包括：

- **文档节点**：代表整个文档（HTML或XML页面）。
- **元素节点**：代表文档中的HTML或XML元素。
- **文本节点**：包含元素或属性中的文本内容。
- **属性节点**：包含关于元素属性的信息。

### DOM操作的例子：

#### 1. 访问元素

```javascript
// 访问id为"myDiv"的元素
const myDiv = document.getElementById('myDiv');

// 访问所有的<p>元素
const paragraphs = document.getElementsByTagName('p');

// 访问所有class为"myClass"的元素
const myClassElements = document.getElementsByClassName('myClass');

// 使用CSS选择器访问元素
const myElement = document.querySelector('.myClass');
const myElements = document.querySelectorAll('.myClass');
```

#### 2. 修改元素内容和属性

```javascript
// 修改元素内容
const myDiv = document.getElementById('myDiv');
myDiv.textContent = 'Hello, World!'; // 设置文本内容
myDiv.innerHTML = '<strong>Hello, World!</strong>'; // 设置HTML内容

// 修改元素属性
const myImage = document.getElementById('myImage');
myImage.src = 'newImage.png';
myImage.alt = 'A new image';
```

#### 3. 创建和移除元素

```javascript
// 创建一个新的<p>元素
const newParagraph = document.createElement('p');
newParagraph.textContent = 'This is a new paragraph.';

// 将新元素添加到DOM中
myDiv.appendChild(newParagraph);

// 移除元素
const oldParagraph = document.getElementById('oldParagraph');
myDiv.removeChild(oldParagraph);
```

#### 4. 事件处理

```javascript
// 添加一个点击事件监听器到按钮上
const myButton = document.getElementById('myButton');
myButton.addEventListener('click', function(event) {
  alert('Button was clicked!');
});
```

#### 5. 操作样式

```javascript
// 修改元素的样式
const myDiv = document.getElementById('myDiv');
myDiv.style.color = 'blue';
myDiv.style.backgroundColor = 'yellow';

// 添加和移除CSS类
myDiv.classList.add('my-new-class');
myDiv.classList.remove('my-old-class');
```

#### 6. 遍历DOM

```javascript
// 获取元素的子元素
const children = myDiv.children;

// 遍历子元素
for (const child of children) {
  console.log(child.id);
}
```

#### 7. 操作表格

```javascript
// 添加新行到表格
const myTable = document.getElementById('myTable');
const newRow = myTable.insertRow(-1); // -1 表示在末尾添加

// 添加单元格到新行
const newCell = newRow.insertCell(0);
newCell.textContent = 'New cell';
```

#### 8. 操作表单

```javascript
// 获取表单输入值
const myForm = document.getElementById('myForm');
const inputValue = myForm.querySelector('input').value;

// 设置输入值
myForm.querySelector('input').value = 'New Value';
```

#### 9. 操作文档结构

```javascript
// 获取父元素
const parent = myDiv.parentNode;

// 获取相邻的兄弟元素
const nextSibling = myDiv.nextElementSibling;
const previousSibling = myDiv.previousElementSibling;
```

### XML操作

DOM操作对于XML文档同样适用，因为DOM是与语言和平台无关的。所以，如果你有一个XML文档，你可以使用相同的DOM API来操作它。

```javascript
// 解析XML字符串
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

// 访问XML元素
const title = xmlDoc.getElementsByTagName('title')[0].textContent;
```

JavaScript DOM为开发者提供了一个强大的接口来动态地交互和控制web页面。通过这些接口，