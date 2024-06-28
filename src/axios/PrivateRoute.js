import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router';

const PrivateRoute = (props) => {
  const token = localStorage.getItem('jwt');
  // return token ? <Outlet /> : <Navigate to="/login" />
  const navigate = useNavigate();
  if (!token) {
    navigate('/login')
    return <></>
  }
  return (<>{props.children}</>)
};

export default PrivateRoute;