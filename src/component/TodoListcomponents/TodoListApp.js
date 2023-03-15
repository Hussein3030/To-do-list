import React, {useEffect, useState} from 'react';
import CreateTaks from '../TodoListcomponents/modalsTask/CreateTaks';
import CardTaks from '../TodoListcomponents/CardTasks';
import NavBar from '../NavBar';
import axios from 'axios';
import {motion} from 'framer-motion';

function ToDoApp() {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  axios.defaults.withCredentials = true;
  const toggle = () => {
    setModal(!modal);
  };

  //Get all data from db
  const getDataList = async () => {
    const {data} = await axios.get('http://localhost:5000/data',
        {headers: {Authorization: 'Bearer: ' + localStorage.getItem('Token')}});
    setTaskList(data);
    console.log(data);
    console.log(taskList);
    console.log("Task amount:" , data.length);
  };

  useEffect(() => {
    getDataList();

  }, []);

//Delete Task
  const deleteTask = (index, obID) => {
    console.log(index);
    console.log(taskList);
    axios.post('http://localhost:5000/Delete', {
      id: index,
    }, {
      headers: {Authorization: 'Bearer: ' + localStorage.getItem('Token')},
    }).then((res) => {
      console.log(res);
    }).finally(() => {

    });
    window.location.reload();

  };

  const saveTaskObjects = async () => {
    axios.post('http://localhost:5000/InsertData').
        then((response) => response.json()).
        catch((error) => {
          console.log(error.message);
        });
  };
  const saveTasks = async (taskObject) => {

    taskList.push(taskObject);
    setTaskList(taskList);
    setModal(false);
    window.location.reload();

  };

  const updateListTask = (obj, index) => {
    let tempList = taskList;
    tempList[index] = obj;
    setTaskList(tempList);
    window.location.reload();
  };

  return (
      <>
        <div className="container text-center">

          <div>
            <NavBar/>
          </div>
          <div className="card m-4 p-3">
            <div className=" d-flex justify-content-center">
              <h2> Todo List </h2>
            </div>
            <div className="d-flex justify-content-center">
              <motion.button id="button1" variant="primary mt-2"
                             onClick={() => setModal(true)}
                             whileHover={{
                               scale: 1.1,
                               textShadow: '0px 0px 8px rgb(255,255,255)',
                               boxShadow: '0px 0px 8px rgb(255,255,255)',

                             }}
              >

                Create a Note:

              </motion.button>
            </div>
          </div>


          {/**Kaikki taskit näyttää tällää */}
          <div className="container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              {taskList && taskList.map((obj, index) => (
                  <CardTaks
                      taskObject={obj}
                      index={index}
                      id={obj.id}
                      deleteTask={deleteTask}
                      updateListTask={updateListTask}
                  />
              ))}
              <CreateTaks toggle={toggle} modal={modal} save={saveTasks}/>
            </div>
          </div>
        </div>
      </>
  );
}

export default ToDoApp;
