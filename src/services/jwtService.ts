import jwt from "jsonwebtoken";

const SECRET = "generic-jet-secret";

export const jwtService = {
  signToken: (payload: string | object | Buffer, expiration: string) => {
    return jwt.sign(payload, SECRET, { expiresIn: expiration });
  },
  verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
    return jwt.verify(token, SECRET, callbackfn);
  },
};
