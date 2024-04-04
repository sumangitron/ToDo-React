import { useState } from "react";
import "./app.css";

let id = 0;

function App() {
  const[inputValue, setInputValue] = useState("");
  const[task, setTask] = useState([]);
  const[editingTaskId, setEditingTaskId] = useState(null);

  const addTodo = () => {
    if(editingTaskId) {
      task.forEach((task) => {
        if(task.id === editingTaskId) {
          task.title = inputValue;
        }
      })

      setTask([...task]);
      setEditingTaskId(null);
      setInputValue("");
    }
    else {
      setTask([...task, {title: inputValue, id: ++id}]);
      setInputValue("");
    }
    
  }

  const deleteTask = (taskId) => {
    let remainigTask = task.filter((task) => task.id !== taskId);
    setTask(remainigTask);
  }

  const onEdit = (taskId) => {
    let {title} = task.find((task) => task.id === taskId);
    setInputValue(title);
    setEditingTaskId(taskId);
  }

  return (
    <div className="container">
      <div className="input-box">
        <input type="text" placeholder="enter task" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={addTodo}>{editingTaskId ? "Edit task" : "Add task"}</button>
      </div>
      <hr />
      {
        task.map((task) => {
          return (
            <div className={`task-box ${task.id === editingTaskId ? "active" : ""}`}>
              <div>
                <span>{task.id}. </span>
                <span>{task.title}</span>
              </div>
              <div>
              <button className="editBtn" onClick={() => onEdit(task.id)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}


export default App
