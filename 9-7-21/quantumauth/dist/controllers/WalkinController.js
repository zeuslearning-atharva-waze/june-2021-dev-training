"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DBConnect_1 = __importDefault(require("../models/DBConnect"));
class WalkinController {
    constructor() {
        this.getWalkins = (request, response) => {
            DBConnect_1.default.query("call getWalkins('2021-07-1',30);", function (err, result) {
                if (err)
                    throw err;
                response.send(result);
            });
        };
        this.getWalkinByID = (request, response) => {
            DBConnect_1.default.query("call getWalkinDetails(?);", [request.params.id], function (err, result) {
                if (err)
                    throw err;
                response.send(result);
            });
        };
        this.applyWalkin = (request, response) => {
            const { userid, guid, prefrences, slotid, resumelink } = request.body;
            DBConnect_1.default.query("SELECT walk_in_id FROM walk_in where GUID = ?;", [guid], (err, result) => {
                let fr = result[0].walk_in_id;
                DBConnect_1.default.query("select user_id,walk_in_id from user_prefrence   where user_id = ? and walk_in_id = ?;", [userid, fr], (err, resultz) => {
                    if (resultz.length > 0) {
                        response
                            .status(322)
                            .send({ message: "you have already registered" });
                    }
                    else {
                        DBConnect_1.default.query("call bookWalkin(?,?,?,?,?);", [userid, guid, prefrences, slotid, resumelink], function (err, result) {
                            if (result) {
                                response.status(200).send(result);
                            }
                            else {
                                response.status(404).send(err);
                            }
                        });
                    }
                });
            });
        };
    }
}
exports.default = WalkinController;
//# sourceMappingURL=WalkinController.js.map