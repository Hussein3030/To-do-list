import React, {useEffect, useState} from 'react';
import {Form, Modal} from 'react-bootstrap';
import axios from 'axios';
import {motion} from 'framer-motion';

const svgVariants = {
  hidden: {rotate: -180},
  visible: {
    rotate: 0,
    transition: {duration: 1},
  },
};

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 2,
      ease: 'easeInOut',
    },
  },
};

const EditTask = ({modal, toggle, updateTask, taskObject}) => {

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  axios.defaults.withCredentials = true;

  useEffect(() => {
    console.log(taskObject.id);
    setTaskTitle(taskObject.Title);
    setTaskDate(taskObject.Date);
    setTaskDescription(taskObject.Description);
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    let tempobj = {};
    tempobj['Title'] = taskTitle;
    tempobj['Date'] = taskDate;
    tempobj['Description'] = taskDescription;
    let taskss = axios.post('http://localhost:5000/UpdateData', {
      title: taskTitle,
      id: taskObject.id,
      date: taskDate,
      description: taskDescription,
      //userId: Math.random().toString(36).slice(2);

    }, {
      headers: {Authorization: 'Bearer: ' + localStorage.getItem('Token')},
    });
    toggle();
    window.location.reload();
  };

  return (
      <>
        <Modal show={modal} onHide={toggle}>
          <Modal.Header closeButton>

            <motion.svg xmlns="http://www.w3.org/2000/svg" width="26"
                        height="26" fill="currentColor"
                        class="bi bi-pencil-square" viewBox="0 0 16 16"
                        variants={svgVariants}
                        initial="hidden"
                        animate="visible"
            >
              <motion.path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                  variants={pathVariants}
              />
              <motion.path
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  variants={pathVariants}
              />
            </motion.svg>

            <Modal.Title id="example-modal-sizes-title-lg">
              Update Task
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <motion.div initial="hidden" animate="visible" variants={{
                hidden: {
                  scale: .8,
                  opacity: 0,
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: {
                    delay: .4,
                  },
                },
              }}>
                <Form.Group>
                  <Form.Label>Task name</Form.Label>
                  <Form.Control
                      type="text"
                      name="taskName"
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Task Date</Form.Label>
                  <Form.Control
                      type="date"
                      name="taskDate"
                      value={taskDate}
                      onChange={(e) => setTaskDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Task Description</Form.Label>
                  <Form.Control
                      as="textarea"
                      name="taskDescription"
                      rows={5}
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.target.value)}
                  />
                </Form.Group>
              </motion.div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <motion.button id="button2" variant="primary" onClick={handleUpdate}
                           whileHover={{
                             scale: 1.1,
                             textShadow: '0px 0px 8px rgb(255,255,255)',
                             boxShadow: '0px 0px 8px rgb(255,255,255)',

                           }}
            >
              Update
            </motion.button>
            <motion.button id="cancelbutton" variant="danger" onClick={toggle}
                           whileHover={{
                             scale: 1.1,
                             textShadow: '0px 0px 8px rgb(255,255,255)',
                             boxShadow: '0px 0px 8px rgb(255,255,255)',

                           }}
            >
              Cancel
            </motion.button>
          </Modal.Footer>
        </Modal>
      </>
  );
};

export default EditTask;
