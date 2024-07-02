import React, { useContext, useEffect, useState } from "react";
import styles from "./CheckItem.module.css";
import { checkItems } from "../../apis/task";
import MyContext from "../ContextApi/MyContext";
function CheckItem({ taskId, itemId, name, selected, onCheckboxChange }) {
  const [isChecked, setIsChecked] = useState(selected);

  useEffect(() => {
    setIsChecked(selected);
  }, [selected]);

  const handleCheckboxChange = async (e) => {
    const newCheckedState = e.target.checked;
    setIsChecked(newCheckedState);
    onCheckboxChange(newCheckedState);
    try {
      const response = await checkItems(taskId, itemId, newCheckedState);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.item}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div className={styles.textArea}>{name}</div>
    </div>
  );
}

export default CheckItem;
