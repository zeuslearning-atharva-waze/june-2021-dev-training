import express from "express";
const router = express.Router();
import WalkinController from "../controllers/WalkinController";

const walkinController = new WalkinController();

class WalkinRoutes {
  public getWalkinRoute = router.get("/", walkinController.getWalkins);

  public getWalkinByIdRoute = router.get(
    "/:id",
    walkinController.getWalkinByID
  );

  public WalkinApply = router.post("/", walkinController.applyWalkin);
}

export default WalkinRoutes;
