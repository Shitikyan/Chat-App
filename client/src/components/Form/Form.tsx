import React from "react";
import styles from "./form.module.scss";

type Props = {
  children: JSX.Element[];
};

export default function Form({ children }: Props) {
  return <form className={styles.form}>{children}</form>;
}
