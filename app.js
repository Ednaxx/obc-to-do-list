const express = require('express');
const path = require('path');

// importing routes

const checklistsRouter = require('./src/routes/checklists');
const rootRouter = require('./src/routes/index');

// db server

require('./config/database');

const app = express();
const route = 3000;

// try to parse received json and put on requisition's body object

const methodOverride = require('method-override');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method', {methods: ["GET", "POST"]}));

// setting views directory and engine

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

// static files serving

app.use(express.static(path.join(__dirname, 'public')));

// defining routes

app.use('/checklists', checklistsRouter);
app.use('/', rootRouter);



// server listening 

app.listen(route, () => {console.log(`Server listening at: http://localhost:${route}`)});