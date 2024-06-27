import { Router } from "express";
import { createCollectionVal, currentUserWHeader, isLoggedIn, isValidUser, validateRequest } from "../middlewares";
import { createCollection, deleteCollection, getMyCollection, getSingleCollection, togglePostToCollection } from "../controllers";

const router = Router();

router.post("/", createCollectionVal, validateRequest, currentUserWHeader, isValidUser, createCollection);
router.get("/", currentUserWHeader, isValidUser, getMyCollection);
router.get("/:id", currentUserWHeader, isValidUser, getSingleCollection)
router.put("/toggle/:id", currentUserWHeader, isValidUser, togglePostToCollection)
router.delete("/:id", currentUserWHeader, isValidUser, deleteCollection)

export { router as extCollectionRouter }