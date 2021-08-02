"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class RequireLogin {
    constructor() {
        this.requirelogin = (req, res, next) => {
            const { authorization } = req.headers;
            if (!authorization) {
                res.status(401).json({ error: "You must be logged in!" });
            }
            const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Bearer ", "");
            jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET, (err, payload) => {
                if (err) {
                    return res.status(401).json({ error: "You must be logged in!" });
                }
                const { id } = payload;
                req.body.user = id;
                next();
            });
        };
    }
}
const rl = new RequireLogin();
exports.default = rl;
//# sourceMappingURL=requirelogin.js.map