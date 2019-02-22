const Depart = require('../models/depart');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    addDepartMent: (data, callback) => {
        try {
            const newDepartMent = new Depart({
                name: data.name,
                author: data.author,
                Date: Date.now()
            });
            newDepartMent.save(callback);

        } catch (error) {
            console.log(error);

        }

    },
    getAllDepartMent: ({}, res) => {
        const departA = [];
        Depart.find({}, (err, departs) => {
            if (err) {
                throw err;
                return [];
            }
            departs.forEach((dep) => {
                departA.push({
                    id: dep._id,
                    name: dep.name,
                    author: dep.author,
                    date: dep.Date
                });
            });
            // console.log(departA);
            res.render('admin/departs', {
                allDepart: departA,
                adm: function () {
                    if (!req.adm) {
                        return true;
                    }
                },
            });

        });
    },
    deletDepart: (id, res) => {
        Depart.findOneAndRemove({
            _id: id
        }, {
            useFindAndModify: false,
        }, (err, dep) => {
            if (err) throw err;
            if (dep) {
                res.redirect('/admin/departs');
            }
        });
    }
};