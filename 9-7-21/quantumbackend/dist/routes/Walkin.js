"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const WalkinController_1 = __importDefault(require("../controllers/WalkinController"));
const walkinController = new WalkinController_1.default();
class WalkinRoutes {
    constructor() {
        this.getWalkinRoute = router.get("/", walkinController.getWalkins);
        this.getWalkinByIdRoute = router.get("/:id", walkinController.getWalkinByID);
        this.WalkinApply = router.post("/", walkinController.applyWalkin);
    }
}
exports.default = WalkinRoutes;
//# sourceMappingURL=Walkin.js.map