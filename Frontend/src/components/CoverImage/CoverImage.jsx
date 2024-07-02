import React from "react";
import styles from "./CoverImage.module.css";
import doodleImg from "../../assets/images/doodleImg.png";
function CoverImage() {
  return (
    <div className={styles.coverSection}>
      <div className={styles.imageSec}>
        <div className={styles.bgCircle}></div>
        <img src={doodleImg} alt="Image loading.." />
      </div>
      <p className={styles.text}>
        Welcome aboard my friend
        <br />
        <span>just a couple of clicks and we start</span>
      </p>
    </div>
  );
}

export default CoverImage;
