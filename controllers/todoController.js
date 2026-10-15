const mongoose = require("mongoose");
const Todo = require("../model/Todo");

// GET all todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch todos",
      error: error.message,
    });
  }
};

// GET single todo
const getTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Todo ID format",
      });
    }

    const todo = await Todo.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch todo",
      error: error.message,
    });
  }
};

// CREATE todo
const createTodo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const todo = await Todo.create({
      title: title.trim(),
      user: req.user.id,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create todo",
      error: error.message,
    });
  }
};

// UPDATE todo
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Todo ID format",
      });
    }

    const { title, completed } = req.body;

    const updates = {};

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          message: "Title cannot be empty",
        });
      }

      updates.title = title.trim();
    }

    if (completed !== undefined) {
      updates.completed = completed;
    }

    const todo = await Todo.findOneAndUpdate(
      {
        _id: id,
        user: req.user.id,
      },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update todo",
      error: error.message,
    });
  }
};

// DELETE todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Todo ID format",
      });
    }

    const todo = await Todo.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
      id: todo._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete todo",
      error: error.message,
    });
  }
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
