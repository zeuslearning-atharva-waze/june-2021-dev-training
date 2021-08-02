"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const userRouter = express_1.default.Router();
const userController = new UserController_1.default();
userRouter.post("/login", userController.login);
exports.default = userRouter;
//# sourceMappingURL=User.js.map