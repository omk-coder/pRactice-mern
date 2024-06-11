import express from "express";
import { authtest } from "../controllers/auth.controller.js";
import { userLogin } from "../controllers/auth.controller.js";
import { signout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", authtest);
router.post("/signin", userLogin);
router.post("/signout", signout);
export default router;
