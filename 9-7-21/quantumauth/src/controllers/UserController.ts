import argon2 from "argon2";
import uconnection from "../models/UDBConnect";
import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { connectToChannel } from "../rabbitMQ";
class UserController {
  public register = (request: Request, response: Response) => {
    //response.send("register!");
    //console.log(request.body.userDetails);
    const {
      fname,
      lname,
      email,
      password,
      mobileNumber,
      resumeLink,
      portfolioUrl,
      referral,
      jobUpdatesViaEmail,
      profilepicLink,
      jobPrefrences,
      usertype,
    } = request.body.userDetails;

    const {
      aggPercent,
      college,
      collegeLocation,
      otherCollege,
      qualification,
      stream,
      yearOfPassing,
    } = request.body.qualifications;

    //response.send(request.body);
    argon2.hash(password).then((res) => {
      let hpassword = res;
      uconnection.query(
        "call userdetail(?,?,?,?,?,?,?,?,?,?,?,?);",
        [
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
        ],
        (err, result) => {
          if (err) throw err;
          if (result) {
            let u = JSON.parse(JSON.stringify(result[0]));
            let userid = u[0].user_id;
            uconnection.query(
              "call eduqual(?,?,?,?,?,?,?);",
              [
                userid,
                aggPercent,
                yearOfPassing,
                qualification,
                stream,
                college,
                collegeLocation,
              ],
              (err, result) => {
                if (err) throw err;
              }
            );

            if (usertype === "fresher") {
              const { prevApplicationRolefr, fresherStack, otherFresherTech } =
                request.body.fresher;
              uconnection.query(
                "call fresher(?,?,?,?);",
                [userid, prevApplicationRolefr, fresherStack, otherFresherTech],
                (err, result) => {
                  if (result) {
                    const channel = connectToChannel();
                    channel.then((c) => {
                      c?.sendToQueue(
                        "user_register",
                        Buffer.from(JSON.stringify({ id: userid, email }))
                      );
                    });
                    response.send({ status: "user registered!" });
                  }

                  if (err) throw err;
                }
              );
            } else {
              const {
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
              } = request.body.experienced;

              uconnection.query(
                "call experience(?,?,?,?,?,?,?,?,?,?,?);",
                [
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
                ],
                (err, result) => {
                  if (result) {
                    const channel = connectToChannel();
                    channel.then((c) => {
                      c?.sendToQueue(
                        "user_register",
                        Buffer.from(JSON.stringify({ id: userid, email }))
                      );
                    });
                    response.send({ status: "user registered!" });
                  }
                  if (err) throw err;
                }
              );
            }
          }
        }
      );
    });
  };

  public login = (request: Request, response: Response) => {
    //response.send("mvc it is!");

    const { email, password } = request.body;
    //console.log(req.body);
    if (!email || !password) {
      return response.status(422).json({ error: "please add all fields!" });
    }

    uconnection.query(
      "select user_id,password from user where email = ?;",
      [email],
      function (err, result) {
        if (result) {
          let fr = result[0];

          argon2.verify(fr.password, password).then((match: boolean) => {
            if (match) {
              const token = jwt.sign({ id: fr.user_id }, JWT_SECRET);
              const channel = connectToChannel();
              channel.then((c) => {
                c?.sendToQueue(
                  "user_login",
                  Buffer.from(JSON.stringify({ email, id: fr.user_id }))
                );
              });
              response.send({ token, user: { id: fr.user_id } });
            } else {
              return response
                .status(422)
                .send({ error: "Invalid credentials!" });
            }
          });
        }
      }
    );
  };

  public fetchoptions = (request: Request, response: Response) => {
    let options: any = {};
    uconnection.query("select * from jobrole;", (err, result) => {
      if (err) throw err;
      options.jobs = result;
      uconnection.query("select * from techstack;", (err, result) => {
        if (err) throw err;
        options.tech = result;
        response.send(options);
      });
    });
  };
}

export default UserController;
