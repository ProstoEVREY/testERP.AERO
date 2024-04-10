import { Request, Response } from "express";

export const fileService = (req: Request, res: Response) => {
  return res.send("Hello from File");
};
