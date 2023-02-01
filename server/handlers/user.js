import { PrismaClient } from "@prisma/client";
import { checkPass, createJWT, hashPass } from "../utils/auth.js";

const prisma = new PrismaClient({
  errorFormat: 'pretty'
});

export const createUser = async (req, res) => {
  const { username, password } = req.body;
  const hash = await hashPass(password);
  try {
  const user = await prisma.user.create({
    data: {
      username: username,
      password: hash,
    },
  });

  const token = createJWT(user);
  res.json({ token });
  } catch (e) {
    console.log(e)
    res.status(400)
    res.json({ error: e })
  }
};

export const signIn = async (req, res) => {

  const { username, password } = req.body;
  
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
 
  const valid = await checkPass(password, user.password);

  if (!valid) {
    res.status(401);
    res.send("Invalid username and/or password");
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};