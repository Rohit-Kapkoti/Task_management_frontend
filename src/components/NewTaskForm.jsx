import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiCalls from "../api/apiCalls";
import "./style.css";

const NewTaskForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiCalls.createTask(formData);
      navigate("/");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="Form-container">
      <div className="Form-header">Create New Task</div>
      <form onSubmit={handleSubmit} className="form">
        <div className="Form-field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="Form-field">
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></input>
        </div>
        <div className="Form-field">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div className="Form-field">
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
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
          Create Task
        </button>
      </form>
    </div>
  );
};

export default NewTaskForm;
