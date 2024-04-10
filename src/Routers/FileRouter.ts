import { Router } from "express";
import { fileService } from "../Services/FileService";

const router = Router();

router.use("/", fileService);

export { router as FileRouter };
