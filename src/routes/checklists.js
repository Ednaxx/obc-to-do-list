const express = require('express');
const Checklist = require('../model/checklist');

// creating router

const router = express.Router();

// try to parse received json and put on requisition's body object

router.use(express.json())

// GET all method

router.get('/', async (req, res) => {
    try {
        let checklists = await Checklist.find();
        res.status(200).json(checklists);
    }
    catch(err) {
        res.status(500).json(err);
    }
});

// GET by id method

router.get('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).json(checklist);
    }
    catch(err) {
        res.status(404).json(err);
    }
})

// POST method

router.post('/', async (req, res) => {
    let name = req.body.name;

    try {
        let checklist = await Checklist.create({ name });
        res.status(200).json(checklist);
    }
    catch(err) {
        res.status(422).json(err);
    }
});

// PUT method

router.put('/:id', async (req, res) => {
    try {
        let name = req.body.name;
        let checklist = await Checklist.findByIdAndUpdate(req.params.id, {name}, {new: true});
        res.status(200).json(checklist);
    }
    catch(err) {
        res.status(422).json(err);
    }
})

// DELETE method

router.delete('/:id', async (req, res) => {
    try {
        let name = req.body.name;
        let checklist = await Checklist.findByIdAndRemove(req.params.id);
        res.status(200).json(checklist);
    }
    catch(err) {
        res.status(422).json(err);
    }
})


module.exports = router