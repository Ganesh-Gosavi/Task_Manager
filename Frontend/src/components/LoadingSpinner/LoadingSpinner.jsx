import React from "react";
import styles from "./LoadingSpinner.module.css";
function LoadingSpinner() {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
}

export default LoadingSpinner;
