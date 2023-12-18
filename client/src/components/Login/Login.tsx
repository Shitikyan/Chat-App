import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setUsername } from "src/actions/registration/username-actions";
import { setPassword } from "src/actions/registration/password-actions";
import { setIsAuthenticated } from "src/actions/auth-actions";
import Title from "../Title/Title";
import styles from "./login.module.scss";
import axios from "axios";

export default function Login() {
  const dispatch = useDispatch();
  const username = useSelector((state: any) => state.username);
  const password = useSelector((state: any) => state.password);

  const onSubmitForm = async (e: any) => {
    e.preventDefault();

    try {
      const body = { username, password };

      const response: any = await axios.post(
        "http://localhost:4001/auth/login",
        {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const parseResponse = await response.json();

      if (parseResponse.token) {
        localStorage.setItem("token", parseResponse.token);

        setUsername(dispatch, username);
        setPassword(dispatch, password);
        setIsAuthenticated(dispatch, true);
        toast.success("Logged in successfully");
      } else {
        setIsAuthenticated(dispatch, false);
        toast.error(parseResponse);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.subWrapper}>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={onSubmitForm}>
            <Title title="ChatApp" />
            <div className={styles.subContainer}>
              <label htmlFor="username" className={styles.subLabel}>
                Username
              </label>
            </div>
            <input
              className={styles.input}
              type="text"
              name="username"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(dispatch, e.target.value)}
            />
            <div className={styles.subContainer}>
              <label htmlFor="password" className={styles.subLabel}>
                Password
              </label>
            </div>
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(dispatch, e.target.value)}
            />
            <button className={styles.button}>Log In</button>
            <hr className={styles.hr}></hr>
            <Link to="/register">
              <button className={styles.button}>Create New Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
