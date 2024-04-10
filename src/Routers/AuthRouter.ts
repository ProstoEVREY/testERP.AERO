import { Router } from "express";
import { authService } from "../Services/AuthService";

const router = Router();

router.use("/auth", authService);

export { router as AuthRouter };
