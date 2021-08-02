"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const Walkin_1 = __importDefault(require("./routes/Walkin"));
const rabbitMQ_1 = require("../../quantum-auth/src/rabbitMQ");
const PORT = config_1.appPORT;
rabbitMQ_1.connectToChannel().then((channel) => {
    channel === null || channel === void 0 ? void 0 : channel.assertQueue("hello", { durable: false });
    channel === null || channel === void 0 ? void 0 : channel.consume("hello", (msg) => {
        const data = msg === null || msg === void 0 ? void 0 : msg.content.toString();
        console.log(data);
    }, { noAck: true });
});
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(PORT, () => {
    console.log("app listening on port", PORT);
});
app.use("/walkin", Walkin_1.default);
process.on("beforeExit", () => {
    console.log("closing");
    rabbitMQ_1.connectToChannel().then((c) => {
        c === null || c === void 0 ? void 0 : c.close();
    });
});
//# sourceMappingURL=index.js.map