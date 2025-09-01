const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: { type: String, default: "" }, // Added description field
  status: { 
    type: String, 
    enum: ["pending", "completed", "deleted"], 
    default: "pending" 
  },
  dueDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
  deletedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("Todo", todoSchema);
