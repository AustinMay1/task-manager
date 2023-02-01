import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  errorFormat: "pretty",
});

export const createProject = async (req, res) => {
  const { title, description, userId, status } = req.body;
  try {
    const project = await prisma.project.create({
      data: {
        title: title,
        description: description,
        userId: userId,
        // userId refers to the user's username
        status: status,
      },
    });

    res.status(200);
    res.json({ data: project });
  } catch (e) {
    res.status(400);
    res.json({ error: e });
  }
};

export const findProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: id,
      },
      include: {
        tasks: true,
      },
    });

    res.status(200);
    res.json({ data: project });
  } catch (e) {
    res.status(400);
    res.json({ error: e });
  }
};

export const getProjects = async (req, res) => {
  const { username } = req.body;

  try {
    const project = await prisma.project.findMany({
      where: {
        userId: {
          equals: username,
        },
      },
      include: {
        tasks: true,
      },
    });
    res.status(200);
    res.json({ data: project });
  } catch (e) {
    console.error(e);
    res.status(404);
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await prisma.project.delete({
      where: {
        id: id,
      },
    });
    res.status(200);
    res.json({ deleted: project });
  } catch (e) {
    res.status(404);
    res.json({ error: e });
  }
};

export const updateProjStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const project = await prisma.project.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
    res.status(200);
    res.json({ updated: project });
  } catch (e) {
    res.status(404);
    res.json({ error: e });
  }
};
