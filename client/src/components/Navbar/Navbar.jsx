import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./navbar.module.scss";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "src/actions/auth-actions";
import { removeUserFromRoom } from "src/actions/usersInRoom-actions";

export default function Navbar() {
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuthenticated(dispatch, false);
    removeUserFromRoom(dispatch);
    toast.success("Logged out successfully");
  };

  const inform = () => {
    removeUserFromRoom(dispatch)
    toast.info("Exited Room")
  }

  return (
    <h1 className={styles.logo}>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={(e) => logout(e)}>Logout</button>
        <Link to="/">
          <button className={styles.button} onClick={() => inform()}>Leave Room</button>
        </Link>
      </div>
    </h1>
  );
}
