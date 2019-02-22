const ctrlPost = require('../controllers/postC');
const dbPost = require('../models/postes');




module.exports = {

    getdatS: (callback) => {
        const da = [];
        dbPost.find().sort({
            date: -1
        }).limit(3).then(dat => {
            dat.forEach(data => {
                da.push(data);
            });
            callback(da);
        });
    },

    getallpostandDpart: (datas, callback) => {
        ctrlPost.getAllPostes({}, (err, posts) => {
            const error = null;
            if (err) {
                error = err;
            }
            const da = [];
            posts.forEach((post) => {
                da.push(post); //
            });

            // init departPost
            const element = {
                departm: [],
                usersdp: []

            }
            // get all departments
            for (let index = 0; index < da.length; index++) {
                if (da[index].department) {
                    if (element.departm.indexOf(da[index].department) > -1) {
                        continue;
                    } else {
                        element.departm.push(da[index].department);
                    }
                }
            }
            // add user in dppart arry
            for (const item of element.departm) {
                const a = []; //this array contunt all post in depart
                for (const it of da) {
                    if (item == it.department) {
                        a.push(it);
                    }
                }

                element.usersdp.push(a);
            }

            // console.log(element.usersdp);
            callback(error, element, datas);

        });

    },
    getpostbuid: (id, callback) => {

        ctrlPost.getpost({
            _id: id
        }, callback);
    },

};