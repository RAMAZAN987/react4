import React, { useState } from 'react';
import './App.css'
const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);

  let ul = document.getElementsByTagName('ul')
  let li = ul.value

  const todokey = 'todolist'
  const i = 'i'

  const saveTask = (item) => {
    localStorage.setItem(todokey, JSON.stringify(item))
}

const loading = () => {
  const savelist = localStorage.getItem(todokey)
  return savelist ? JSON.parse(savelist) : []
} 

  const handleAddTask = () => {
    if (newTask) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
    let todolist = loading()
    todolist.push(newTask)
    saveTask(todolist)
  };

}
window.addEventListener('load', displaysSavedTask)

  const handleEditTask = (index) => {
    setEditingTask(index);
    setNewTask(tasks[index]);
  };

  const handleSaveTask = () => {
    if (newTask) {
      const updatedTasks = [...tasks];
      updatedTasks[editingTask] = newTask;
      setTasks(updatedTasks);
      setEditingTask(null);
      setNewTask('');
    }
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleMarkComplete = (index) => {
    const updatedTasks = [...tasks];
    const completedTask = updatedTasks.splice(index, 1)[0];
    setTasks(updatedTasks);
    setCompletedTasks([...completedTasks, completedTask]);
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleRemoveCompletedTask = (index) => {
    const updatedCompletedTasks = [...completedTasks];
    updatedCompletedTasks.splice(index, 1);
    setCompletedTasks(updatedCompletedTasks);
  };

  return (
    <div>
      <h1>To Do list</h1>
      <input type="text" value={newTask} onChange={handleInputChange} className='addInput' />
      <button onClick={handleAddTask} className='add'>&#9745;</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className='li'>
            {editingTask === index ? (
              <input type="text" value={newTask} onChange={handleInputChange} />
            ) : (
              task
            )}
            {editingTask === index ? (
              <button onClick={handleSaveTask}>&#9745;</button>
            ) : (
              <div className='btnblock'>
                <button onClick={() => handleMarkComplete(index)}>&#10004;</button>
                <button onClick={() => handleEditTask(index)}>	&#9998; </button>
                <button onClick={() => handleRemoveTask(index)}>	&#10006;</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <h2>Completed Tasks</h2>
      <ul>
        {completedTasks.map((task, index) => (
          <li key={index} className='li2'>
            {task}
            <button onClick={() => handleRemoveCompletedTask(index)}>
						&#10006;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  return <TodoList />;
}

export default App;

