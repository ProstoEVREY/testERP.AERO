import { Router } from "express";
import { infoService } from "../Services/InfoService";
import { AuthMiddleware } from "../Middleware/AuthMiddleware";

const router = Router();

router.get("/info", AuthMiddleware, infoService);

export { router as InfoRouter };
