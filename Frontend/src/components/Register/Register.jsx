import React, { useState } from "react";
import styles from "./Register.module.css";
import nameSVG from "../../assets/icons/nameSVG.svg";
import emailSVG from "../../assets/icons/emailSVG.svg";
import eye from "../../assets/icons/eye.svg";
import lock from "../../assets/icons/lock.svg";
import { registerUser } from "../../apis/auth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfPasswordVisible, setIsConfPasswordVisible] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  let valid = true;
  const handleSubmit = async () => {
    // Check if name is available
    if (!(userData.name.trim().length > 0)) {
      valid = false;
      setNameError(true);
    } else {
      setNameError(false);
    }

    // Check if email is available
    if (!(userData.email.trim().length > 0)) {
      valid = false;
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    // Check if password is availabale
    if (!(userData.password.trim().length > 0)) {
      valid = false;
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    // Check if password matches the confirm password
    if (userData.password !== userData.confirmPassword) {
      valid = false;
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }

    // Submit the form if it is valid= true
    if (valid) {
      const data = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      };
      const response = await registerUser({ ...data });

      if (response?.success) {
        localStorage.setItem("tokenPro", response.token);
        localStorage.setItem("usernamePro", response.username);
        toast.success(response.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (response?.success === false) {
        toast.error(response?.message);
      } else {
        toast.error("Server is not responding!");
      }
    }
  };

  return (
    <div className={styles.registerSection}>
      <p className={styles.heading}>Register</p>
      <div className={styles.form}>
        <div className={styles.inputField}>
          <img src={nameSVG} alt="icon" className={styles.icon} />
          <input
            className={styles.inputBox}
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
        </div>
        {nameError ? <p className={styles.error}>Field is required</p> : <></>}
        <div className={styles.inputField}>
          <img src={emailSVG} alt="icon" className={styles.icon} />
          <input
            className={styles.inputBox}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        {emailError ? <p className={styles.error}>Field is required</p> : <></>}
        <div className={styles.inputField}>
          <div className={styles.nestedInputField}>
            <img src={lock} alt="icon" className={styles.icon} />
            <input
              className={styles.inputBox}
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <img
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            src={eye}
            alt="icon"
            className={styles.eyeBtn}
          />
        </div>
        {passwordError ? (
          <p className={styles.error}>Field is required</p>
        ) : (
          <></>
        )}

        <div className={styles.inputField}>
          <div className={styles.nestedInputField}>
            <img src={lock} alt="icon" className={styles.icon} />
            <input
              className={styles.inputBox}
              type={isConfPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          </div>
          <img
            onClick={() => setIsConfPasswordVisible(!isConfPasswordVisible)}
            src={eye}
            alt="icon"
            className={styles.eyeBtn}
          />
        </div>
        {confirmPasswordError ? (
          <p className={styles.error}>Passwords do NOT match!</p>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.footer}>
        <button
          className={`${styles.registerBtn} ${styles.btn}`}
          onClick={handleSubmit}
        >
          Register
        </button>
        <p>Have an account ?</p>
        <button
          onClick={() => navigate("/login")}
          className={`${styles.loginBtn} ${styles.btn}`}
        >
          Log in
        </button>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              fontSize: "1.5rem",
              height: "2rem",
            },
          },
          error: {
            style: {
              fontSize: "1.5rem",
              height: "2rem",
            },
          },
        }}
      />
    </div>
  );
}

export default Register;
