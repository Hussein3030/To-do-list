import React, {useState} from 'react';
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
const CreateTasks = ({modal, toggle, save}) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskCompleted, setTasCompleted] = useState('');
  const [taskDescription, setDescription] = useState('');
  axios.defaults.withCredentials = true;

  const handleSaves = (e) => {
    e.preventDefault();
    let taskObj = {};
    taskObj['Title'] = taskTitle;
    taskObj['Date'] = taskDate;
    taskObj['Description'] = taskDescription;
    let taskss = axios.post('http://localhost:5000/InsertData', {
      title: taskTitle,
      date: taskDate,
      description: taskDescription,
      completed: taskCompleted,
    }, {
      headers: {Authorization: 'Bearer: ' + localStorage.getItem('Token')},
    }).then((response) => {
      console.log(response);
    });
    save(taskObj);
    console.log(taskObj);
    setTaskTitle('');
    setTaskDate('');
    setDescription('');
  };

  return (
      <div>
        <Modal
            show={modal}
            onHide={toggle}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
          <Modal.Header closeButton>

            <motion.svg xmlns="http://www.w3.org/2000/svg" width="26"
                        height="26" fill="currentColor"
                        className="bi bi-chat-square-dots" viewBox="0 0 16 16"
                        variants={svgVariants}
                        initial="hidden"
                        animate="visible"
            >
              <motion.path
                  d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                  variants={pathVariants}
              />
              <motion.path
                  d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                  variants={pathVariants}
              />
            </motion.svg>


            <Modal.Title id="example-modal-sizes-title-lg">
              Create new Task
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
                      name="taskTitle"
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
                      onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
              </motion.div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <motion.button id="button2" variant="secondary"
                           onClick={handleSaves}
                           whileHover={{
                             scale: 1.1,
                             textShadow: '0px 0px 8px rgb(255,255,255)',
                             boxShadow: '0px 0px 8px rgb(255,255,255)',

                           }}
            >
              Create
            </motion.button>
            <motion.button id="cancelbutton" variant="primary" onClick={toggle}
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
      </div>
  );
};
export default CreateTasks;

