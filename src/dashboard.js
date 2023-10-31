import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, toggleTaskStatus, updateTask } from "./taskSlice";
import TaskEditModal from "./editModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faPencilSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./allTasks.css";
import "./dashboard.css";

const DashboardComponent = ({navigate}) => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = (updatedTask) => {
    dispatch(updateTask({ updatedTask }));

    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    dispatch(removeTask({ taskId }));
  };

  const handleCheckboxChange = (taskId) => {
    dispatch(toggleTaskStatus({ taskId }));
  };

  const filteredTasks = tasks.filter((task) => !task.completed);
  const completeTasks = tasks.filter((task) => task.completed);

  return editingTask ? (
    <TaskEditModal
      task={editingTask}
      onUpdateTask={handleUpdateTask}
      onComplete={() => {handleCheckboxChange(editingTask.taskId);setEditingTask(null);}}
      onDelete={() => {handleDeleteTask(editingTask.taskId);setEditingTask(null);}}
      onClose={() => setEditingTask(null)}
    />
  )  : (
    <>
      <div className="divider-container">
        <div className="left-pane">
          <h1>Running Tasks</h1>
          {filteredTasks.slice(0, 4).map((task, index) => {
            return (
              <div className="tasks" key={index}>
                <div>
                  <div className="internal-lines">
                    <h5>{task.title}</h5>
                  </div>
                  <div className="internal-lines">
                    <h6>{`Start Date: ${task.startDate}`}</h6>
                  </div>
                  <div className="internal-lines">
                    {task.endDate ? (
                      <h6>{`End Date: ${task.endDate}`}</h6>
                    ) : null}
                  </div>
                  <div className="internal-lines">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleCheckboxChange(task.taskId)}
                    />
                    {task.completed ? "completed" : "Mark as completed"}
                  </div>
                </div>
                <div className="task-icons">
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <FontAwesomeIcon
                    icon={faPencilSquare}
                    onClick={() => handleEditTask(task)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDeleteTask(task.taskId)}
                  />
                </div>
              </div>
            );
          })}
          <button className="bottom-button" onClick={() => navigate("running")}>All Running Tasks</button>
        </div>
        <div className="vertical-line"></div>
        <div className="right-pane">
          <h1>Completed Tasks</h1>
          {completeTasks.slice(0, 4).map((task, index) => {
            return (
              <div className="tasks" key={index}>
                <div>
                  <div className="internal-lines">
                    <h5>{task.title}</h5>
                  </div>
                  <div className="internal-lines">
                    <h6>{`Start Date: ${task.startDate}`}</h6>
                  </div>
                  <div className="internal-lines">
                    {task.end_date ? (
                      <h6>{`End Date: ${task.end_date}`}</h6>
                    ) : null}
                  </div>
                  <div className="internal-lines">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleCheckboxChange(task.taskId)}
                    />
                    {task.completed ? "completed" : "Mark as completed"}
                  </div>
                </div>
                <div className="task-icons">
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <FontAwesomeIcon
                    icon={faPencilSquare}
                    onClick={() => handleEditTask(task)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDeleteTask(task.taskId)}
                  />
                </div>
              </div>
            );
          })}
          <button className="bottom-button" onClick={() => navigate("complete")}>All Completed Tasks</button>
        </div>
      </div>
    </>
  );
};

export default DashboardComponent;
