import { Request, Response } from "express";

export const latencyService = (req: Request, res: Response) => {
  res.send("Hello from Latency");
};
