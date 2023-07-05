const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

// Parse the JSON since we store objects
const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

// Prevent the form from performing default
form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

// Add the todo element
function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  // Make sure todoText exists
  if (todoText) {
    const todoEl = document.createElement("li");
    // Check if todo and completed exist
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }

    todoEl.innerText = todoText;

    // We want to toggle completeted
    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      updateLS();
    });

    // Check right click and make sure it does not open default
    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      // Remove the element
      todoEl.remove();
      updateLS();
    });

    // Add to the ul
    todosUL.appendChild(todoEl);

    input.value = "";

    updateLS();
  }
}

// Update the local storage
function updateLS() {
  todosEl = document.querySelectorAll("li");

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });

  // Save an object to the local storage (Must stringify objects)
  localStorage.setItem("todos", JSON.stringify(todos));
}
