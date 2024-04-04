// import React, {useState} from 'react'

// function App() {
//   const [value, setValue] = useState("");

//   const handlechange = (event) => {
//     setValue(event.target.value)
// }
//   return(
//     <div>
//       <input type='text' value={value} onChange={handlechange}></input>
//     </div>
//   )
// }

// export default App;

import React, { useState } from 'react'
const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null)
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask) {
      setTasks([...tasks, newTask])
      setNewTask("")
    }
  }

  const handleEditTask = (index) => {
    setEditingTask(index);
    setNewTask(tasks[index]);
  }

  const handleSaveTask = () => {
    if (newTask) {
      const updateTasks = [...tasks]
      updateTasks[editingTask] = newTask;
      setTasks(updateTasks);
      setEditingTask(null);
      setNewTask("");
    }
  }

  const handleDeliteTask = (index) => {
    const updateTasks = [...tasks]
    updateTasks.splice(index, 1)
    setTasks(updateTasks)
  }

  const handleInputChange = (event) => {
    setNewTask(event.target.value)
  }

  return (
    <div>
      <h1>To Do List</h1>
      <ul>
        {
          tasks.map((task, index) => (
            <li key={index}>
              {editingTask === index ? (
                <input type='text' value={newTask} onChange={handleInputChange} />
              ) : (
                task
              )}
              {
                editingTask === index ? (
                  <button onClick={handleSaveTask}>Save Task</button>
                ) : (
                  <>
                  <button onClick={() => handleEditTask(index)}>Change</button>
                  <button onClick={() => handleDeliteTask(index)}>Delete</button>
                  </>
                )
              }
              
            </li>

          ))
        }
      </ul>
      <input type="text" value={newTask} onChange={handleInputChange} />
      <button onClick={handleAddTask}>Add</button>
    </div>
  )
}



function App() {
  return <TodoList />
}

export default App

