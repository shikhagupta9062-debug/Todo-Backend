const express = require("express");

const protect = require("../middleware/authmiddleware");

const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

const router = express.Router();

// All routes below require JWT authentication
router.use(protect);

// GET all todos
router.get("/", getTodos);


// GET single todo
router.get("/:id", getTodo);

// CREATE todo
router.post("/", createTodo);

// UPDATE todo
router.put("/:id", updateTodo);

// DELETE todo
router.delete("/:id", deleteTodo);

module.exports = router;




// GET all todos
// router.get("/", protect ,getTodos);