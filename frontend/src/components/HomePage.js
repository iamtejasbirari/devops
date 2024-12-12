import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      try {
        const response = await axios.post('http://localhost:5000/api/todos', {
          text: inputValue,
        });
        const newTodo = response.data;
        setTodos([...todos, newTodo]);
        setInputValue('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id)); // Changed _id to id
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>To-Do</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task"
            style={{ flex: 1, padding: '8px' }}
          />
          <button type="submit" style={{ padding: '8px 16px' }}>Add</button>
        </div>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id} // Changed _id to id
            style={{
              padding: '10px',
              borderBottom: '1px solid #eee',
              marginBottom: '5px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {todo.text}
            <button
              onClick={() => handleDelete(todo.id)} // Changed _id to id
              style={{ padding: '4px 8px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
