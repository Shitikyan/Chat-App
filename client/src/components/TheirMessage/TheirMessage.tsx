import React from "react";
import styles from "./theirMessage.module.scss";

export default function TheirMessage() {
  return (
    <div className={styles.messageLine}>
      <div className={styles.messageContainer}>
        <p className={styles.messageContent}>MessageContent</p>
        <div className={styles.senderIdContainer}>
          <span className={styles.senderId}>From: {"message.senderName"}</span>
        </div>
      </div>
    </div>
  );
}
