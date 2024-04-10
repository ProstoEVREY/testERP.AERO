import { Request, Response } from "express";

export const fileService = (req: Request, res: Response) => {
  res.send("Hello from File");
};
