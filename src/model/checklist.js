const mongoose = require('mongoose');

// sets Checklists' schema with values' types

const checkListSchema = mongoose.Schema({
    name: {type: String, required: true},
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
});

// exports model relating the 'checklists' collection with the schema

module.exports = mongoose.model('Checklist', checkListSchema);