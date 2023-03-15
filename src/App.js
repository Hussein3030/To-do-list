import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from './component/RegisterPages/LoginForm';
import Register from './component/RegisterPages/RegisterForm';
import TodoListApp from './component/TodoListcomponents/TodoListApp';
import {useEffect, useState} from 'react';
import axios from 'axios';
import ProtectedRoute from './component/ProtectedRoute';
import PublicRoute from './component/PublicRoute';

function App() {

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    testToken();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      testToken();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  function isAuth(b) {
    setAuth(prev => {
      return b;
    });

  }

  function testToken() {

    axios.get('http://localhost:5000/isUserAuth', {
      headers: {Authorization: 'Bearer: ' + localStorage.getItem('Token')},
      timeout: 0,
    }).then((res) => {
      isAuth(res.data);
    }).catch(err => {
      isAuth(false);
    }).finally(() => {

    });
    return auth;
  }

  return (
      <>

        <Routes>
          <Route element={<ProtectedRoute auth={testToken()}/>}>
            <Route path="/todolist" element={<TodoListApp/>}/>
          </Route>
          <Route element={<PublicRoute auth={testToken()}/>}>
            <Route path="/" element={<Login/>}/>
          </Route>
          <Route path="/register" element={<Register/>}/>


        </Routes>
      </>
  );
}

export default App;