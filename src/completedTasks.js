// AllTasks.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, toggleTaskStatus, updateTask } from "./taskSlice";
import TaskEditModal from "./editModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faPencilSquare,
  faSort,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./allTasks.css";
import { Container, Row, Col } from "react-bootstrap";

const CompletedTasks = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [visibleTasks, setVisibleTasks] = useState(6);
  const [sortBy, setSortBy] = useState("category"); // Default sort by category
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = (updatedTask) => {
    dispatch(updateTask({ updatedTask }));
    
    setEditingTask(null);
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    ).filter((task) => task.completed)
    .sort((a, b) => {
      if (sortBy === "category") {
        return a.category.localeCompare(b.category);
      } else if (sortBy === "priority") {
        if (a.priority == "low") {
          if (b.priority == "high" || "medium") {
            return 1;
          } else {
            return 0;
          }
        } else if (a.priority == "medium") {
          if (b.priority == "high") {
            return 1;
          } else if (b.priority == "low") {
            return -1;
          } else {
            return 0;
          }
        } else {
          return -1;
        }
      } else if (sortBy === "status") {
        if (a.completed == true && b.completed == false) {
          return -1;
        } else if (a.completed == false && b.completed == true) {
          return 1;
        } else {
          return 0;
        }
      }
      return 0;
    });

  const loadMoreTasks = () => {
    setVisibleTasks(visibleTasks + 6);
  };

  const handleDeleteTask = (taskId) => {
    dispatch(removeTask({ taskId }));
  };

  const handleCheckboxChange = (taskId) => {
    dispatch(toggleTaskStatus({ taskId }));
  };

  return (
    <div className="all-tasks-container">
      {editingTask ? (
        <TaskEditModal
          task={editingTask}
          onUpdateTask={handleUpdateTask}
          onComplete={() => {handleCheckboxChange(editingTask.taskId);setEditingTask(null);}}
          onDelete={() => {handleDeleteTask(editingTask.taskId);setEditingTask(null);}}
          onClose={() => setEditingTask(null)}
        />
      ) : (
        <Container>
          <Row>
            <Col xs={{ span: 8, offset: 2 }}>
              <div className="page-title">
                <h1>Completed Tasks</h1>
              </div>
            </Col>
          </Row>
          <Row style={{ padding: "15px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <button
                  className={`filter-button${
                    sortBy === "category" ? "-selected" : ""
                  }`}
                  onClick={() => setSortBy("category")}
                >
                  By category <FontAwesomeIcon icon={faSort} />
                </button>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="filter-bar"
                />
              </div>
            </div>
          </Row>
          {filteredTasks.slice(0, visibleTasks).map((task, index) => {
            return index % 2 == 0 ? (
              <Row key={index} style={{ padding: "15px" }}>
                <Col xs={12} lg={6}>
                  <div className="tasks">
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
                </Col>
                {index != filteredTasks.length - 1 ? (
                  <Col xs={12} lg={6}>
                    <div className="tasks">
                      <div>
                        <div className="internal-lines">
                          <h5>{filteredTasks[index + 1].title}</h5>
                        </div>
                        <div className="internal-lines">
                          <h6>{`Start Date: ${
                            filteredTasks[index + 1].startDate
                          }`}</h6>
                        </div>
                        <div className="internal-lines">
                          {filteredTasks[index + 1].end_date ? (
                            <h6>{`End Date: ${
                              filteredTasks[index + 1].end_date
                            }`}</h6>
                          ) : null}
                        </div>
                        <div className="internal-lines">
                          <input
                            type="checkbox"
                            checked={filteredTasks[index + 1].completed}
                            onChange={() =>
                              handleCheckboxChange(
                                filteredTasks[index + 1].taskId
                              )
                            }
                          />
                          {filteredTasks[index + 1].completed
                            ? "completed"
                            : "Mark as completed"}
                        </div>
                      </div>
                      <div className="task-icons">
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <FontAwesomeIcon
                          icon={faPencilSquare}
                          onClick={() =>
                            handleEditTask(filteredTasks[index + 1])
                          }
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() =>
                            handleDeleteTask(filteredTasks[index + 1].taskId)
                          }
                        />
                      </div>
                    </div>
                  </Col>
                ) : null}
              </Row>
            ) : null;
          })}
        </Container>
      )}
      {visibleTasks < filteredTasks.length && (
        <button onClick={loadMoreTasks}>Load More</button>
      )}
    </div>
  );
};

export default CompletedTasks;
