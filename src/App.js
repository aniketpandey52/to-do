import React, { useState } from "react";
import { Provider } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faUserCircle,
  faMoon,
  faBars,
  faTachometer,
  faThLarge,
  faCheckCircle,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css"; // Import your custom CSS file for styling
import TaskForm from "./taskForm";
import AllTasks from "./allTasks";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import CompletedTasks from "./completedTasks";
import DashboardComponent from "./dashboard";
import RunningTasks from "./runningTasks";

const App = () => {
  const [showTaskForm, setShowTaskForm] = useState("all");

  return (
    <Provider store={store}>
      <div className="app-container">
        {/* Title Bar */}
        <div className="title-bar">
          <div style={{ color: "#006D77" }}>
            <FontAwesomeIcon icon={faBars} className="icon" />
          </div>
          <div className="icons">
            <FontAwesomeIcon icon={faBell} className="icon" />
            <FontAwesomeIcon icon={faMoon} className="icon" />
            <FontAwesomeIcon icon={faUserCircle} className="icon" />
          </div>
        </div>
        {/* Navigation Panel */}
        <div className="content-container">
          <div className="nav-panel">
            <ul className="nav-list">
              <li className="nav-list-items">
                <FontAwesomeIcon icon={faTachometer} className="body-icon" />
                <span onClick={(event) => setShowTaskForm("dashboard")}>
                  Dashboard
                </span>
              </li>
              <li className="nav-list-items">
                <FontAwesomeIcon icon={faThLarge} className="body-icon" />
                <span onClick={(event) => setShowTaskForm("all")}>
                  All Tasks
                </span>
              </li>
              <li className="nav-list-items">
                <FontAwesomeIcon icon={faCheckCircle} className="body-icon" />
                <span onClick={(event) => setShowTaskForm("complete")}>
                  Completed Tasks
                </span>
              </li>
              <li className="nav-list-items">
                <FontAwesomeIcon icon={faPlusCircle} className="body-icon" />
                <span onClick={(event) => setShowTaskForm("add")}>
                  Add a Task
                </span>
              </li>
            </ul>
          </div>
          {/* Content Area */}
          <div className="content">
            {(() => {
              console.log(showTaskForm);
              switch (showTaskForm) {
                case "all":
                  return <AllTasks />;
                case "add":
                  return <TaskForm />;
                case "complete":
                  return <CompletedTasks />;
                case "dashboard":
                  return <DashboardComponent navigate={setShowTaskForm}/>;
                case "running":
                  return <RunningTasks />;
                default:
                  return <AllTasks />; // Handle default case if necessary
              }
            })()}
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
