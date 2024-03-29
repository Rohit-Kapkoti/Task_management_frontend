import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiCalls from "../api/apiCalls";
import "./style.css";
import { FaFilter, FaSort } from "react-icons/fa";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [openCatDropdown, setOpenCatDropdown] = useState(false);
  const [openPrioDropdown, setOpenPrioDropdown] = useState(false);
  const [filterByCategory, setFilterByCategory] = useState(null);
  const [filterByPriority, setFilterByPriority] = useState(null);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    const applyFilters = (fetchedTasks) => {
      let filteredTasks = fetchedTasks;
      if (filterByCategory) {
        filteredTasks = filteredTasks.filter(
          (task) => task.category === filterByCategory
        );
      }
      if (filterByPriority) {
        filteredTasks = filteredTasks.filter(
          (task) => task.priority === filterByPriority
        );
      }
      setTasks(filteredTasks);
    };
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await apiCalls.fetchTasks();
        const uniqueCategories = [
          ...new Set(fetchedTasks.map((task) => task.category)),
        ];
        const uniquePriorities = [
          ...new Set(fetchedTasks.map((task) => task.priority)),
        ];

        setCategories(uniqueCategories);
        setPriorities(uniquePriorities);
        applyFilters(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [filterByCategory, filterByPriority]);

  const handleFilterByCategory = (category) => {
    setFilterByCategory(category);
    setFilterByPriority(null);
  };

  const handleFilterByPriority = (priority) => {
    if (priority === filterByPriority) {
      setFilterByPriority(null);
    } else {
      setFilterByPriority(priority);
      setFilterByCategory(null);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await apiCalls.deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleSort = (key) => {
    if (sortBy === key) {
      setTasks([...tasks].reverse());
    } else {
      setTasks([...tasks].sort((a, b) => (a[key] > b[key] ? 1 : -1)));
      setSortBy(key);
    }
  };

  const getColor = (priority) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "green";
      default:
        return "black";
    }
  };

  return (
    <div className="TaskList-container">
      <div className="TaskList-header">
        <span className="tasklist">Task List</span>
        <Link to="/new-task" className="update-btn">
          Create new task
        </Link>
      </div>
      <table className="TaskList">
        <thead>
          <tr>
            <th>
              <div className="title">
                Title{" "}
                <FaSort
                  size={16}
                  onClick={() => handleSort("title")}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </th>
            <th>
              <div className="description">Description</div>
            </th>
            <th>
              <div className="category">
                Category
                <FaSort
                  size={16}
                  onClick={() => handleSort("category")}
                  style={{ cursor: "pointer" }}
                />
                <FaFilter
                  onClick={() => setOpenCatDropdown(!openCatDropdown)}
                  style={{ cursor: "pointer" }}
                />
                {openCatDropdown && (
                  <div className="dropdown">
                    {categories.map((category) => (
                      <span
                        key={category}
                        onClick={() => handleFilterByCategory(category)}
                        className="dropdown-option"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </th>
            <th>
              <div className="priority">
                Priority
                <FaSort
                  size={16}
                  onClick={() => handleSort("priority")}
                  style={{ cursor: "pointer" }}
                />
                <FaFilter
                  onClick={() => setOpenPrioDropdown(!openPrioDropdown)}
                  style={{ cursor: "pointer" }}
                />
                {openPrioDropdown && (
                  <div className="dropdown">
                    {priorities.map((priority) => (
                      <span
                        key={priority}
                        onClick={() => handleFilterByPriority(priority)}
                        className="dropdown-option"
                      >
                        {priority}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </th>
            <th>
              <div className="actions">Actions</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.category}</td>
              <td>
                {" "}
                <div
                  style={{ backgroundColor: getColor(task.priority) }}
                  className="priorities"
                >
                  {task.priority}
                </div>
              </td>
              <td className="Table-data">
                <Link to={`/update/${task._id}`} className="update-btn">
                  Update
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
