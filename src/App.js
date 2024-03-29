import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import UpdateTaskForm from './components/UpdateTaskForm';
import NewTaskForm from './components/NewTaskForm';
import "./components/style.css";
import "./App.css"


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Task Flow</h1>
        </header>

        {/* Main content section */}
        <main className="App-main">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/update/:taskId" element={<UpdateTaskForm />} />
            <Route path="/new-task" element={<NewTaskForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
