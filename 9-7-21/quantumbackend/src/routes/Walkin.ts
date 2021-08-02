import express from "express";
const walkinRouter = express.Router();
import WalkinController from "../controllers/WalkinController";
import rl from "../middleware/requirelogin";
const walkinController = new WalkinController();

walkinRouter.get("/", walkinController.getWalkins);

walkinRouter.get("/:id", rl.requirelogin, walkinController.getWalkinByID);

walkinRouter.post("/apply", walkinController.applyWalkin);

export default walkinRouter;
