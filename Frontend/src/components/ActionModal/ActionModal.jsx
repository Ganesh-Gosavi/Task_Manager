import React from "react";
import styles from "./ActionModal.module.css";
function ActionModal({ name, handleAction, isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalBackground}></div>
          <div className={styles.modalContent}>
            <div className={styles.modalBox}>
              <p>Are you sure you want to {name}?</p>
              <div className={styles.buttons}>
                <button onClick={handleAction} className={styles.logoutBtn}>
                  Yes, {name}
                </button>
                <button className={styles.cancelBtn} onClick={onClose}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ActionModal;
