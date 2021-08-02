"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
const UDBConnect_1 = __importDefault(require("../models/UDBConnect"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const rabbitMQ_1 = require("../rabbitMQ");
class UserController {
    constructor() {
        this.register = (request, response) => {
            const { fname, lname, email, password, mobileNumber, resumeLink, portfolioUrl, referral, jobUpdatesViaEmail, profilepicLink, jobPrefrences, usertype, } = request.body.userDetails;
            const { aggPercent, college, collegeLocation, otherCollege, qualification, stream, yearOfPassing, } = request.body.qualifications;
            argon2_1.default.hash(password).then((res) => {
                let hpassword = res;
                UDBConnect_1.default.query("call userdetail(?,?,?,?,?,?,?,?,?,?,?,?);", [
                    fname,
                    lname,
                    email,
                    hpassword,
                    mobileNumber,
                    resumeLink,
                    portfolioUrl,
                    referral,
                    jobUpdatesViaEmail,
                    profilepicLink,
                    jobPrefrences,
                    usertype,
                ], (err, result) => {
                    if (err)
                        throw err;
                    if (result) {
                        let u = JSON.parse(JSON.stringify(result[0]));
                        let userid = u[0].user_id;
                        UDBConnect_1.default.query("call eduqual(?,?,?,?,?,?,?);", [
                            userid,
                            aggPercent,
                            yearOfPassing,
                            qualification,
                            stream,
                            college,
                            collegeLocation,
                        ], (err, result) => {
                            if (err)
                                throw err;
                        });
                        if (usertype === "fresher") {
                            const { prevApplicationRolefr, fresherStack, otherFresherTech } = request.body.fresher;
                            UDBConnect_1.default.query("call fresher(?,?,?,?);", [userid, prevApplicationRolefr, fresherStack, otherFresherTech], (err, result) => {
                                if (result) {
                                    const channel = rabbitMQ_1.connectToChannel();
                                    channel.then((c) => {
                                        c === null || c === void 0 ? void 0 : c.sendToQueue("user_register", Buffer.from(JSON.stringify({ id: userid, email })));
                                    });
                                    response.send({ status: "user registered!" });
                                }
                                if (err)
                                    throw err;
                            });
                        }
                        else {
                            const { yearsExp, currentCTC, expectedCTC, noticePeriodEndDate, noticePeriodInterval, prevApplicationRoleEx, otherExpTech, otherFamiliarTech, proExpStack, proFamStack, } = request.body.experienced;
                            UDBConnect_1.default.query("call experience(?,?,?,?,?,?,?,?,?,?,?);", [
                                userid,
                                yearsExp,
                                currentCTC,
                                expectedCTC,
                                noticePeriodEndDate,
                                noticePeriodInterval,
                                prevApplicationRoleEx,
                                otherExpTech,
                                otherFamiliarTech,
                                proExpStack,
                                proFamStack,
                            ], (err, result) => {
                                if (result) {
                                    const channel = rabbitMQ_1.connectToChannel();
                                    channel.then((c) => {
                                        c === null || c === void 0 ? void 0 : c.sendToQueue("user_register", Buffer.from(JSON.stringify({ id: userid, email })));
                                    });
                                    response.send({ status: "user registered!" });
                                }
                                if (err)
                                    throw err;
                            });
                        }
                    }
                });
            });
        };
        this.login = (request, response) => {
            const { email, password } = request.body;
            if (!email || !password) {
                return response.status(422).json({ error: "please add all fields!" });
            }
            UDBConnect_1.default.query("select user_id,password from user where email = ?;", [email], function (err, result) {
                if (result) {
                    let fr = result[0];
                    argon2_1.default.verify(fr.password, password).then((match) => {
                        if (match) {
                            const token = jsonwebtoken_1.default.sign({ id: fr.user_id }, config_1.JWT_SECRET);
                            const channel = rabbitMQ_1.connectToChannel();
                            channel.then((c) => {
                                c === null || c === void 0 ? void 0 : c.sendToQueue("user_login", Buffer.from(JSON.stringify({ email, id: fr.user_id })));
                            });
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
        this.fetchoptions = (request, response) => {
            let options = {};
            UDBConnect_1.default.query("select * from jobrole;", (err, result) => {
                if (err)
                    throw err;
                options.jobs = result;
                UDBConnect_1.default.query("select * from techstack;", (err, result) => {
                    if (err)
                        throw err;
                    options.tech = result;
                    response.send(options);
                });
            });
        };
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map