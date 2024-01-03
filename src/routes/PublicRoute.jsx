import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({children}) => {
  const {user} = useAuth();

  if(user) {
    return <Navigate to="/" replace={true} />
  }
  return children;
}

export default PublicRoute;