'use strict';

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: { type: String, required: [true, 'A task description is required'] },
  claimedBy: { type: String },
  reviewedBy: { type: String },
  notes: { type: String },
  status: { type: Number }
});

// export so other modules and scripts can use
module.exports = mongoose.model('tasks', taskSchema);