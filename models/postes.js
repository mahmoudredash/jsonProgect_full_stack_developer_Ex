const mongoose = require('mongoose');


const PostesSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    department: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        defualt: Date.now()
    },
    body: {
        type: String,
        require: true
    },
    comment: {
        type: [String],
    }
});


const postes = mongoose.model('Postes', PostesSchema);

module.exports = postes;