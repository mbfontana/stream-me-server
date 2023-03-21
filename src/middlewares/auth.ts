import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";

export interface AuthenticatedRequest extends Request {
  user?: UserInstance | null;
}

function ensureAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authorizationHeaders = req.headers.authorization;

  if (!authorizationHeaders) {
    return res.status(401).json({ message: "Not Authorized. No token found." });
  } else {
    const token = authorizationHeaders.replace(/Bearer /, "");

    jwtService.verifyToken(token, async (err, decoded) => {
      if (err || typeof decoded === "undefined") {
        return res
          .status(401)
          .json({ message: "Not Authorized. Invalid token." });
      }

      const user = await userService.findByEmail((decoded as JwtPayload).email);
      req.user = user;
      next();
    });
  }
}

function ensureAuthViaQuery(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { token } = req.query;

  if (!token) {
    return res.status(401).json({ message: "Not Authorized. No token found." });
  }
  if (typeof token !== "string") {
    return res.status(401).json({ message: "Not Authorized. Invalid token." });
  }

  jwtService.verifyToken(token, async (err, decoded) => {
    if (err || typeof decoded === "undefined") {
      return res
        .status(401)
        .json({ message: "Not Authorized. Invalid token." });
    }

    const user = await userService.findByEmail((decoded as JwtPayload).email);
    req.user = user;
    next();
  });
}

export { ensureAuth, ensureAuthViaQuery };
