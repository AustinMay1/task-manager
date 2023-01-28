import { Router } from "express";

import { createProject, findProject, getProjects } from "./handlers/project.js";
import { createTask, findTasks, updateTask } from "./handlers/tasks.js";

const router = Router();

router.get("/projects/:id", findProject);
router.post("/projects/all", getProjects);
router.post("/projects", createProject);

router.get("/tasks", findTasks);
router.post("/tasks", createTask);
router.put("/tasks", updateTask);

export default router;