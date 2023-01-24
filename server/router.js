import { Router } from "express";

const router = Router();

router.get("/projects", (req, res) => {
    res.json({ message: "Project" })
})

export default router;