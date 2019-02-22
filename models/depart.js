const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    Date: {
        type: Date,
        default: Date.now()
    }

});

const Depart = mongoose.model('Depart', departmentSchema);

module.exports = Depart;