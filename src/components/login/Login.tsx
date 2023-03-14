import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginData } from "../../store/loginSlice";

const Login = () => {
  const [passwordValidation, setPasswordValidation] = useState("");
  const [emailValidation, setEmailValidation] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginInfo = useSelector((state: any) => state.loginData);
  const emailRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9]+.[a-zA-Z]+[a-zA-Z]*$/;
  const passwordRegex = /^[a-zA-Z0-9.-]{3,16}$/;

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (emailRegex.test(e.target.value)) {
      setEmailValidation(e.target.value);
    } else {
      setEmailValidation("");
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (passwordRegex.test(e.target.value)) {
      setPasswordValidation(e.target.value);
    } else {
      setPasswordValidation("");
    }
  };

  const handleSubmit = () => {
    dispatch(
      loginData({ email: emailValidation, password: passwordValidation })
    );
    navigate("/todo");
  };

  const isLoggedIn = () => {
    if (loginInfo.email !== "" || loginInfo.password !== "") {
      navigate("/todo");
    }
  };

  useEffect(() => {
    isLoggedIn();
  });

  return (
    <div className={styles.loginContainer}>
      <div className={styles.box}>
        <h1 className={styles.loginTitle}>Log In</h1>
        <input
          type='email'
          placeholder='Email'
          className={styles.input}
          onChange={(e) => {
            handleEmail(e);
          }}
        />
        <input
          type='password'
          placeholder='Password'
          className={styles.input}
          onChange={(e) => {
            handlePassword(e);
          }}
        />
        <button
          className={styles.loginButton}
          disabled={passwordValidation === "" || emailValidation === ""}
          onClick={handleSubmit}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default Login;
