import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import { getAnalyticsData } from "../../apis/task";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
function Analytics() {
  const [analyticData, setAnalyticData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    try {
      const response = await getAnalyticsData();
      if (response?.success === false) {
        toast.error(response?.message);
      } else if (response?.success === true) {
        setAnalyticData(response.data);
      }
    } catch (error) {
      toast.error("Server is not responding");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.mainAnalyticSection}>
      <p className={styles.heading}>Analytics</p>
      {isLoading && <LoadingSpinner />}
      {!isLoading && analyticData ? (
        <div className={styles.cards}>
          <div className={styles.cardItem}>
            <div className={styles.listItems}>
              <div className={styles.item}>
                <div className={styles.dot}></div>
                <p>Backlog Tasks</p>
              </div>
              <div className={styles.number}>{analyticData?.backlogCount}</div>
            </div>
            <div className={styles.listItems}>
              <div className={styles.item}>
                <div className={styles.dot}></div>
                <p>To-do Tasks</p>
              </div>
              <div className={styles.number}>{analyticData?.todoCount}</div>
            </div>
            <div className={styles.listItems}>
              <div className={styles.item}>
                <div className={styles.dot}></div>
                <p>In-Progress Tasks</p>
              </div>
              <div className={styles.number}>{analyticData?.progressCount}</div>
            </div>
            <div className={styles.listItems}>
              <div className={styles.item}>
                <div className={styles.dot}></div>
                <p>Completed Tasks</p>
              </div>
              <div className={styles.number}>
                {analyticData?.completedCount}
              </div>
            </div>
          </div>
          <div className={styles.cardItem}>
            <div className={styles.listItems}>
              <div className={styles.item}>
                <div className={styles.dot}></div>
                <p>Low Priority</p>
              </div>
              <div className={styles.number}>{analyticData?.lowCount}</div>
            </div>
            <div className={styles.listItems}>
              <div className={styles.item}>
                <div className={styles.dot}></div>
                <p>Moderate Priority</p>
              </div>
              <div className={styles.number}>{analyticData?.moderateCount}</div>
            </div>
            <div className={styles.listItems}>
              <div className={styles.item}>
                <div className={styles.dot}></div>
                <p>High Priority</p>
              </div>
              <div className={styles.number}>{analyticData?.highCount}</div>
            </div>
            <div className={styles.listItems}>
              <div className={styles.item}>
                <div className={styles.dot}></div>
                <p>Due Date Tasks</p>
              </div>
              <div className={styles.number}>
                {analyticData?.dueDateNotDoneCount}
              </div>
            </div>
          </div>
        </div>
      ) : !isLoading ? (
        <p className={styles.serverError}>
          Error Code 503: Service Unavailable
        </p>
      ) : (
        <></>
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

export default Analytics;
