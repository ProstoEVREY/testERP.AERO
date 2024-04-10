import { Request, Response } from "express";

export const latencyService = (req: Request, res: Response) => {
  const startTime = Date.now();

  setTimeout(() => {
    const endTime = Date.now();
    const latency = endTime - startTime;
    res.json({ latency: `${latency} ms` });
  }, 1);
};
