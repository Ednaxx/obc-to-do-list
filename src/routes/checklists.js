const express = require('express');
const Checklist = require('../model/checklist');
const methodOverride = require('method-override');

// creating router

const router = express.Router();

// try to parse received json and put on requisition's body object

router.use(express.json());
router.use(express.urlencoded({extended: true}));
router.use(methodOverride('_method'));

// GET all method

router.get('/', async (req, res) => {
    try {
        let checklists = await Checklist.find();
        res.status(200).render('checklists/index', { checklists: checklists });
    }
    catch(err) {
        res.status(500).render('pages/error', { error: err });
    }
});

router.get('/new', async (req, res) => {
    try {
        let checklist = new Checklist();
        res.status(200).render('checklists/new', { checklist: checklist });
    }
    catch(err) {
        res.status(500).render('pages/error', { error: err });
    }
});

// GET by id method

router.get('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/show', { checklist: checklist });
    }
    catch(err) {
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
        res.status(422).render('checklists/new', {checklists: { ...checklist, err }});
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