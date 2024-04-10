import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const infoService = (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ message: "Provide a token" });
    }

    const secret = process.env.JWT_SECRET_KEY ?? "DEFAULT";

    const tokenHeader = token.split(" ")[0];
    const tokenBody = token.split(" ")[1];

    jwt.verify(tokenBody, secret, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Failed to authenticate token. Forbidden" });
      }
      return res.status(200).json(decoded);
    });
  } catch (e) {
    console.error(e);
  }
};
