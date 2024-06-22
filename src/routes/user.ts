import { Router } from "express";
import { currentUser, currentUserWHeader, signinUserVal, signupUserVal, validateRequest } from "../middlewares";
import { getMe, signinUser, signoutUser, signupUser } from "../controllers";

const router = Router();

router.post("/signup", signupUserVal, validateRequest, signupUser);
router.post("/signout", signoutUser);
router.post("/signin", signinUserVal, validateRequest, signinUser);
// router.get("/me", currentUser, getMe)
router.get("/me", currentUserWHeader, getMe)

export { router as authRouter };
