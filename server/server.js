import express from "express"
import morgan from "morgan"

const app = express();

app.use(morgan('dev'))

app.get("/api", (req, res) => {
    res.json({users: ["user1", "user2", "user3"]})
})

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
})

