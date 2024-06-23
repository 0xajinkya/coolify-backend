import { Router } from "express";
import { currentUser, currentUserWHeader, isValidUser, signinUserVal, signupUserVal, validateRequest } from "../middlewares";
import { getMe, resendVerificationEmail, signinUser, signoutUser, signupUser, verifyEmail } from "../controllers";

const router = Router();

router.post("/signup", signupUserVal, validateRequest, signupUser);
router.post("/resend", currentUserWHeader, isValidUser, resendVerificationEmail);
router.post("/verify", currentUserWHeader, isValidUser, verifyEmail);
router.post("/signout", signoutUser);
router.post("/signin", signinUserVal, validateRequest, signinUser);
// router.get("/me", currentUser, getMe)
router.get("/me", currentUserWHeader, getMe)

export { router as authRouter };
