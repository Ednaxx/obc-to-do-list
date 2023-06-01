const express = require('express');
const Checklist = require('../model/checklist');
const Task = require('../model/task');

// creating router

const checklistDependentRoute = express.Router();
const simpleRouter = express.Router();


checklistDependentRoute.get('/:id/tasks/new', async (req, res) => {
    try {
        let task = Task();
        res.status(200).render('tasks/new', { checklistId: req.params.id, task: task });
    }
    catch (err) {
        res.status(500).render('pages/error', { error: err });
    }
});

simpleRouter.delete('/:id', async (req, res) => {
    try {
        let task = await Task.findByIdAndDelete(req.params.id);
        let checklist = await Checklist.findById(task.checklistId);
        let taskToRemove = checklist.tasks.indexOf(req.params.id);
        checklist.tasks.splice(taskToRemove, 1);
        checklist.save();
        res.redirect(`/checklists/${checklist._id}`)
    }
    catch (err) {
        console.log(err)
        res.status(500).render('pages/error', { error: err });
    }
});

checklistDependentRoute.post('/:id/tasks', async (req, res) => {
    let { name } = req.body.task;
    let task = new Task({ name, checklistId: req.params.id })

    try {
        await task.save();
        let checklist = await Checklist.findById(req.params.id);
        checklist.tasks.push(task);
        await checklist.save();
        res.redirect(`/checklists/${req.params.id}`);
    } 
    catch(err) {
        console.log(err)
        res.status(500).render('tasks/new', { task: { ...task, err }, checklistId: req.params.id });
    }
});

simpleRouter.put('/:id', async (req, res) => {
    let task = await Task.findById(req.params.id);
    try {
        task.set(req.body.task);
        await task.save();
        res.status(200).json({ task });
    } 
    catch (err) {
        let errors = err.errors;
        res.status(500).json({ task: { ...errors } });
    }
})

module.exports = { 
    checklistDependent: checklistDependentRoute,
    simple: simpleRouter
};