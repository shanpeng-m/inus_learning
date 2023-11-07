let title = document.querySelector('#title');
let url = document.querySelector('#url');
let list = document.querySelector('#list');

document.querySelector('#btn').addEventListener('click', function () {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.textContent = title.value; // 使用 textContent 而不是 innerHTML 出于安全原因
    a.href = url.value; // 直接设置 href 属性
    li.appendChild(a);
    list.appendChild(li);
    title.value = ''; // 清空 title 输入框
    url.value = ''; // 清空 url 输入框
}, false);