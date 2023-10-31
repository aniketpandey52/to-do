import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "./taskSlice";
import { Container, Row, Col } from "react-bootstrap";
import "./taskForm.css";

const TaskForm = () => {
  const dispatch = useDispatch();

  const [taskDetails, setTaskDetails] = useState({
    title: "",
    startDate: "",
    priority: "",
    category: "",
    completed: false,
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the createTask action with taskDetails
    dispatch(createTask(taskDetails));
    
    // Reset the form fields after creating the task
    // setTaskDetails({
    //   title: "",
    //   startDate: "",
    //   priority: "",
    //   category: "",
    //   completed: false,
    //   description: "",
    // });
  };

  return (
    <Container style={{ padding: "10px 60px" }}>
      <form onSubmit={handleSubmit}>
        <Row>
          <div className="page-title">
            <h1>Create your task</h1>
          </div>
        </Row>
        <Row>
          <Col xs={12} lg={6}>
            <div className="form-items">
              <div>Task Title</div>
              <input
                type="text"
                value={taskDetails.title}
                onChange={(e) =>
                  setTaskDetails({ ...taskDetails, title: e.target.value })
                }
                className="inputs"
                // style={{backgroundColor: "#ffddd2"}}
                required
              />
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className="form-items">
              <div>Start Date</div>
              <input
                type="date"
                value={taskDetails.startDate}
                required
                className="inputs"
                onChange={(e) =>
                  setTaskDetails({ ...taskDetails, startDate: e.target.value })
                }
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6}>
            <div className="form-items">
              <div>Priority level</div>
              <select
                value={taskDetails.priority}
                onChange={(e) =>
                  setTaskDetails({ ...taskDetails, priority: e.target.value })
                }
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
          <Col xs={12} lg={6}>
            <div className="form-items">
              <div>Category</div>
              <select
                value={taskDetails.category}
                onChange={(e) =>
                  setTaskDetails({ ...taskDetails, category: e.target.value })
                }
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
                value={taskDetails.description}
                onChange={(e) =>
                  setTaskDetails({
                    ...taskDetails,
                    description: e.target.value,
                  })
                }
                placeholder="Write important notes"
                className="inputs"
                style={{height: "100px"}}
              />
            </div>
          </Col>
        </Row>
        <button type="submit" className="create-button">Add to list</button>
      </form>
    </Container>
  );
};

export default TaskForm;
