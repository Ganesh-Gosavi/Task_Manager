import React from "react";
import styles from "./MessageComponent.module.css";
function MessageComponent({ message }) {
  return <div className={styles.messageContainer}>{message}</div>;
}

export default MessageComponent;
