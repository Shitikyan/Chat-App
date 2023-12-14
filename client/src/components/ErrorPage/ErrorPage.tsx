import React from "react";
import ErrorPic from "../../assets/404-pic.jpg";
import styles from "./errorPage.module.scss";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

export default function Error() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.subWrapper}>
        <img src={ErrorPic} alt="error img" className={styles.img} />
        <Link to="/">
          <Button title="Return Home" />
        </Link>
      </div>
    </div>
  );
}
