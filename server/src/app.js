const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const resumeRouter = require("./routes/resume.route")
const aiRouter = require("./routes/ai.route")

const app = express();

app.use(cors())
app.use(express.json())

app.use("/api/users", userRouter)
app.use("/api/resumes", resumeRouter)
app.use("/api/ai", aiRouter)

app.get("/", (req, res) => {
    res.send("Server is live.....");
    console.log("server is live");
})


module.exports = app;