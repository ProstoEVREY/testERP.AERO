import { Router } from "express";
import { infoService } from "../Services/InfoService";
import { AuthMiddleware } from "../Middleware/AuthMiddleware";
import { InvalidatedMiddleware } from "../Middleware/InvalidatedMiddleware";

const router = Router();

router.get("/info", AuthMiddleware, InvalidatedMiddleware, infoService);

export { router as InfoRouter };
