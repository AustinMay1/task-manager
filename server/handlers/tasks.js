import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  errorFormat: "pretty",
});

export const createTask = async (req, res) => {
  const { title, description, dueDate, status, projectId } = req.body;
  try {
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
  } catch (e) {
    res.status(400);
    res.json({ error: e });
  }
};

export const findTasks = async (req, res) => {
  const { projectId } = req.body;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: projectId,
      },
    });

    res.status(200);
    res.json({ data: tasks });
  } catch (e) {
    res.status(400);
    res.json({ error: e });
  }
};

export const updateTask = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  try {
    const task = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: status,
      },
    });

    res.status(200);
    res.json({ data: task });
  } catch (e) {
    res.status(400);
    res.json({ error: e });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.delete({
      where: {
        id: id,
      },
    });

    res.status(200);
    res.json({ deleted: task });
  } catch (e) {
    res.status(400);
    res.json({ error: e });
  }
};
