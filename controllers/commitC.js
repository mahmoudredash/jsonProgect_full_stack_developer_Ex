const dbCommit = require('../models/commites');


module.exports = {
    getallCommit: ({}, callback) => {
        dbCommit.find({}, callback);
    },
    addCommit: (data, callback) => {
        const obcomit = new dbCommit({
            PostId: data.PostId,
            author: data.author,
            mail: data.mail,
            date: Date.now(),
            body: data.body,
            activet: 0,
            options: data.options
        });
        obcomit.save(callback);
    },
    updateCommit: (condaction, data, callback) => {
        dbCommit.findByIdAndUpdate({
            _id: condaction
        }, data, {
            multi: true
        }, callback);
    },
    removeCommit: (condaction, callback) => {
        dbCommit.findOneAndRemove({
            _id: condaction
        }, callback)
    },
    getCommit: (condaction, callback) => {
        dbCommit.findById({
            _id,
            condaction
        }, callback);
    }
};