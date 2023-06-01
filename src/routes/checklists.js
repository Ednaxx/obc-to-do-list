const express = require('express');
const Checklist = require('../model/checklist');

// creating router

const router = express.Router();

// GET all method

router.get('/', async (req, res) => {
    try {
        let checklists = await Checklist.find();
        res.status(200).render('checklists/index', { checklists: checklists });
    }
    catch(err) {
        console.log(err);
        res.status(500).render('pages/error', { error: err });
    }
});

router.get('/new', async (req, res) => {
    try {
        let checklist = new Checklist();
        res.status(200).render('checklists/new', { checklist: checklist });
    }
    catch(err) {
        console.log(err);
        res.status(500).render('pages/error', { error: err });
    }
});

router.get("/:id/edit", async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/edit', { checklist: checklist })
    }
    catch (err) {
        console.log(err);
        res.status(500).render('pages/error', { error: err });
    }
})

// GET by id method

router.get('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id).populate('tasks');
        res.status(200).render('checklists/show', { checklist: checklist });
    }
    catch(err) {
        console.log(err);
        res.status(404).render('pages/error', { error: err });
    }
})

// POST method

router.post('/', async (req, res) => {
    let { name } = req.body.checklist;
    let checklist = new Checklist({name})

    try {
        await checklist.save();
        res.redirect('/checklists');
    }
    catch(err) {
        console.log(err);
        res.status(422).render('checklists/new', {checklists: { ...checklist, err }});
    }
});

// PUT method

router.put('/:id', async (req, res) => {
    let { name } = req.body.checklist;

    try {
        await Checklist.findOneAndUpdate({_id: req.params.id}, {name});
        res.redirect('/checklists')
    }
    catch(err) {
        console.log(err);
        let errors = err.error;
        res.status(422).render('checklists/edit', {checklist: {...checklist, errors}});
    }
})

// DELETE method

router.delete('/:id', async (req, res) => {
    try {
        await Checklist.findByIdAndRemove(req.params.id);
        res.redirect('/checklists');
    }
    catch(err) {
        console.log(err);
        res.status(500).render('pages/error', { error: err });
    }
})


module.exports = router