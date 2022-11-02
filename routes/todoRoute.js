import express from "express";
import { getTodos, createTodo, updateTodo, deleteTodo, getTodo } from "../controllers/todoController.js";
const router = express.Router();

//get all
router.get("/", getTodos);

//create
router.post("/", createTodo);

// //update
router.put("/:id", updateTodo);

// //delete
router.delete("/:id", deleteTodo);

// //get
router.get("/:id", getTodo);



export default router