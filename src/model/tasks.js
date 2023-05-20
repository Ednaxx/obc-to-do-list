const mongoose = require('mongoose');

// sets Tasks' schema with values' types

const checkListSchema = mongoose.Schema({
    name: {type: String, required: true},
    completed: {type: Boolean, default: false},
    checklistId: {type: mongoose.Schema.Types.ObjectId, ref: 'Checklist', required: true}
});

// exports model relating the 'tasks' collection with the schema

module.exports = mongoose.model('Task', checkListSchema);