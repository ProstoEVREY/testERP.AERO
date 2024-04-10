import { Router } from "express";
import { latencyService } from "../Services/LatencyService";
import { AuthMiddleware } from "../Middleware/AuthMiddleware";
import { InvalidatedMiddleware } from "../Middleware/InvalidatedMiddleware";

const router = Router();

router.get("/latency", AuthMiddleware, InvalidatedMiddleware, latencyService);

export { router as LatencyRouter };
