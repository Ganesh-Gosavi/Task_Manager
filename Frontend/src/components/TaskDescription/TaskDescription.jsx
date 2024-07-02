import React, { useEffect, useState } from "react";
import styles from "./TaskDescription.module.css";
import codeSandBoxIcon from "../../assets/icons/codeSandBox.svg";
import { getTaskDescription } from "../../apis/task";
import { formatDateAsMMDD } from "../../utils/helper";
import LoadingMessage from "../LoadingMessage/LoadingMessage";

function TaskDescription() {
  const [taskData, setTaskData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTaskDetailsById();
  }, []);

  const fetchTaskDetailsById = async () => {
    const taskId = window.location.pathname?.split("/").slice(-1)[0];

    if (!taskId) return;
    setIsLoading(true);
    try {
      const response = await getTaskDescription(taskId);
      setTaskData(response);
    } finally {
      setIsLoading(false);
    }
  };

  const countChecklistChecked = () => {
    return taskData?.checklist?.filter((item) => item.selected)?.length;
  };
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.topHeading}>
          <img src={codeSandBoxIcon} alt="icon" />
          <p>Pro Manage</p>
        </div>
        {!isLoading && taskData && (
          <div className={styles.taskDescriptionSection}>
            <div className={styles.taskDetailBox}>
              <div className={styles.topSection}>
                <div
                  style={{ backgroundColor: taskData?.priority?.color }}
                  className={styles.dot}
                ></div>
                <p>{taskData?.priority?.label}</p>
              </div>
              <div className={styles.title}>{taskData?.title}</div>
              <div className={styles.checklistSection}>
                <p>
                  Checklist &#40;{countChecklistChecked()}/
                  {taskData?.checklist?.length}&#41;
                </p>
                <div className={styles.checklistItems}>
                  {taskData?.checklist?.map((item, index) => (
                    <div key={index} className={styles.itemBox}>
                      <input type="checkbox" checked={item.selected} readOnly />
                      <div className={styles.checklistValue}>{item.name}</div>
                    </div>
                  ))}
                </div>
              </div>
              {taskData?.dueDate && (
                <div className={styles.dateSection}>
                  <p>Due Date</p>
                  <div>{formatDateAsMMDD(taskData?.dueDate)}</div>
                </div>
              )}
            </div>
          </div>
        )}
        {!isLoading && !taskData && (
          <>
            <div className={styles.error}>
              <p>Error Code 500</p>
              <p>Task Deleted/Internal Server Error</p>
            </div>
          </>
        )}
        {isLoading && <LoadingMessage />}
      </div>
    </>
  );
}

export default TaskDescription;
