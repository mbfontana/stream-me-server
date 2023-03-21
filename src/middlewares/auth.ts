import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";

export interface AuthenticatedRequest extends Request {
  user?: UserInstance | null;
}

export default function ensureAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authorizationHeaders = req.headers.authorization;

  if (!authorizationHeaders) {
    return res.status(401).json({ message: "Not Authorized. No token found." });
  } else {
    const token = authorizationHeaders.replace(/Bearer /, "");

    jwtService.verifyToken(token, (err, decoded) => {
      if (err || typeof decoded === "undefined") {
        return res
          .status(401)
          .json({ message: "Not Authorized. Invalid token." });
      }

      userService.findByEmail((decoded as JwtPayload).email).then((user) => {
        req.user = user;
        next();
      });
    });
  }
}
