"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const User_1 = __importDefault(require("./routes/User"));
const Walkin_1 = __importDefault(require("./routes/Walkin"));
const PORT = config_1.appPORT;
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const walkinRoutes = new Walkin_1.default();
const userRoutes = new User_1.default();
app.listen(PORT, () => {
    console.log("app listening on port", PORT);
});
app.use("/walkins", walkinRoutes.getWalkinRoute);
app.use("/walkin", walkinRoutes.getWalkinByIdRoute);
app.use("/walkin/apply", walkinRoutes.WalkinApply);
app.use("/user/login", userRoutes.userlogin);
//# sourceMappingURL=index.js.map