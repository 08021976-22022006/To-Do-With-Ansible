async function loadTodos() {
  const res = await fetch("/todos");
  const todos = await res.json();

  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${todo.text}</span>
      <div class="actions">
        <button onclick="editTodo(${todo.id}, '${todo.text}')">Edit</button>
        <button onclick="deleteTodo(${todo.id})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });
}

async function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();

  if (!text) return;

  await fetch("/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });

  input.value = "";
  loadTodos();
}

async function editTodo(id, oldText) {
  const newText = prompt("Edit task:", oldText);

  if (!newText || newText.trim() === "") return;

  await fetch(`/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: newText.trim() })
  });

  loadTodos();
}

async function deleteTodo(id) {
  await fetch(`/todos/${id}`, {
    method: "DELETE"
  });

  loadTodos();
}

// Load todos on page load
loadTodos();
