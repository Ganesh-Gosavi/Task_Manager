import React, { useContext, useEffect, useState } from "react";
import styles from "./TaskAddModal.module.css";
import deleteIcon from "../../assets/icons/delete.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import { createTask } from "../../apis/task";
import MyContext from "../ContextApi/MyContext";
import LoadingMessage from "../LoadingMessage/LoadingMessage";
function TaskAddModal({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState({});
  const [checklist, setChecklist] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { fetchTasks } = useContext(MyContext);

  const handleAddChecklistItem = () => {
    const newItem = { name: "", selected: false };
    setChecklist((prev) => [...prev, newItem]);
  };

  const handleName = (index, newName) => {
    const updatedItem = [...checklist];
    updatedItem[index].name = newName;
    setChecklist(updatedItem);
  };

  const handleCheckbox = (index, newSelected) => {
    const updatedItem = [...checklist];
    updatedItem[index].selected = newSelected;
    setChecklist(updatedItem);
  };

  const handleDateChange = (date) => {
    setDueDate(date);
  };

  const deleteItem = (index) => {
    const updatedItem = [...checklist];
    updatedItem.splice(index, 1);
    setChecklist(updatedItem);
  };

  const countSelectedItems = () => {
    return checklist.filter((item) => item.selected).length;
  };

  let valid = true;
  const handleSubmit = async () => {
    if (!(title?.trim().length > 0)) {
      valid = false;
      toast.error("Title Required");
    }

    if (!(priority?.typeOfPriority?.trim().length > 0)) {
      valid = false;
      toast.error("Select Priority");
    }

    if (!(checklist.length > 0)) {
      valid = false;
      toast.error("Add Checklist");
    }

    if (valid) {
      const taskDetails = {
        title,
        priority,
        checklist,
        dueDate,
      };
      setIsLoading(true);

      try {
        const response = await createTask(taskDetails);

        if (response?.success === false) {
          toast.error(response?.message);
        }
      } finally {
        setTitle("");
        setDueDate("");
        setChecklist([]);
        setPriority({});
        onClose();
        fetchTasks();
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalBackground}></div>
          <div className={styles.modalContent}>
            <div className={styles.modalBox}>
              <div className={styles.titleHeader}>
                <p>
                  Title<sup>*</sup>
                </p>
                <input
                  type="text"
                  value={title}
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Task Title"
                />
              </div>
              <div className={styles.selectPriority}>
                <p>
                  Select Priority<sup>*</sup>
                </p>
                <div
                  className={`${styles.highPriority} ${
                    priority.typeOfPriority === "high" ? styles.selected : ""
                  }`}
                  onClick={() =>
                    setPriority({
                      label: "HIGH PRIORITY",
                      color: "#FF2473",
                      typeOfPriority: "high",
                    })
                  }
                >
                  <div
                    style={{ backgroundColor: "#FF2473" }}
                    className={styles.dot}
                  ></div>
                  <p>HIGH PRIORITY</p>
                </div>
                <div
                  className={`${styles.medPriority} ${
                    priority.typeOfPriority === "medium" ? styles.selected : ""
                  }`}
                  onClick={() =>
                    setPriority({
                      label: "MODERATE PRIORITY",
                      color: "#18B0FF",
                      typeOfPriority: "medium",
                    })
                  }
                >
                  <div
                    style={{ backgroundColor: "#18B0FF" }}
                    className={styles.dot}
                  ></div>
                  <p>MODERATE PRIORITY</p>
                </div>
                <div
                  className={`${styles.lowPriority} ${
                    priority.typeOfPriority === "low" ? styles.selected : ""
                  }`}
                  onClick={() =>
                    setPriority({
                      label: "LOW PRIORITY",
                      color: "#63C05B",
                      typeOfPriority: "low",
                    })
                  }
                >
                  <div
                    style={{ backgroundColor: "#63C05B" }}
                    className={styles.dot}
                  ></div>
                  <p>LOW PRIORITY</p>
                </div>
              </div>
              <div className={styles.checklistSection}>
                <p>
                  Checklist &#40;{countSelectedItems()}/{checklist.length}&#41;
                  <sup>*</sup>
                </p>
                <div className={styles.checklistItems}>
                  {checklist.map((item, index) => (
                    <div className={styles.itemBox} key={index}>
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => handleCheckbox(index, !item.selected)}
                      />
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleName(index, e.target.value)}
                        placeholder="Type..."
                      />
                      <img
                        src={deleteIcon}
                        alt="icon"
                        onClick={() => deleteItem(index)}
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleAddChecklistItem}
                  className={styles.addNewBtn}
                >
                  + Add New
                </button>
              </div>
              <div className={styles.buttonContainer}>
                <div className={styles.datePicker}>
                  <DatePicker
                    id="dueDate"
                    selected={dueDate}
                    onChange={handleDateChange}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select due date"
                    withPortal
                    className={styles.customDatePicker}
                  />
                </div>
                <div className={styles.buttons}>
                  <button className={styles.cancelBtn} onClick={onClose}>
                    Cancel
                  </button>
                  <button
                    disabled={isLoading}
                    onClick={handleSubmit}
                    className={styles.saveBtn}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
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
      )}
    </>
  );
}

export default TaskAddModal;
