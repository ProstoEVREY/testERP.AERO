import { Request, Response } from "express";

export const infoService = (req: Request, res: Response) => {
  res.send("Hello from Info");
};
