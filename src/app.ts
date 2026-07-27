import express from "express";
import authorRouter from "./routes/author.routes.js";
import bookRouter from "./routes/book.routes.js";

const app = express()

app.use (express.json())
app.get("/", (req ,res)=> {
    res.send("API IS READY")

})
app.use("/author", authorRouter)
app.use("/Books", bookRouter)

export default app