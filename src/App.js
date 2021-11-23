import React, { useEffect, useState } from 'react';
import Header from "./Header";
import ToDoList from "./ToDoList";
import ToDoForm from './ToDoForm';
import './App.css';

function App() {
  
  const [ toDoList, setToDoList ] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9000/todos')
    .then(response => response.json())
    .then(data => setToDoList(data));
  }, [])

  const handleToggle = async (id, isComplete) => {
    await fetch(`http://localhost:9000/todos/mark/complete/${id}?is_complete=${isComplete}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(data => setToDoList(toDoList.map(task => task.id === Number(id)
      ? { ...task, is_complete: !task.is_complete }
      : task
    )));
  }

  const handleFilter = async () => {
    await fetch(`http://localhost:9000/todos/deleteCompleted`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(data => setToDoList(toDoList.filter(task => {
           return !task.complete;
         })));
  }

  const addTask = async (userInput) => {
    const dataTodo = {name: userInput, is_complete: false}
    await fetch('http://localhost:9000/todos/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataTodo)
    })
    .then(res => res.json())
    .then(data => setToDoList([...toDoList, dataTodo]));
  }

  return (
    <div className="App">
      <Header />
      <ToDoList toDoList={toDoList} handleToggle={handleToggle} handleFilter={handleFilter}/>
      <ToDoForm addTask={addTask}/>
    </div>
  );
}

export default App;
