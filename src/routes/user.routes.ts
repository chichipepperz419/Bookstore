import { Router } from "express"
import { registerUser, loginUser, getAllUsers, updateUsers, getOneUser, deleteUser  } from "../controllers/user.controllers.js"

const userRouter = Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.patch("/update/:id", updateUsers)
userRouter.get("/", getAllUsers)
userRouter.get("/:id", getOneUser)
userRouter.delete("/delete/:id", deleteUser)

export default userRouter