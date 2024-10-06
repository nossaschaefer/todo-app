let ul = document.querySelector("ul");
let addBtn = document.querySelector("#addBtn");
let rmButton = document.querySelector("#rmButton");
let newTodo = document.querySelector("#add");
let allFilter = document.querySelector("#all");
let openFilter = document.querySelector("#open");
let doneFilter = document.querySelector("#done");

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Function to filter and render todos
function renderTodos() {
  ul.innerHTML = ""; // Clear the current list

  // Determine which filter is applied
  let filteredTodos = todos;
  if (openFilter.checked) {
    filteredTodos = todos.filter((todo) => !todo.done); // Show only open todos
  } else if (doneFilter.checked) {
    filteredTodos = todos.filter((todo) => todo.done); // Show only done todos
  }

  // Render the filtered todos
  filteredTodos.forEach((todo, index) => {
    let li = document.createElement("li");
    li.textContent = todo.text;

    // Create checkbox and set its checked status
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    // Event listener to update the done status when checkbox is clicked
    checkbox.addEventListener("change", function () {
      todos[index].done = checkbox.checked; // Update the done status in the todos array
      localStorage.setItem("todos", JSON.stringify(todos)); // Save updated array to localStorage
      renderTodos(); // Re-render the list
    });

    // Append elements to the DOM
    ul.appendChild(li);
    li.appendChild(checkbox);
  });
}

// Function to add a new todo
function addTodo() {
  let newTodoText = newTodo.value.trim();
  if (newTodoText !== "" && !todos.some((todo) => todo.text === newTodoText)) {
    todos.push({ text: newTodoText, done: false }); // Add the new todo to the array
    localStorage.setItem("todos", JSON.stringify(todos)); // Save to localStorage
    renderTodos(); // Re-render todos
    newTodo.value = ""; // Clear the input field
  } else if (newTodoText === "") {
    alert("Todo cannot be empty!");
  } else {
    alert("This todo already exists!");
  }
}

// Function to remove all done todos
function removeDoneTodos() {
  todos = todos.filter((todo) => !todo.done); // Filter out done todos
  localStorage.setItem("todos", JSON.stringify(todos)); // Update localStorage
  renderTodos(); // Re-render the todo list
}

// Event listeners for filter radio buttons
allFilter.addEventListener("change", renderTodos);
openFilter.addEventListener("change", renderTodos);
doneFilter.addEventListener("change", renderTodos);

// Add todo button listener
addBtn.addEventListener("click", addTodo);

// Add remove done todos button listener
rmButton.addEventListener("click", removeDoneTodos);

// Initial render of todos
renderTodos();
