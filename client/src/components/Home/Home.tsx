import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setRoomName } from "src/actions/roomName-actions";
import { setIsAuthenticated } from "src/actions/auth-actions";
import { setUsersInRoom } from "src/actions/usersInRoom-actions";
import styles from "./home.module.scss";
import Input from "../Input/Input";

export default function Home() {
  const dispatch = useDispatch();
  const roomName = useSelector((state: any) => state.roomName);

  const logout = (e: any) => {
    
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuthenticated(dispatch, false);
    toast.success("Logged out successfully");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.subWrapper}>
        <div className={styles.container}>
          <label htmlFor="room-name" className={styles.label}>
            Room Name
          </label>
          <Input type="text" name="room-name" placeholder="Room" value={roomName} onChange={(e: any) => setRoomName(dispatch, e.target.value)}/>
          <Link to={`/chatroom/${roomName}`}>
            <button className={styles.button} onClick={() => setUsersInRoom(dispatch)}>Join Room</button>
          </Link>
          <br />
          <button className={styles.button} onClick={(e) => logout(e)}>Log out</button>
        </div>
      </div>
    </div>
  );
}
