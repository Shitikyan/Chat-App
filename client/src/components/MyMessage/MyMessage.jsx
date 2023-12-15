import React from "react";
import styles from "./myMessage.module.scss";

export default function MyMessage() {
  return (
    <div className={styles.messageLine}>
      <div className={styles.messageContainer}>
        <p className={styles.messageContent}>message</p>
        <div className={styles.senderIdContainer}>
          <span className={styles.senderId}>From: 'message.senderName'</span>
        </div>
      </div>
    </div>
  );
}
