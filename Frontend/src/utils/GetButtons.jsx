import React from "react";

function GetButtons({ taskId, buttonPressed, newStatus }) {
  let buttons;
  switch (newStatus) {
    case "backlog":
      buttons = (
        <>
          <button onClick={() => buttonPressed(taskId, "progress")}>
            PROGRESS
          </button>
          <button onClick={() => buttonPressed(taskId, "todo")}>TO-DO</button>
          <button onClick={() => buttonPressed(taskId, "done")}>DONE</button>
        </>
      );
      break;
    case "todo":
      buttons = (
        <>
          <button onClick={() => buttonPressed(taskId, "backlog")}>
            BACKLOG
          </button>
          <button onClick={() => buttonPressed(taskId, "progress")}>
            PROGRESS
          </button>
          <button onClick={() => buttonPressed(taskId, "done")}>DONE</button>
        </>
      );
      break;
    case "progress":
      buttons = (
        <>
          <button onClick={() => buttonPressed(taskId, "backlog")}>
            BACKLOG
          </button>
          <button onClick={() => buttonPressed(taskId, "todo")}>TO-DO</button>
          <button onClick={() => buttonPressed(taskId, "done")}>DONE</button>
        </>
      );
      break;
    case "done":
      buttons = (
        <>
          <button onClick={() => buttonPressed(taskId, "backlog")}>
            BACKLOG
          </button>
          <button onClick={() => buttonPressed(taskId, "todo")}>TO-DO</button>
          <button onClick={() => buttonPressed(taskId, "progress")}>
            PROGRESS
          </button>
        </>
      );
      break;
    default:
      buttons = null;
  }
  return <>{buttons}</>;
}

export default GetButtons;
