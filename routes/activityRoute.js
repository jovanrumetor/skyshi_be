import express from "express";
import { getActivities, createActivity, updateActivity, deleteActivity, getActivity } from "../controllers/activityController.js";
const router = express.Router();

//get all
router.get("/", getActivities);

//create
router.post("/", createActivity);

// //update
router.put("/:id", updateActivity);

// //delete
router.delete("/:id", deleteActivity);

// //get
router.get("/:id", getActivity);



export default router