// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory todo list
let todos = [
    { id: 1, text: 'Learn Docker', completed: false },
    { id: 2, text: 'Build a MERN app', completed: false },
    { id: 3, text: 'Deploy on Kubernetes', completed: false }
];

// Get all todos
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// Add a new todo
app.post('/api/todos', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    const newTodo = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        text,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));

    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    const deletedTodo = todos.splice(todoIndex, 1);
    res.json(deletedTodo[0]);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});