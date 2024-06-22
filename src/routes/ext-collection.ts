import { Router } from "express";
import { createCollectionVal, currentUserWHeader, isLoggedIn, isValidUser, validateRequest } from "../middlewares";
import { createCollection, getMyCollection, togglePostToCollection } from "../controllers";

const router = Router();

router.post("/", createCollectionVal, validateRequest, currentUserWHeader, isValidUser, createCollection);
router.get("/", currentUserWHeader, isValidUser, getMyCollection);
router.put("/toggle/:id", currentUserWHeader, isValidUser, togglePostToCollection)

export { router as extCollectionRouter }