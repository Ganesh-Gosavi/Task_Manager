import React from "react";
import styles from "./LoadingMessage.module.css";
import hourGlass from "../../assets/gif/Hourglass.gif";
function LoadingMessage() {
  return (
    <div className={styles.mainContainer}>
      <img src={hourGlass} alt="gif icon" />
      <p>loading...</p>
    </div>
  );
}

export default LoadingMessage;
