import { Router } from "express";
import { infoService } from "../Services/InfoService";

const router = Router();

router.use("/info", infoService);

export { router as InfoRouter };
