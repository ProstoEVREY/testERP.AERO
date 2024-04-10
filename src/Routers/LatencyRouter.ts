import { Router } from "express";
import { latencyService } from "../Services/LatencyRouter";

const router = Router();

router.use("/latency", latencyService);

export { router as LatencyRouter };
