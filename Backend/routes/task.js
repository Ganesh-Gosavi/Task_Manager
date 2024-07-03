const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const User = require("../models/user");
const mongoose = require("mongoose");

const moment = require("moment-timezone");
const verifyJwtToken = require("../middlewares/authMiddleware");

// This endpoint is created for task creation
router.post("/create", verifyJwtToken, async (req, res) => {
  try {
    const { title, priority, checklist, dueDate, status } = req.body;

    if (!title || !priority || !checklist) {
      return res.status(401).json({
        message: "Bad Request!",
        success: false,
      });
    }

    const taskDetails = new Task({
      title,
      priority,
      checklist,
      dueDate,
      status,
      refUserId: req.body.userId,
    });

    await taskDetails.save();
    res.json({
      message: "Task added successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong, please! try again later",
      success: false,
    });
  }
});

// This endpoint is created to display all the available or created task for a particular user, filter is also available.
router.get("/all", verifyJwtToken, async (req, res) => {
  try {
    const userId = req.body.userId;
    // Get's Current time in Indian standard time
    const today = moment().tz("Asia/kolkata");

    // Start of today in IST
    const startTimeOfToday = moment(today).startOf("day");

    // Start of 7 days ago in IST
    const weekAgo = moment(today).subtract(7, "days").startOf("day");

    // Start of 30 days ago in IST
    const startOfMonth = moment(today).subtract(30, "days").startOf("day");

    let filter = {};
    const typeOfFilter = req.query.typeOfFilter || "thisWeek";

    switch (typeOfFilter) {
      case "today":
        filter = {
          createdAt: {
            $gte: startTimeOfToday.toDate(),
            $lt: today.toDate(),
          },
        };
        break;

      case "thisWeek":
        filter = {
          createdAt: {
            $gte: weekAgo.toDate(),
            $lt: today.toDate(),
          },
        };
        break;

      case "thisMonth":
        filter = {
          createdAt: {
            $gte: startOfMonth.toDate(),
            $lt: today.toDate(),
          },
        };
        break;
      default:
        filter = {};
    }
    filter = {
      refUserId: {
        $eq: userId,
      },
      ...filter,
    };
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// This endpoint is created for editting or updating a particular task
router.put("/edit/:taskId", verifyJwtToken, async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { title, priority, checklist, status, dueDate } = req.body;

    if (!taskId || !title || !priority || !status || !checklist) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    const taskDetails = await Task.updateOne(
      { _id: taskId },
      {
        $set: {
          title,
          priority,
          checklist,
          status,
          dueDate,
        },
      }
    );

    if (!taskDetails) {
      return res.status(404).json({
        message: "Task not found",
        success: false,
      });
    }

    res.json({
      message: "Task details updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
});

// This endpoint is created to move or change the status of a task card
router.put("/:taskId/move", verifyJwtToken, async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { status } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;
    await task.save();

    res.json({
      message: "Task moved successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error moving task",
    });
  }
});

// This endpoint is created for sharing the tasks with others
router.get("/task-description/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const taskDetails = await Task.findById(taskId);

    if (!taskDetails) {
      return res.status(400).json({ message: "Task not found" });
    }

    res.json(taskDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
});

// This endpoint is created for deleting a particular task
router.delete("/delete-task/:taskId", verifyJwtToken, async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({ message: "Task deleted successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in deleting task",
    });
  }
});

// This endpoint is created to display the analytics of the tasks.
router.get("/analytics", verifyJwtToken, async (req, res) => {
  try {
    const userId = req.body.userId;
    const analyticData = {};

    // Count tasks with different statuses
    analyticData.backlogCount = await Task.countDocuments({
      refUserId: userId,
      status: "backlog",
    });

    analyticData.todoCount = await Task.countDocuments({
      refUserId: userId,
      status: "todo",
    });
    analyticData.progressCount = await Task.countDocuments({
      refUserId: userId,
      status: "progress",
    });
    analyticData.completedCount = await Task.countDocuments({
      refUserId: userId,
      status: "done",
    });

    // Count tasks based on priority
    analyticData.lowCount = await Task.countDocuments({
      refUserId: userId,
      "priority.typeOfPriority": "low",
      status: { $ne: "done" },
    });
    analyticData.moderateCount = await Task.countDocuments({
      refUserId: userId,
      "priority.typeOfPriority": "medium",
      status: { $ne: "done" },
    });
    analyticData.highCount = await Task.countDocuments({
      refUserId: userId,
      "priority.typeOfPriority": "high",
      status: { $ne: "done" },
    });

    // Count tasks with due dates whose status is not done
    analyticData.dueDateNotDoneCount = await Task.countDocuments({
      refUserId: userId,
      status: { $ne: "done" },
      dueDate: { $exists: true },
    });

    // Send the analytics data as response
    res.json({
      data: analyticData,
      success: true,
    });
  } catch (error) {
    console.log(error);
    // Return error response
    res.status(500).json({
      message: "Error fetching analytics data",
      success: false,
    });
  }
});

// This endpoint is created to update the changes in the board page checklist
router.put("/checklist/:taskId/:itemId", verifyJwtToken, async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const itemId = req.params.itemId;
    const { selected } = req.body;

    // Validate request parameters
    if (!taskId || !itemId) {
      return res.status(401).json({
        message: "Bad Request",
        success: false,
      });
    }

    // Find and update the specific checklist item
    const task = await Task.findOneAndUpdate(
      { _id: taskId, "checklist._id": itemId },
      { $set: { "checklist.$.selected": selected } },
      { new: true }
    );

    // If task or checklist item not found, return error response
    if (!task) {
      return res.status(400).json({
        message: "Task or checklist item not found",
        success: false,
      });
    }

    // Send the updated task as response
    res.json({
      task: task,
      message: "Checklist item updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    // Return error response
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

router.put("/addRefUserId", async (req, res) => {
  const { refUserId, email } = req.body;

  if (!mongoose.Types.ObjectId.isValid(refUserId)) {
    return res.status(400).send({ error: "Invalid user ID provided" });
  }

  try {
    // Fetch the user to ensure it exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Log the user details
    console.log(`User found: ${user}`);

    // Fetch tasks with the given refUserId
    const tasks = await Task.find({ refUserIds: refUserId });

    // Log the number of tasks found
    console.log(`Number of tasks found: ${tasks.length}`);

    if (tasks.length === 0) {
      return res
        .status(404)
        .send({ error: "No tasks found for the provided refUserId" });
    }

    // Add newRefUserId to each task, ensuring no duplicates
    const updatedTasks = await Promise.all(
      tasks.map(async (task) => {
        if (!task.refUserIds.includes(user._id)) {
          task.refUserIds.push(user._id);
          return task.save();
        }
        return task;
      })
    );

    res.send(updatedTasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
