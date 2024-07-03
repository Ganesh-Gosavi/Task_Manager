import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./SettingsComp.module.css";
import nameSVG from "../../assets/icons/nameSVG.svg";
import emailSVG from "../../assets/icons/emailSVG.svg";
import eye from "../../assets/icons/eye.svg";
import lock from "../../assets/icons/lock.svg";
import { getUserInfo } from "../../utils/helper";
import { updateUsernameOrPassword } from "../../apis/auth";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);

  useEffect(() => {
    const userInfo = getUserInfo();
    setName(userInfo);
  }, []);

  // useEffect(() => {
  //   const userInfo = getUserInfo();
  //   setEmail(userInfo);
  // }, []);

  let validForUpdate = true;
  const handleUpdate = async () => {
    if (newPassword && !oldPassword) {
      setOldPasswordError(true);
      validForUpdate = false;
    } else {
      setOldPasswordError(false);
    }

    if (!newPassword && oldPassword) {
      setNewPasswordError(true);
      validForUpdate = false;
    } else {
      setNewPasswordError(false);
    }

    if (validForUpdate) {
      const userInfo = {};
      if (name) {
        userInfo.name = name;
        localStorage.setItem("usernamePro", name);
      }

      if (email) {
        userInfo.email = email;
        localStorage.setItem("emailPro", email);
      }

      if (oldPassword && newPassword) {
        userInfo.password = { oldPassword, newPassword };
      }

      setIsLoading(true);
      try {
        const response = await updateUsernameOrPassword(userInfo);

        if (response?.success) {
          toast.success("Information Updated Successfully!");

          if (userInfo.password && oldPassword && newPassword) {
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
        } else if (response?.success === false) {
          toast.error(response?.message);
        } else {
          toast.error("Server is not responding");
        }
      } catch (error) {
        toast.error("Server is not responding");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={styles.mainSettingSection}>
      <p className={styles.heading}>Settings</p>

      {!isLoading && (
        <>
          <div className={styles.form}>
            <div className={styles.inputField}>
              <img src={nameSVG} alt="icon" className={styles.icon} />
              <input
                className={styles.inputBox}
                type="text"
                name="name"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.inputField}>
              <img src={emailSVG} alt="icon" className={styles.icon} />
              <input
                className={styles.inputBox}
                type="text"
                name="email"
                value={email}
                placeholder="Updated Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputField}>
              <div className={styles.nestedInputField}>
                <img src={lock} alt="icon" className={styles.icon} />
                <input
                  className={styles.inputBox}
                  type={isOldPasswordVisible ? "text" : "password"}
                  name="oldPassword"
                  value={oldPassword}
                  placeholder="Old password"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <img
                onClick={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
                src={eye}
                alt="icon"
                className={styles.eyeBtn}
              />
            </div>
            {oldPasswordError ? (
              <p className={styles.error}>Field is required</p>
            ) : (
              <></>
            )}
            <div className={styles.inputField}>
              <div className={styles.nestedInputField}>
                <img src={lock} alt="icon" className={styles.icon} />
                <input
                  className={styles.inputBox}
                  type={isNewPasswordVisible ? "text" : "password"}
                  name="newPassword"
                  value={newPassword}
                  placeholder="New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <img
                onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                src={eye}
                alt="icon"
                className={styles.eyeBtn}
              />
            </div>
            {newPasswordError ? (
              <p className={styles.error}>Field is required</p>
            ) : (
              <></>
            )}
          </div>
          <button
            className={`${styles.updateBtn} ${styles.btn}`}
            onClick={handleUpdate}
          >
            Update
          </button>
        </>
      )}

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              fontSize: "1.5rem",
              height: "3rem",
            },
          },
          error: {
            style: {
              fontSize: "1.5rem",
              height: "3rem",
            },
          },
        }}
      />
    </div>
  );
}

export default Settings;
