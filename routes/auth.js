import express from "express";

import { auth } from "../controller/auth.js";

const router = express.Router();

router.post("/login", auth.userLogin);
router.post("/signup", auth.userSignup);
router.post("/fwd-pwd", auth.userForgotPassword);
router.post("/change-pwd", auth.userChangePassword);

export default router;
