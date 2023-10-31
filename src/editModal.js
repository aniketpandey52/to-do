import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

import "./editModal.css";

const TaskEditModal = ({
  task,
  onUpdateTask,
  onComplete,
  onDelete,
  onClose,
}) => {
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleInputChange = (e) => {
    console.log(e.target.value, e.target.name);
    const { name, value } = e.target;
    setUpdatedTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateTask = () => {
    onUpdateTask(updatedTask);
  };

  return (
    <Container style={{ padding: "10px 60px" }}>
      <FontAwesomeIcon
        icon={faWindowClose}
        onClick={onClose}
        style={{ color: "#006D77" }}
      />
      <form onSubmit={handleUpdateTask}>
        <Row>
          <Col xs={12} lg={6}>
            <div className="form-items">
              <div className="labels">Task Title</div>
              <input
                type="text"
                value={updatedTask.title}
                onChange={handleInputChange}
                name="title"
                className="inputs"
                required
              />
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className="form-items">
              <div>Start Date</div>
              <input
                type="date"
                value={updatedTask.startDate}
                required
                className="inputs"
                onChange={handleInputChange}
                name="start_date"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6}>
            <div className="form-items">
              <div>End Date</div>
              <input
                type="date"
                value={updatedTask.endDate}
                className="inputs"
                onChange={handleInputChange}
                name="end_date"
              />
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className="form-items">
              <div>Priority level</div>
              <select
                value={updatedTask.priority}
                onChange={handleInputChange}
                name="priority"
                required
                className="inputs"
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6}>
            <div className="form-items">
              <div>Category</div>
              <select
                value={updatedTask.category}
                onChange={handleInputChange}
                name="category"
                required
                className="inputs"
              >
                <option value="">Select Category</option>
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={12}>
            <div className="form-items">
              <div>Description</div>
              <textarea
                value={updatedTask.description}
                onChange={handleInputChange}
                name="description"
                placeholder="Write important notes"
                className="inputs"
                style={{ height: "100px" }}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <button type="submit" className="submit-button">
              Confirm Edit
            </button>
          </Col>
        </Row>
      </form>
      <Row>
        <Col xs={3}>
          <button type="submit" className="submit-button" onClick={onComplete}>
            Mark as {updatedTask.completed ? "incomplete" : "complete"}
          </button>
        </Col>
        <Col xs={3}>
          <button type="submit" className="submit-button" onClick={onDelete}>
            Delete
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskEditModal;
