import { Router } from "express";
import {
  signup,
  getUsers,
  signin,
  refreshToken,
} from "../Services/AuthService";

const router = Router();

router.post("/signup", signup);
router.get("/users", getUsers);
router.post("/signin", signin);
router.post("/signin/new_token", refreshToken);

export { router as AuthRouter };
