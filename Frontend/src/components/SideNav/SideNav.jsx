import React, { useState } from "react";
import styles from "./SideNav.module.css";
import toast, { Toaster } from "react-hot-toast";
import codeSandBoxIcon from "../../assets/icons/codeSandBox.svg";
import layoutIcon from "../../assets/icons/layout.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import settingsIcon from "../../assets/icons/settings.svg";
import databaseIcon from "../../assets/icons/database.svg";
import { useLocation, useNavigate } from "react-router-dom";
import ActionModal from "../ActionModal/ActionModal";
function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const logoutToast = () =>
    toast.promise(
      // Promise to logout
      new Promise((resolve, reject) => {
        localStorage.removeItem("tokenPro");
        localStorage.removeItem("usernamePro");
        setTimeout(() => {
          resolve();
        }, 1000);
      }),
      {
        loading: "Logging out...",
        success: "Logged out successfully",
        error: "Failed to log out",
      }
    );

  const handleLogout = () => {
    logoutToast()
      .then(() => {
        navigate("/login");
      })
      .catch(() => {
        toast.error("Failed to log out");
      });
  };

  return (
    <div className={styles.mainSection}>
      <div className={styles.topSection}>
        <div className={`${styles.iconPlusText} ${styles.projectTitle}`}>
          <img src={codeSandBoxIcon} alt="Icon" />
          <p>Pro Manage</p>
        </div>
        <div
          onClick={() => navigate("/")}
          className={
            location.pathname === "/"
              ? `${styles.iconPlusText} ${styles.pageBtn} ${styles.active}`
              : `${styles.iconPlusText} ${styles.pageBtn}`
          }
        >
          <img src={layoutIcon} alt="Icon" />
          <p>Board</p>
        </div>
        <div
          onClick={() => navigate("/analytics")}
          className={
            location.pathname === "/analytics"
              ? `${styles.iconPlusText} ${styles.pageBtn} ${styles.active}`
              : `${styles.iconPlusText} ${styles.pageBtn}`
          }
        >
          <img src={databaseIcon} alt="Icon" />
          <p>Analytics</p>
        </div>
        <div
          onClick={() => navigate("/settings")}
          className={
            location.pathname === "/settings"
              ? `${styles.iconPlusText} ${styles.pageBtn} ${styles.active}`
              : `${styles.iconPlusText} ${styles.pageBtn}`
          }
        >
          <img src={settingsIcon} alt="Icon" />
          <p>Settings</p>
        </div>
      </div>
      <div
        className={`${styles.iconPlusText} ${styles.logout}`}
        onClick={handleOpenModal}
      >
        <img src={logoutIcon} alt="Icon" />
        <p>Log out</p>
      </div>
      <ActionModal
        name="Logout"
        handleAction={handleLogout}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
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

export default SideNav;
