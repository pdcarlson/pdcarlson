import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from './Spinner'; // import the spinner here

const ProtectedRoute = () => {
  const { user, loading } = useAuth(); // get the loading state from our context

  // while we're checking for a user, show a spinner
  if (loading) {
    return <Spinner />;
  }

  // after checking, if there's no user, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // if a user is logged in, show the child route (the admin page)
  return <Outlet />;
};

export default ProtectedRoute;