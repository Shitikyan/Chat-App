import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFirstName } from "src/actions/registration/firstName-actions";
import { setLastName } from "src/actions/registration/lastName-actions";
import { setEmail } from "src/actions/registration/email-actions";
import { setUsername } from "src/actions/registration/username-actions";
import { setPassword } from "src/actions/registration/password-actions";
import { setRePassword } from "src/actions/registration/rePassword-actions";
import { setIsAuthenticated } from "src/actions/auth-actions";
import { toast } from "react-toastify";
import Title from "../Title/Title";
import Input from "../Input/Input";
import styles from "./registration.module.scss";
import axios from "axios";

export default function Registration() {
  const dispatch = useDispatch();
  const firstName = useSelector((state: any) => state.firstName);
  const lastName = useSelector((state: any) => state.lastName);
  const email = useSelector((state: any) => state.email);
  const username = useSelector((state: any) => state.username);
  const password = useSelector((state: any) => state.password);
  const rePassword = useSelector((state: any) => state.rePassword);

  const onSubmitForm = async (e: any) => {
    e.preventDefault();

    try {
      const body = {
        firstName,
        lastName,
        email,
        username,
        password,
        rePassword,
      };

      const response: any = await axios.post("", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseResponse = response.json();

      if (parseResponse.token) {
        localStorage.setItem("token", parseResponse.token);

        setIsAuthenticated(dispatch, true);
        toast.success("Registered Successfully");
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
            <Title title="Register" />
            <div className={styles.subContainer}>
              <label htmlFor="firstName" className={styles.subLabel}>
                First Name
              </label>
            </div>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(dispatch, e.target.value)}
            />
            <div className={styles.subContainer}>
              <label htmlFor="lastName" className={styles.subLabel}>
                Last Name
              </label>
            </div>
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(dispatch, e.target.value)}
            />
            <div className={styles.subContainer}>
              <label htmlFor="email" className={styles.subLabel}>
                Email
              </label>
            </div>
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(dispatch, e.terget.value)}
            />
            <div className={styles.subContainer}>
              <label htmlFor="username" className={styles.subLabel}>
                New Username
              </label>
            </div>
            <Input
              type="text"
              name="username"
              placeholder="Enter New Username"
              value={username}
              onChange={(e) => setUsername(dispatch, e.target.value)}
            />
            <div className={styles.subContainer}>
              <label htmlFor="password" className={styles.subLabel}>
                New Password
              </label>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPassword( dispatch, e.target.value)}
            />
            <div className={styles.subContainer}>
              <label htmlFor="rePassword" className={styles.subLabel}>
                Re-type Password
              </label>
            </div>
            <Input
              type="password"
              name="rePassword"
              placeholder="Re-type Password"
              value={rePassword}
              onChange={(e) => setRePassword(dispatch, e.target.value)}
            />
            <button className={styles.button}>Sign Up</button>
            <hr className={styles.hr}></hr>
            <h3 className={styles.h3}>
              Have an account?{" "}
              <Link to="/login" className={styles.link}>
                Login
              </Link>
            </h3>
          </form>
        </div>
      </div>
    </div>
  );
}
