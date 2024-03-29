import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiCalls from "../api/apiCalls";
import "./style.css";

const UpdateTaskForm = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
    category: "",
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedTask = await apiCalls.fetchTaskById(taskId);
        setTask(fetchedTask);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await apiCalls.updateTask(taskId, task);
      navigate("/");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <div className="Form-container">
      <div className="Form-header">Update Task</div>
      <form onSubmit={handleSubmit} className="form">
        <div className="Form-field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
        </div>
        <div className="Form-field">
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
          ></input>
        </div>
        <div className="Form-field">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={task.category}
            onChange={handleChange}
          />
        </div>
        <div className="Form-field">
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
          >
            <option className="option" value="">
              Select Priority
            </option>
            <option className="option" value="Low">
              Low
            </option>
            <option className="option" value="Medium">
              Medium
            </option>
            <option className="option" value="High">
              High
            </option>
          </select>
        </div>

        <button type="submit" className="update-btn">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTaskForm;
