const express = require('express');
const router = express.Router();
const vData = require('../controllers/view_vistor');
const commit = require('../controllers/commitC');

router.get('/', (req, res) => {

    vData.getdatS((data) => {
        vData.getallpostandDpart(data, (error, element, data) => {
            if (error) req.flash('error_msg', error);
            // console.log(data);

            // passy data to view
            res.status(200).render('home', {
                dataps: data,
                postes: element,
            });
        });
    });



});

router.get('/poste/:id', (req, res) => {
    if (req.params.id) {
        vData.getpostbuid(req.params.id, (err, post) => {
            if (err) {
                req.flash('error_msg', err.msg);
                res.redirect('/');
            }
            // get all comit for this post
            commit.getallCommit({
                _id: post._id
            }, (err, commits) => {
                if (err) console.log('Error: ' + err.msg);

                res.render('postshow', {
                    datap: post,
                    commite: commits
                });

            });
        });
    }
});


router.post('/poste/:id', (req, res) => {
    req.checkBody('author', )
    req.checkBody('mail', )
    req.checkBody('body', )
    const error = req.validationErrors();
    if (error) {
        req.flash('error_msg', "Error :" + error.msg);
        res.redirect('/poste/' + req.params.id);
    }
    const tes = {
        PostId: req.params.id,
        author: req.body.author,
        mail: req.body.mail,
        body: req.body.body
    }

    commit.addCommit(tes, (err, doc) => {
        if (err) {
            req.flash('error_msg', "Error :" + err.msg);
            res.redirect('/poste/' + req.params.id);
        }
        req.flash('success_msg', "Add Commite and wite active admin ");
        res.redirect('/poste/' + req.params.id);
    });

})

router.get('/about', (req, res) => {
    res.status(200).render('about');
});

router.get('/dashboard', (req, res) => {
    res.status(200).send("Welcom In admin Page");
});

module.exports = router;