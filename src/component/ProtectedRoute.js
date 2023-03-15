import React from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';

const ProtectedRoute = (props) => {

  const data = props.auth;
  const location = useLocation();

  return data ? <Outlet/> : <Navigate to="/" state={{from: location}}/>;

};
export default ProtectedRoute;

