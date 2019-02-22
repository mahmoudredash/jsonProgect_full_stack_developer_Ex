const express = require('express');
const router = express.Router();
const postController = require('../controllers/postC');
const ensureAuthenticated = require('../config/auth');





// function getroles() {
//     const roles = [];
//     allPostes['dep'].forEach((dep) => {
//         allPostes['post'].forEach((post) => {
//             if (dep.name == post.department) {
//                 roles[dep.name].push(post);
//                 console.log(post);
//             }
//         });
//     });
//     console.log(roles);
// }




// Update Post
router.get('/postes/update/:id', ensureAuthenticated, (req, res) => {
    postController.getpost({
        _id: req.params.id
    }, (err, post) => {
        if (err) {
            req.flash('error_msg', err.msg);
            res.redirect('/admin/postes');
        }
        res.render('admin/updatePostadmin', {
            datap: post,
            adm: function () {
                if (!req.adm) {
                    return true;
                }
            },
        });
    });
});

// Post Update Postes
router.post('/postes/update/:id', ensureAuthenticated, (req, res) => {
    req.checkBody('title', 'title is Required');
    req.checkBody('departm', 'departm is Required');
    req.checkBody('body', 'body is Required');
    const error = req.validationErrors();
    if (error) {
        req.flash('error_msg', error.msg);
        res.redirect('/admin/postes');
    } else {
        const data = {
            title: req.body.title,
            department: req.body.departm,
            body: req.body.body
        };

        postController.updatePost(req.params.id, data, (err, doc) => {
            if (err) {
                req.flash('error_msg', err.msg);
                res.redirect('/admin/postes/add');
            }



            req.flash('success_msg', "'Your Updatred post in DB !:)")
            res.redirect('/admin/postes');
        });

        /*postController.updatePost(req.params.id,
        });*/

    }

});



// remove Post

router.get('/postes/remove/:id', ensureAuthenticated, (req, res) => {
    postController.removePost(req.params.id, (err, doc) => {
        if (err) {
            req.flash('error_msg', err.msg);
            res.redirect('/admin/postes');
        }

        req.flash('success_msg', "Your Removed post in DB !:)")
        res.redirect('/admin/postes');
    });
});


router.get('/postes', ensureAuthenticated, (req, res) => {
    // get postes
    postController.getAllPostes({}, (err, posts) => {
        if (err) {
            req.flash('error_msg', error.msg);
            res.redirect('/admin/postes');
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


        res.render('postes', {
            postes: element,
            adm: function () {
                if (!req.adm) {
                    return true;
                }
            }
        });

    });

});



router.get('/postes/showpost/:id', ensureAuthenticated, (req, res) => {
    postController.getpost({
        _id: req.params.id
    }, (err, post) => {
        if (err) {
            req.flash('error_msg', err.msg);
            res.redirect('/admin/postes');
        }
        res.render('admin/showPostadmin', {
            datap: post,
            adm: function () {
                if (!req.adm) {
                    return true;
                }
            },
        });
    });
});


router.get('/postes/add', ensureAuthenticated, (req, res) => {

    postController.getAllDepartMent((err, departs) => {
        if (err) {
            req.flash('error_msg', err.msg);
            res.redirect('/admin/postes');
        }
        const da = [];
        departs.forEach((dep) => {
            da.push({
                id: dep._id,
                name: dep.name,
                author: dep.author,
                date: dep.Date
            });
        });

        require('../config/errores').datadp.push(da);
    });

    const datadp = require('../config/errores').datadp.pop();
    res.render('admin/postesadd', {
        datadpart: datadp,
        adm: function () {
            if (!req.adm) {
                return true;
            }
        }
    });
});

router.post('/postes/add/new', ensureAuthenticated, (req, res) => {
    req.checkBody('title', 'title is Required');
    req.checkBody('departm', 'departm is Required');
    req.checkBody('body', 'body is Required');
    const error = req.validationErrors();
    if (error) {
        req.flash('error_msg', error.msg);
        res.redirect('/admin/postes/add');
    } else {
        const data = {
            title: req.body.title,
            author: req.user.username,
            department: req.body.departm,
            date: Date.now(),
            body: req.body.body,
            comment: []
        };

        postController.addnewPost(data, res, (err, post) => {
            if (err) {
                req.flash('error_msg', err.msg);
                res.redirect('/admin/postes/add');
            }
            req.flash('success_msg', "'Your Add New post in DB !:)")
            res.redirect('/admin/postes');
        });

    }

});







module.exports = router;