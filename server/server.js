import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { body, check, validationResult } from "express-validator";
import router from "./router.js";
import { authorize } from "./utils/auth.js";
import { createUser, signIn } from "./handlers/user.js";

const app = express();

dotenv.config();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api", authorize, router);

app.post("/register",createUser);
app.post("/login", signIn);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
