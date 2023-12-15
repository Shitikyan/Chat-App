import React from "react";
import styles from "./roomDetails.module.scss";

export default function RoomDetails() {
  return (
    <div className={styles.content}>
      <h1 className={styles.title}>
        <i className="fas fa-person-booth"></i> Room Name:
      </h1>
      <div>
        <h3>{"roomId"}</h3>
      </div>
      <h1 className={styles.title}>
        <i className="fas fa-person-booth"></i> Users
      </h1>
      <div>
        <h3 key={"user.id"}>{"user.username"}</h3>
      </div>
    </div>
  );
}
