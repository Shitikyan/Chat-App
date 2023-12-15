import React from "react";
import style from "./messageInput.module.scss";

export default function MessageInput() {
  return (
    <>
      <input
        className={style.input}
        type="text"
        placeholder="Write your message here..."
      ></input>
      <button className={style.button}><i className="fas fa-arrow-alt-circle-up"></i> Send</button>
    </>
  );
}
