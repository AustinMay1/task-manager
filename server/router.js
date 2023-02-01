import { Router } from "express";

import {createProject, deleteProject, findProject, getProjects, updateProjStatus} from "./handlers/project.js";
import { createTask, findTasks, updateTask } from "./handlers/tasks.js";

const router = Router();

router.get("/projects/:id", findProject);
router.post("/projects/all", getProjects);
router.post("/projects", createProject);
router.delete("/projects/:id", deleteProject);
router.put("/projects/:id/status", updateProjStatus);

router.get("/tasks", findTasks);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id");

export default router;