import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

import Parse from 'parse';

Parse.initialize('myAppId')
Parse.serverURL = 'http://localhost:3000/api';

let Todo = Parse.Object.extend('Todo');

function TodoApp() {
  return (
    <section>
      <TodoCreateForm />
      <TodoList />
    </section>
  )
}

function TodoCreateForm() {
  let [text, setText] = useState('');

  let [status, createTodo] = useActionCallback((text) => {
    let todo = new Todo({ text });
    setText('');
    return todo.save();
  }, []);

  return (
    <div>
      <input type="text" value={text} onChange={event => setText(event.target.value)} />
      <button onClick={() => createTodo(text)}>create</button>
      {status === 'pending' ? <span>Creating…</span> : null}
    </div>
  )
}

function useActionCallback(cb, input) {
  let [status, setStatus] = useState('idle');

  let action = useCallback((...args) => {
    setStatus('pending')
    Promise.resolve(cb(...args))
      .then(result => setStatus('success'))
      .catch(error => setStatus('failure'));
  }, [...input]);

  return [status, action];
}

function TodoList() {
  let [todos, setTodos] = useState([]);

  useEffect(() => {
    let query = new Parse.Query(Todo);
    query.find().then(results => setTodos(results));
  }, []);

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.get('text')}</li>
      ))}
    </ul>
  )
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));
