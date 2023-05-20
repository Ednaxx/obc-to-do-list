const mongoose = require('mongoose');

// connection with local db

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/todo-list')
    }
    catch (error) {
        console.log(error);
    }
}

main().then(console.log('Conncted to MongoDB'))