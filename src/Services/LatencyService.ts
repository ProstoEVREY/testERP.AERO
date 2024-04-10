import { Request, Response } from "express";

export const latencyService = (req: Request, res: Response) => {
  const start = process.hrtime();
  const end = process.hrtime(start);

  const microseconds = (end[0] * 1e6 + end[1] / 1e3).toFixed(2);
  return res.status(200).json({ latency: `${microseconds} mics` });
};
