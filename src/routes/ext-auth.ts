import { Router } from "express";
import { currentUserWHeader, signinUserVal, signupUserVal, validateRequest } from "../middlewares";
import { getMe, signinUser, signoutUser, signupUser } from "../controllers";

const router = Router();

router.post("/signup", signupUserVal, validateRequest, signupUser);
router.post("/signin", signinUserVal, validateRequest, signinUser)
router.post("/signout", signoutUser);
router.get("/me", currentUserWHeader, getMe);

export { router as extAuthRouter };
