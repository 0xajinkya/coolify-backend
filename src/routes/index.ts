import { Router } from "express";
import { roleRouter } from "./role";
import { authRouter } from "./user";
import { communityRouter } from "./community";
import { memberRouter } from "./member";
import { extAuthRouter } from "./ext-auth";
import { extCollectionRouter } from "./ext-collection";

const router = Router();

router.use("/role", roleRouter);
router.use("/auth", authRouter);
router.use("/community", communityRouter);
router.use("/member", memberRouter);
router.use("/collection", extCollectionRouter);

export { router as appRouter } ;

const extRouter = Router();

extRouter.use("/auth", extAuthRouter)
extRouter.use("/collection", extCollectionRouter);

export { extRouter as extensionRouter }