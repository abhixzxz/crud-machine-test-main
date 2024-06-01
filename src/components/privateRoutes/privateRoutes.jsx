import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const PrivateRoute = ({ children }) => {
  const { authUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authUser || !authUser.firstName) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
