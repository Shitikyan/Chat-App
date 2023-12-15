import React from "react";
import styles from "./inputContainer.module.scss";

interface InputProps {
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
}

export default function Input(props: InputProps) {
  return (
    <input
      className={styles.input}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    ></input>
  );
}
