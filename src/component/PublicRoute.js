import {Navigate, Outlet, useLocation} from 'react-router-dom';
import React from 'react';

const PublicRoute = (props) => {

  const data = props.auth;
  const location = useLocation();

  return data ? <Navigate to="/todolist" state={{from: location}}/> : <Outlet/>;

};
export default PublicRoute;