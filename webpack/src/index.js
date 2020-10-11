import './style.css';
import './style.scss';
import uniqid from 'uniqid';

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const list = document.querySelector('.list');
const btnReset = document.querySelector('.btn-reset');

class ToDoForm {
  todos = [];

  addToDo(text) {
    const todo = {
      text,
      id: uniqid(),
      done: true,
    };

    this.todos.push(todo);
    localStorage.setItem('Todos', JSON.stringify(this.todos));
    return todo;
  }

  deleteToDo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
const todoList = new ToDoForm();

const createLi = ({ text, id }) => {
  const liElement = document.createElement('li');
  liElement.classList.add('list-li');
  liElement.innerHTML = text;
  liElement.id = id;

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = 'Delete';
  deleteBtn.classList.add('btn-delete');
  deleteBtn.addEventListener('click', () => {
    todoList.deleteToDo(id);
    document.getElementById(id).remove();
  });

  liElement.appendChild(deleteBtn);
  return liElement;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  list.classList.add('list');
  const todo = todoList.addToDo(input.value);
  const li = createLi(todo);
  list.insertAdjacentElement('beforeend', li);
});

btnReset.addEventListener('click', () => {
  list.innerHTML = '';
});