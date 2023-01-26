import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProject = async (req, res) => {
  const { title, description, userId } = req.body;

  const project = await prisma.project.create({
    data: {
      title: title,
      description: description,
      userId: userId,
      // userId refers to the user's username
    },
  });

  res.status(200);
  res.json({ data: project });
};

export const findProject = async (req, res) => {
  const { id } = req.params;
  
  const project = await prisma.project.findUnique({
    where: {
      id: id,
    },
  });

  res.status(200);
  res.json({ data: project });
};