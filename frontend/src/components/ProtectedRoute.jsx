import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { checkAuthStatus } from "../redux/features/authSlice";
import Loader from "./Loader";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user && status === "idle") {
      dispatch(checkAuthStatus());
    }
  }, [dispatch, user, status]);

  if (status === "loading" || status === "idle") return <Loader />;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
