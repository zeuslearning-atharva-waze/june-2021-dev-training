import express from "express";
import UserController from "../controllers/UserController";
const router = express.Router();

const userController = new UserController();

class UserRoutes {
  public userlogin = router.post("/", userController.login);
}

export default UserRoutes;
