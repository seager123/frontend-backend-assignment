import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const { setIsAuth } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Logout
  const handleLogout = () => {
    setIsAuth(false);
    navigate("/login");
  };

  // Fetch tasks from backend on component mount
  useEffect(() => {
    axios.get("http://localhost:5000/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.error("Error fetching tasks:", err));
  }, []);

  // Add new task
  const addTask = () => {
    if (!title) return alert("Enter task title");

    axios.post("http://localhost:5000/tasks", { title })
      .then(res => {
        // MongoDB returns _id, so no need to modify
        setTasks([...tasks, res.data]);
        setTitle("");
      })
      .catch(err => console.error("Error adding task:", err));
  };

  // Delete task by _id
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(t => t._id !== id)))
      .catch(err => console.error("Error deleting task:", err));
  };

  return (
    <div className="dash-container">
      <div className="dash-box">
        <h1>Dashboard</h1>

        <button className="logout-btn" onClick={handleLogout}>Logout</button>

        {/* Task input */}
        <div className="task-input">
          <input
            type="text"
            placeholder="New task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>

        {/* Task list */}
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task._id}>
              <span>{task.title}</span>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
