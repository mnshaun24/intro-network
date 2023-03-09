import { Router } from "express";
import { login } from "../utils/auth.js";

const router = Router();

router.post("/login", login);

module.exports = router;