const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("client"));

let todos = [];
let id = 1;

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Add todo
app.post("/todos", (req, res) => {
  const { text } = req.body;
  todos.push({ id: id++, text });
  res.json({ message: "Todo added" });
});

// Update todo
app.put("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const { text } = req.body;

  const todo = todos.find(t => t.id === todoId);
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  todo.text = text;
  res.json({ message: "Todo updated" });
});

// Delete todo
app.delete("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== todoId);
  res.json({ message: "Todo deleted" });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
