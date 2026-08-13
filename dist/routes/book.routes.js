import { Router } from "express";
import { createBook, updateBook, getOneBook, getAll } from "../controllers/book.controllers.js";
import upload from "../configuration/multer.js";
const bookRouter = Router();
bookRouter.post("/:authorsId", upload.single("coverimage"), createBook);
bookRouter.patch("/:id", updateBook);
bookRouter.get("/:id", getOneBook);
bookRouter.get("/", getAll);
export default bookRouter;
//# sourceMappingURL=book.routes.js.map