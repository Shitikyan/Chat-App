import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import ChatRoom from "../ChatRoom/ChatRoom";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import Error from "../ErrorPage/ErrorPage";

// React Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Redux Hooks
import { useSelector, useDispatch } from "react-redux";

// Actions
// import { setIsAuthenticated } from "../actions/auth-actions";

// toast.configure();

export const Main = () => {
  // const navigate = useNavigate();

  const isAuthenticated = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={isAuthenticated ? <Home /> : <Login />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Login /> : <Home />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Registration /> : <Login />}
        />
        <Route
          path="/chatroom/:roomId"
          element={isAuthenticated ? <ChatRoom /> : <Login />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};
