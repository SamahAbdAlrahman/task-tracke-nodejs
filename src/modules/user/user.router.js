import { Router } from 'express';
import  taskModel  from '../../../DB/models/task.model.js';
import  auth_user from '../../middleware/auth_user.js'; 

const router = Router();
// add task
router.post('/newtask',
     auth_user(), 
     async (req, res) => {
  try {

    const { title, description, dueDate, priority } = req.body;
    const task = await taskModel.create({
      title,
      description,
      dueDate,
      priority,
      user_id: req.user.id, // ربط التاسك بالمستخدم الي ارسل التوكن
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: "Error creating task" });
  }
});

// get all my tasks
router.get('/userTasks', auth_user(),  async (req, res) => {
    try {
      const tasks = await taskModel.findAll({
        where: { user_id: req.user.id ,isCompleted: false}, 
        attributes: [ 'task_id','title', 'description', 'dueDate', 'isCompleted', 'priority', 'createdAt']
      });

      res.status(200).json({ message: "User tasks returned successfully", tasks });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: "server error" });
    }
});
// get tasks on a specific date
router.get('/userTasks/:dateIntered', auth_user(), async (req, res) => {
  try {
    const { dateIntered } = req.params; 

    const tasks = await taskModel.findAll({
      where: {
        user_id: req.user.id,  
        dueDate: dateIntered
        ,isCompleted: false 
      },
    });

    if (tasks.length == 0) {
      return res.status(404).json({ message: "No tasks found for this date" });
    }

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});
// update task
router.put('/update/:taskId', auth_user(), async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, dueDate, priority} = req.body;

    const task = await taskModel.findOne({
      where: {
        task_id: taskId,
        user_id: req.user.id,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;
    if (priority) task.priority = priority;

    await task.save(); 

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Error updating task" });
  }
});
// make task : complete
router.put('/completTask/:taskId', auth_user(), async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await taskModel.findOne({
      where: {
        task_id: taskId,
        user_id: req.user.id,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.isCompleted = true;


    await task.save(); 

    res.status(200).json({ message: "Task completed", task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Error updating task" });
  }
});

//get my completed tasks
router.get('/completedTasks', auth_user(),  async (req, res) => {
  try {
    const tasks = await taskModel.findAll({
      where: { 
        user_id: req.user.id,  
        isCompleted: true 
      },  
      attributes: ['title', 'description', 'dueDate', 'priority', 'createdAt']
    });

    res.status(200).json({ message: "completed tasks", tasks });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: "server error" });
  }
});
// change priority
router.put('/changePriority', auth_user(), async (req, res) => {
  try {
    const { task_id, priority} = req.body;
    if (![0, 1, 2].includes(priority)) {
      return res.status(400).json({ message: "Invalid priority value. Must be 0, 1, or 2" });
    }


    const task = await taskModel.findOne({
      where: {
        task_id: task_id,
        user_id: req.user.id,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.priority = priority;

    await task.save(); 

    res.status(200).json({ message: "Task priority updated successfully", task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Error updating task" });
  }
});
// get tasks ordered by priority (highest to lowest)
router.get('/tasksByPriority', auth_user(), async (req, res) => {
  try {
    const tasks = await taskModel.findAll({
      where: { user_id: req.user.id ,isCompleted: false},  
      order: [['priority', 'DESC']], 
      attributes: ['title', 'description','priority']
    });

    res.status(200).json({ message: "Tasks ordered by priority", tasks });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
