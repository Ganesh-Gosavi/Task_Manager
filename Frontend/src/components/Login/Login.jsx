import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import emailSVG from "../../assets/icons/emailSVG.svg";
import eye from "../../assets/icons/eye.svg";
import lock from "../../assets/icons/lock.svg";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/auth";
import styles from "./Login.module.css";
import LoadingMessage from "../LoadingMessage/LoadingMessage";
function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  let valid = true;
  const handleSubmit = async () => {
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

    // Submit the form if it is valid= true
    if (valid) {
      setIsLoading(true);
      try {
        const response = await loginUser({ ...userData });

        if (response?.success) {
          localStorage.setItem("tokenPro", response.token);
          localStorage.setItem("usernamePro", response.username);
          toast.success(response.message);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else if (response?.success === false) {
          toast.error(response?.message);
        } else {
          toast.error("Server is not responding!");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={styles.loginSection}>
      <p className={styles.heading}>Login</p>
      <div className={styles.form}>
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
      </div>
      <div className={styles.footer}>
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className={`${styles.loginBtn} ${styles.btn}`}
        >
          Log in
        </button>

        <p>Have no account yet?</p>
        <button
          disabled={isLoading}
          className={`${styles.registerBtn} ${styles.btn}`}
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
      {isLoading && <LoadingMessage />}
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

export default Login;
