import { Request, Response, NextFunction } from "express";

import { prisma } from "../..";

// Middleware for checking Invalidated Tokens

export const InvalidatedMiddleware = async (
  req: Request,
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
  const potentialToken = await prisma.invalidatedToken.findFirst({
    where: {
      tokenstr: token,
    },
  });

  if (potentialToken) {
    return res.status(400).json({ message: "Token in invalidated. Forbidden" });
  }

  next();
};
