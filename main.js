'use strict';

const todoForm = document.querySelector('#todo__form');
const todoInput = document.querySelector('#todo__input');
const todoBtn = document.querySelector('.todo__plus');

const todoList = document.querySelector('#todo__lists');
let todos = [];


    
const savedTodos = localStorage.getItem('todos')

const parsedTodos = JSON.parse(savedTodos);

if(savedTodos !== null){
parsedTodos.forEach((todo)=> paintTodo(todo));
todos = parsedTodos;
}


function saveTodo(){
    localStorage.setItem('todos', JSON.stringify(todos))
    

}


function deleteTodo(event){
    const list = event.target.parentNode;
    list.remove();
    todos = todos.filter((todo)=>
        todo.id !== parseInt(list.id)
    )
    saveTodo();


}
function paintTodo(newTodo){
    const li = document.createElement('li');
    li.id = newTodo.id;
    const span = document.createElement('span');
    span.innerText = newTodo.name;

    const button = document.createElement('button');
    button.innerText = '🗑';
    button.style.all = 'unset';
    button.addEventListener('click', deleteTodo);
  

    todoList.appendChild(li);
    li.appendChild(span);
    li.appendChild(button);

}

todoBtn.addEventListener('click', ()=>{
    
    const newTodo = todoInput.value;
    const newTodoObj = {name : newTodo,
        id : Date.now()};
    paintTodo(newTodoObj)
    todoInput.value = "";
})


todoForm.addEventListener('submit' ,(event)=>{
    event.preventDefault();
    
    const newTodo = todoInput.value;
    const newTodoObj = {name : newTodo,
                        id : Date.now()};
    todoInput.value ="";
    paintTodo(newTodoObj);
    todos.push(newTodoObj);
    saveTodo();
   
})