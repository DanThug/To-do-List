const form = document.querySelector('.form-add-todo');
const ul = document.querySelector('.todos-container');
const inputSearchTodo = document.querySelector('.form-search input');
const alert = document.querySelector('.alert');

const setDataTrashIndex = () => {
  const trashIcon = document.querySelectorAll('.delete');

  Array.from(trashIcon)
    .forEach((icon, index) => icon.setAttribute('data-trash-index', index));
}

const todosInArray = () => Array.from(ul.children);

const todoAlreadyExists = inputValue => todosInArray().some(todo => todo.textContent.trim() === inputValue)

const insertTodo = text => {
  const li =
  `<li class="list-group-item justify-content-between align-items-center fadeOut">
    <span>${text}</span>
    <i data-trash-index="" class="far fa-trash-alt delete"></i>
  </li>`;

  ul.insertAdjacentHTML('afterbegin', li);
  setTimeout(() => {
    const firstElementOfLi = document.querySelectorAll('li')[0];
    setDataTrashIndex();
    firstElementOfLi.classList.add('fadeIn');
    firstElementOfLi.classList.remove('fadeOut', 'fadeIn');
  }, 700);
}

const searchTodo = value => {
  const inputValue = value.trim().toLowerCase();
  const todos = todosInArray();

  todos.forEach(todo => {
    const containsValue = todo.textContent.toLocaleLowerCase().includes(inputValue);

    if (containsValue) {
      todo.classList.remove('hidden')
    }else{
      todo.classList.add('hidden')
    }
  });
}

deleteTodo = index => {
  const li = document.querySelectorAll('li')[index];
  li.classList.add('fadeOut');

  setTimeout(() => {
    li.remove();
    setDataTrashIndex();
  }, 700);
}

setDataTrashIndex();

// LISTENERS
ul.addEventListener('click', event => {
  const trashClicked = event.target.classList.contains('delete');

  if (trashClicked) {
    const dataTrashIndex = event.target.getAttribute('data-trash-index');
    deleteTodo(dataTrashIndex);
  }
});

inputSearchTodo.addEventListener('input', event => {
  searchTodo(event.target.value);
});

form.addEventListener('submit', event => {
  event.preventDefault();
  
  const inputValue = event.target.add.value.trim();
  const duplicateTodo = todoAlreadyExists(inputValue);

  if (!duplicateTodo && inputValue.length) {
    insertTodo(inputValue);
    alert.classList.add('fadeOut');
    alert.classList.remove('fadeIn');
  }else{
    setTimeout(() => {
      alert.classList.add('fadeIn');
      alert.classList.remove('fadeOut', 'hidden');
    }, 700);
  }


  event.target.reset();
});