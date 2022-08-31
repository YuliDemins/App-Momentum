import {getLocalStorageLang, lang } from './settings.js';
let TodoTitle = document.querySelector(".todo__title")



let addTodo = document.querySelector(".todo__input");
let addBtn = document.querySelector(".todo__btn-add");

let todo = document.querySelector(".todo__list");

let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

function displayMessages() {
    let displayMessage = '';
    if (todoList.length == 0) todo.innerHTML = ''
    todoList.forEach((item, index) => {
        displayMessage += `
        <li class="todo__list-item">
        <input type='checkbox' id='item_${index}' ${item.checked ? 'checked': ''}>
        <label for='item_${index}' class="${item.important ? 'important' : ''}">${item.todo}</label>
        <button class="todo__container-remove">-</button>
        </li>
        `;
        todo.innerHTML = displayMessage;
    })
}

addBtn.addEventListener('click', () => {
    if (!addTodo.value) return;
    let newTodo = {
        todo: addTodo.value,
        checked: false,
    }

    todoList.push(newTodo)
    displayMessages()
    localStorage.setItem('todo', JSON.stringify(todoList));
    addTodo.value = '';
})

todo.addEventListener('change', (e) => {
   let idInput= e.target.getAttribute('id');
   let forLabel = todo.querySelector('[for='+ idInput +']');
   let valueLabel = forLabel.innerHTML;

   todoList.forEach(item => {
    if (item.todo === valueLabel) {
        item.checked = !item.checked;
        localStorage.setItem('todo', JSON.stringify(todoList))
    }
   })
})

addTodo.addEventListener("change", (e) => {
    displayMessages()
});


todo.addEventListener("click", (e) => {
  const item = e.target.closest(".todo__list-item");

  const index = Array.from(todo.children).indexOf(item);

  if (e.target.className === "todo__container-remove") {
    const currentTodo = todo.querySelector(`li:nth-child(${index + 1})`);
    todo.removeChild(currentTodo);
    todoList.splice(index, 1);
  }
  localStorage.setItem('todo', JSON.stringify(todoList))
});


function setTitleTodo() {
    const translateTitle = {
        'en':'ToDoList',
        'ru':'Список дел'
    }
    TodoTitle.textContent = translateTitle[lang]
    }


    export {setTitleTodo};
    export default './todo.js'