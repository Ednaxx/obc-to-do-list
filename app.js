const express = require('express');
const checklistsRouter = require('./src/routes/checklists');
require('./config/database');

const app = express();
const route = 3000;

app.use('/checklists', checklistsRouter)

app.listen(route, () => {console.log(`Server listening at: http://localhost:${route}`)});