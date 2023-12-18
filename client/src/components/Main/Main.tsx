import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import ChatRoom from "../ChatRoom/ChatRoom";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import Error from "../ErrorPage/ErrorPage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { setIsAuthenticated } from "src/actions/auth-actions";
import axios from "axios";

// toast.configure();

export const Main = () => {
  const isAuthenticated: boolean = useSelector(
    (state: any) => state.isAuthenticated
  );

  const dispatch = useDispatch();

  const isAuth = async () => {
    try {
      const response: any = await axios.get(
        "http://localhost:4001/auth/is-verified",
        {
          headers: { token: localStorage.token },
        }
      );

      const parseResponse = await response.json();

      parseResponse === true
        ? setIsAuthenticated(dispatch, true)
        : setIsAuthenticated(dispatch, false);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <Routes>
      <Route index element={!isAuthenticated ? <Home /> : <Login />} />
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Home />} />
      <Route
        path="/register"
        element={!isAuthenticated ? <Registration /> : <Login />}
      />
      <Route
        path="/chatroom/:roomId"
        element={!isAuthenticated ? <ChatRoom /> : <Login />}
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};
