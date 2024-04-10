import { Router } from "express";
import { latencyService } from "../Services/LatencyRouter";
import { AuthMiddleware } from "../Middleware/AuthMiddleware";

const router = Router();

router.get("/latency", AuthMiddleware, latencyService);

export { router as LatencyRouter };
