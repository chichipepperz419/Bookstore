import express from "express";
import authorRouter from "./routes/author.routes.js";
import bookRouter from "./routes/book.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express()

app.use (express.json())
app.get("/", (req ,res)=> {
    res.send("API IS READY")

})
app.use("/author", authorRouter)
app.use("/Books", bookRouter)
app.use("/user", userRouter)
//https://bookstore-1-wc5m.onrender.com


export default app