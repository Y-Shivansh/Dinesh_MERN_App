import React from "react";
import { Navigate } from "react-router-dom";
export const PrivateRoute = ({children}) =>{
    const token = document.cookie.includes("token=");
    if (!token) {
        return <Navigate to="/sign-in" />;
      }
} 