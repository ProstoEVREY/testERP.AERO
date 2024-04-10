import { Request, Response, NextFunction } from "express";

// Middleware for the regex check

export function validate(req: Request, res: Response, next: NextFunction) {
  const id = req.body.id;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (!emailRegex.test(id) && !phoneRegex.test(id)) {
    return res
      .status(400)
      .json({ error: "Invalid email or phone number format" });
  }
  next();
}
