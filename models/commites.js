const mongoose = require('mongoose');


const CommitSchema = mongoose.Schema({
    PostId: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    mail: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    options: {
        type: Map,
        of: String
    },
    activet: {
        type: Number,
        require: true
    }
})

const Commit = mongoose.model('Commites', CommitSchema);

module.exports = Commit;