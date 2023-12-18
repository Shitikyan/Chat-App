import React from "react";
import MessageFeed from "../MessageFeed/MessageFeed";
import MessageInput from "../MessageInput/MessageInput";
import Navbar from "../Navbar/Navbar";
import RoomDetails from "../RoomDetails/RoomDetails";
import styles from "./chatRoom.module.scss";

export default function ChatRoom(props: any) {
  
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.nav}>
          <Navbar />
        </div>
        <aside className={styles.asideLeft}>
          <RoomDetails />
        </aside>
        <aside className={styles.asideRight}>
          <MessageFeed />
        </aside>
        <footer className={styles.footer}>
          <MessageInput />
        </footer>
      </div>
    </div>
  );
}
