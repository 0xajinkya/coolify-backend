import { Router } from "express";
import { createCollectionVal, currentUserWHeader, isLoggedIn, isValidUser, validateRequest } from "../middlewares";
import { createCollection, deleteCollection, getMetadataOfSingleCollection, getMyCollection, getShareSingleCollection, getSingleCollection, togglePostToCollection } from "../controllers";

const router = Router();

router.post("/", createCollectionVal, validateRequest, currentUserWHeader, isValidUser, createCollection);
router.get("/", currentUserWHeader, isValidUser, getMyCollection);
router.get("/:id", currentUserWHeader, isValidUser, getSingleCollection);
router.get("/meta/:id", getMetadataOfSingleCollection)
router.put("/toggle/:id", currentUserWHeader, isValidUser, togglePostToCollection)
router.delete("/:id", currentUserWHeader, isValidUser, deleteCollection)
router.get("/share/:id", currentUserWHeader, isValidUser, getShareSingleCollection)

export { router as extCollectionRouter }