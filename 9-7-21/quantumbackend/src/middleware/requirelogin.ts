import { JWT_SECRET } from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

class RequireLogin {
  public requirelogin = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({ error: "You must be logged in!" });
    }
    const token = authorization?.replace("Bearer ", "") as string;
    jwt.verify(token, JWT_SECRET, (err, payload: any) => {
      if (err) {
        return res.status(401).json({ error: "You must be logged in!" });
      }
      const { id } = payload;
      req.body.user = id;
      next();
    });
  };
}

const rl = new RequireLogin();

export default rl;
