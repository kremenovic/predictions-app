import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  //   const { token } = useUserContext();
  const token = "123token123";
  if (!token) {
    return <Navigate to="/register" />;
  }
  return children;
};
