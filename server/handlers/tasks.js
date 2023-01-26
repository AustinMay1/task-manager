import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTask = async (req, res) => {
  const { title, description, dueDate, status, projectId } = req.body;

  const task = await prisma.task.create({
    data: {
      title: title,
      description: description,
      dueDate: dueDate,
      status: status,
      projectId: projectId,
    },
  });

  res.status(200);
  res.json({ data: task });
};

export const findTasks = async (req, res) => {
  const { projectId } = req.body;

  const tasks = await prisma.task.findMany({
    where: {
      projectId: projectId,
    },
  });

  res.status(200);
  res.json({ data: tasks });
};

export const updateTask = async (req, res) => {
  const { id, status } = req.body;

  const task = await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });

  res.status(200);
  res.json({ data: task });
};
