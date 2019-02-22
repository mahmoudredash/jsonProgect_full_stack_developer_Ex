const postDB = require('../models/postes');
const Depart = require('../models/depart');

function getroles(depart, postees) {
    const roles = {
        deps: depart,
        posts: postees
    };
    const tdep = [];
    const tpost = [];
    // department
    roles.deps.forEach((dep) => {
        // postes
        roles.posts.forEach((post) => {

            if (dep.name == post.department) {

            }
        });
    });
    console.log(roles);
}

module.exports = {
    addnewPost: (data, res, callback) => {
        const post = new postDB(data);
        post.save(callback());
    },
    getAllDepartMent: (callback) => {

        Depart.find({}, callback);
    },
    getAllPostes: ({}, callback) => {
        postDB.find({}, callback);
    },
    getpost: (condaction, callback) => {
        postDB.findById(condaction, callback);
    },
    updatePost: (condaction, data, callback) => {

        postDB.findByIdAndUpdate({
            _id: condaction
        }, data, {
            multi: true
        }, callback);

        // postDB.findOne({
        //     _id: condaction,
        // }, callback);
    },
    removePost: (condaction, callback) => {
        postDB.findOneAndRemove({
            _id: condaction
        }, callback);
    }


};