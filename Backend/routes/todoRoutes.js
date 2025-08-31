const express = require("express");
const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  restoreTodo,
  updatePhone
} = require("../controllers/todoController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.put("/:id/restore", restoreTodo);
router.put("/update-phone", updatePhone);

module.exports = router;
