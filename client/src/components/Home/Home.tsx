import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "./home.module.scss";
import Input from "../Input/Input";

export default function Home() {
  const roomName = ''
  return (
    <div className={styles.wrapper}>
      <div className={styles.subWrapper}>
        <div className={styles.container}>
          <label className={styles.subLabel}>Room Name</label>
          <Input />
          <Link to={`/chatroom/${roomName}`}>
          </Link>
        </div>
      </div>
    </div>
  );
}
