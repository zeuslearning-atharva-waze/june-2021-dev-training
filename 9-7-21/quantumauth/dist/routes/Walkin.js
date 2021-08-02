"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const walkinRouter = express_1.default.Router();
const WalkinController_1 = __importDefault(require("../controllers/WalkinController"));
const requirelogin_1 = __importDefault(require("../middleware/requirelogin"));
const walkinController = new WalkinController_1.default();
walkinRouter.get("/", walkinController.getWalkins);
walkinRouter.get("/:id", requirelogin_1.default.requirelogin, walkinController.getWalkinByID);
walkinRouter.post("/apply", walkinController.applyWalkin);
exports.default = walkinRouter;
//# sourceMappingURL=Walkin.js.map