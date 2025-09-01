const Todo = require("../models/Todo");
const sendWhatsApp = require("../utils/sendWhatsApp");

// Get all todos for user
exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ todos });
};

// Create todo
exports.createTodo = async (req, res) => {
  const { name, dueDate, description } = req.body; // added description
  const todo = await Todo.create({
    user: req.user._id,
    name,
    dueDate,
    description: description || "" // default empty string if not provided
  });
  res.status(201).json({ todo });
};

// Update todo (status, dueDate, description)
exports.updateTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  if (todo.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  const { name, status, dueDate, description } = req.body;
  if (name) todo.name = name;
  if (status) {
    todo.status = status;
    if (status === "completed") todo.completedAt = new Date();
  }
  if (dueDate) todo.dueDate = dueDate;
  if (description !== undefined) todo.description = description;

  await todo.save();
  res.json({ todo });
};

// Soft delete
exports.deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  if (todo.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  todo.status = "deleted";
  todo.deletedAt = new Date();
  await todo.save();

  res.json({ todo });
};

// Restore
exports.restoreTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  if (todo.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  todo.status = "pending";
  todo.deletedAt = null;
  await todo.save();

  res.json({ todo });
};

// Update user phone
exports.updatePhone = async (req, res) => {
  req.user.phone = req.body.phone;
  await req.user.save();
  res.json({ phone: req.user.phone });
};
