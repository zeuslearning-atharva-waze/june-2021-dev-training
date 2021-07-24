"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const DBConnect_1 = __importDefault(require("../models/DBConnect"));
class UserController {
    constructor() {
        this.login = (request, response) => {
            const { email, password } = request.body;
            if (!email || !password) {
                return response.status(422).json({ error: "please add all fields!" });
            }
            DBConnect_1.default.query("select user_id,password from user where email = ?;", [email], function (err, result) {
                if (result) {
                    let fr = result[0];
                    argon2_1.default.verify(fr.password, password).then((match) => {
                        if (match) {
                            const token = jsonwebtoken_1.default.sign({ id: fr.user_id }, config_1.JWT_SECRET);
                            response.send({ token, user: { id: fr.user_id } });
                        }
                        else {
                            return response
                                .status(422)
                                .send({ error: "Invalid credentials!" });
                        }
                    });
                }
            });
        };
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map