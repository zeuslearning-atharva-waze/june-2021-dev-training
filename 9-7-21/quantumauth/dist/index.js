"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const User_1 = __importDefault(require("./routes/User"));
const rabbitMQ_1 = require("./rabbitMQ");
const PORT = config_1.appPORT;
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(PORT, () => {
    console.log("app listening on port", PORT);
});
app.use("/user", User_1.default);
process.on("beforeExit", () => {
    console.log("closing");
    rabbitMQ_1.connectToChannel().then((c) => {
        c === null || c === void 0 ? void 0 : c.close();
    });
});
//# sourceMappingURL=index.js.map