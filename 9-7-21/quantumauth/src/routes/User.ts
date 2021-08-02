import express from "express";
import UserController from "../controllers/UserController";
const userRouter = express.Router();

const userController = new UserController();
userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);
userRouter.get("/options", userController.fetchoptions);
export default userRouter;
