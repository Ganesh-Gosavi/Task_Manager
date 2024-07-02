export const getUserInfo = () => {
  return localStorage.getItem("usernamePro");
};

export const getCurrentDate = () => {
  const currDate = new Date();
  const day = currDate.getDate();
  const month = currDate.toLocaleString("default", { month: "short" });
  const year = currDate.getFullYear();

  let daySuffix;
  switch (day) {
    case 1:
    case 21:
    case 31:
      daySuffix = "st";
      break;
    case 2:
    case 22:
      daySuffix = "nd";
      break;
    case 3:
    case 23:
      daySuffix = "rd";
      break;
    default:
      daySuffix = "th";
  }

  return `${day}${daySuffix} ${month}, ${year}`;
};

export const copyToClipboard = async (link, taskId) => {
  const urlParts = link.split("/");
  urlParts.pop();

  urlParts.push("sharedLink", taskId);
  const newURL = urlParts.join("/");

  navigator.clipboard.writeText(newURL);
};

export const formatDateAsMMDD = (dateString) => {
  const date = new Date(dateString);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  let suffix = "th";
  if (day === 1 || day === 21 || day === 31) {
    suffix = "st";
  } else if (day === 2 || day === 22) {
    suffix = "nd";
  } else if (day === 3 || day === 23) {
    suffix = "rd";
  }

  return `${monthNames[date.getMonth()]} ${day}${suffix}`;
};

export const calculateColors = (dueDate, status) => {
  const currentDate = new Date();
  const dueDateObj = new Date(dueDate);

  let backgroundColor, textColor;
  if (dueDateObj < currentDate && status !== "done") {
    backgroundColor = "#CF3636";
    textColor = "white";
  } else if (dueDateObj > currentDate && status !== "done") {
    backgroundColor = "#DBDBDB";
    textColor = "black";
  } else {
    backgroundColor = "#63C05B";
    textColor = "white";
  }

  return { backgroundColor, textColor };
};
