import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET_KEY ?? "DEFAULT";

interface CustomRequest extends Request {
  user?: any;
}

export const AuthMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided. Forbidden" });
  }

  const tokenHeader = token.split(" ")[0];
  const tokenBody = token.split(" ")[1];

  if (tokenHeader != "Bearer") {
    return res
      .status(400)
      .json({ message: "The token is not an access token or is invalid" });
  }

  jwt.verify(tokenBody, secret, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Failed to authenticate token. Forbidden" });
    }

    req.user = decoded;
    next();
  });
};
