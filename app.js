

const formAddTodo = document.querySelector('.form-add-todo');
const todosContainer = document.querySelector('.todos-container');
const inputSearchTodo = document.querySelector('.form-search input');
const alertForInvalidTodo = document.querySelector('.alert');

const setDataTrashIndex = () => {
  const trashIcon = document.querySelectorAll('.delete');

  Array.from(trashIcon)
    .forEach((icon, index) => icon.setAttribute('data-trash-index', index));
}

const getTodos = () => Array.from(todosContainer.children);

const checkForDuplicatedTodos = inputValue => getTodos().some(todo => todo.textContent.trim() === inputValue)

const insertTodo = text => {
  const li =
  `<li class="list-group-item justify-content-between align-items-center fadeOut">
    <span>${text}</span>
    <i data-trash-index="" class="far fa-trash-alt delete"></i>
  </li>`;

  todosContainer.insertAdjacentHTML('afterbegin', li);
  insertTodoEffect();
}

const insertTodoEffect = () => {
  const firstElementOfUl = document.querySelectorAll('li')[0];

  setTimeout(() => {
    firstElementOfUl.classList.add('fadeIn');
  }, 500);

  setTimeout(() => {
    firstElementOfUl.classList.remove('fadeOut', 'fadeIn');
  }, 1000);

  setDataTrashIndex();
}

const searchTodo = ({target}) => {
  const inputValue = target.value.trim().toLowerCase();
  const todos = getTodos();

  todos.forEach(todo => {
    const containsValue = todo.textContent.toLowerCase().includes(inputValue);

    if (containsValue) {
      todo.classList.remove('hidden');
      return;
    }

    todo.classList.add('hidden');
  });
}

const deleteTodo = index => {
  const li = document.querySelectorAll('li')[index];
  li.classList.add('fadeOut');

  setTimeout(() => {
    li.remove();
    setDataTrashIndex();
  }, 800);
}

setDataTrashIndex();

// LISTENERS
todosContainer.addEventListener('click', event => {
  const trashWasClicked = event.target.classList.contains('delete');

  if (trashWasClicked) {
    const dataTrashIndex = event.target.getAttribute('data-trash-index');
    deleteTodo(dataTrashIndex);
  }
});

inputSearchTodo.addEventListener('input', searchTodo);

formAddTodo.addEventListener('submit', event => {
  event.preventDefault();
  
  const inputValue = event.target.add.value.trim();
  const duplicateTodo = checkForDuplicatedTodos(inputValue);

  if (!duplicateTodo && inputValue.length) {
    insertTodo(inputValue);
    alertForInvalidTodo.classList.remove('fadeIn');
    alertForInvalidTodo.classList.add('fadeOut');
    event.target.reset();
    return;
  }

  setTimeout(() => {
    alertForInvalidTodo.classList.add('fadeIn');
    alertForInvalidTodo.classList.remove('fadeOut');
  }, 700);
});