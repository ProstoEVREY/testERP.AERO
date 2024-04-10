import { Request, Response, NextFunction } from "express";

export const NotFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(404).send("404. Sorry can't find that!");
};
