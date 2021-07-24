import { Response, Request } from "express";
import connection from "../models/DBConnect";
class WalkinController {
  public getWalkins = (request: Request, response: Response) => {
    //response.send("mvc it is!");
    connection.query(
      "call getWalkins('2021-07-1',30);",
      function (err, result) {
        if (err) throw err;
        response.send(result);
      }
    );
  };

  public getWalkinByID = (request: Request, response: Response) => {
    //response.send(request.params.id);
    connection.query(
      "call getWalkinDetails(?);",
      [request.params.id],
      function (err, result) {
        if (err) throw err;
        response.send(result);
      }
    );
  };
  public applyWalkin = (request: Request, response: Response) => {
    //response.send(request.params.id);
    const { userid, guid, prefrences, slotid, resumelink } = request.body;

    connection.query(
      "SELECT walk_in_id FROM walk_in where GUID = ?;",
      [guid],
      (err, result) => {
        let fr = result[0].walk_in_id;
        connection.query(
          "select user_id,walk_in_id from user_prefrence   where user_id = ? and walk_in_id = ?;",
          [userid, fr],
          (err, resultz) => {
            if (resultz.length > 0) {
              response
                .status(322)
                .send({ message: "you have already registered" });
            } else {
              connection.query(
                "call bookWalkin(?,?,?,?,?);",
                [userid, guid, prefrences, slotid, resumelink],
                function (err, result) {
                  if (result) {
                    response.status(200).send(result);
                  } else {
                    response.status(404).send(err);
                  }
                }
              );
            }
          }
        );
      }
    );
  };
}

export default WalkinController;
