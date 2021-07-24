import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import connection from "../models/DBConnect";
import { Response, Request } from "express";

class UserController {
  public login = (request: Request, response: Response) => {
    //response.send("mvc it is!");
    const { email, password } = request.body;
    //console.log(req.body);
    if (!email || !password) {
      return response.status(422).json({ error: "please add all fields!" });
    }

    connection.query(
      "select user_id,password from user where email = ?;",
      [email],
      function (err, result) {
        if (result) {
          let fr = result[0];

          argon2.verify(fr.password, password).then((match: boolean) => {
            if (match) {
              const token = jwt.sign({ id: fr.user_id }, JWT_SECRET);
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
}

export default UserController;
