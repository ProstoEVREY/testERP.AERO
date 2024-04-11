import { Router } from "express";
import { signup, signin, refreshToken, logout } from "../Services/AuthService";
import { AuthMiddleware } from "../Middleware/AuthMiddleware";
import { InvalidatedMiddleware } from "../Middleware/InvalidatedMiddleware";
import { validate } from "../Middleware/RegexMiddleware";

const router = Router();

router.post("/signup", validate, signup);
router.post("/signin", signin);
router.post("/signin/new_token", refreshToken);
router.get("/logout", AuthMiddleware, InvalidatedMiddleware, logout);

export { router as AuthRouter };
