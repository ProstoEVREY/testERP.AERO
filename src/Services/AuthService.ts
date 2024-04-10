import { Request, Response } from "express";

export const authService = (req: Request, res: Response) => {
  res.send("Hello from Auth");
};
