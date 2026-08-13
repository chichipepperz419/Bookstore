import { Router } from "express";
import { signUp, signin, updateAuthor, getAllAuthor, getOneAuthor, Register, deleteAuthor } from "../controllers/author.controllers.js";
import upload from "../configuration/multer.js";
import { validateUser } from "../middlewares/validate.js";
import { createUserSchema } from "../validator/user.validator.js";
const authorRouter = Router();
authorRouter.post("/signup", signUp);
authorRouter.post("/signin", signin);
authorRouter.patch("/updateAuthors/:id", upload.single("image"), updateAuthor);
authorRouter.get("/getAll", getAllAuthor);
authorRouter.get("/id", getOneAuthor);
authorRouter.post("/Register", validateUser(createUserSchema), Register);
authorRouter.delete("/deleteAuthor/:id", deleteAuthor);
export default authorRouter;
//# sourceMappingURL=author.routes.js.map