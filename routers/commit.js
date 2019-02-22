const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../config/auth');
const controllerCommit = require('../controllers/commitC');


// get all commit
router.get('/commites', ensureAuthenticated, (req, res) => {

    controllerCommit.getallCommit({}, (err, com) => {
        if (err) {
            req.flash('error_msg', err.msg);
            res.redirect('/admin/dashbord');
        }
        res.render('admin/commitesm', {
            datac: com,
            adm: function () {
                if (!req.adm) {
                    return true;
                }
            },
        });
    });

});

//  activated Commit
router.get('/commites/updatex/:id', ensureAuthenticated, (req, res) => {
    const condaction = req.params.id;
    const updatedat = {
        $inc: {
            activet: 1
        }
    };
    controllerCommit.updateCommit(condaction, updatedat, (err, com) => {
        if (err) {
            req.flash('error_msg', err.msg);
            res.redirect('/admin/commites');
        }
        req.flash('success_msg', "The COMMENT was activated !:(  ");
        res.redirect('/admin/commites');
    });
});


// Deleted Commit 
router.get('/commites/remove/:id', ensureAuthenticated, (req, res) => {
    const condaction = req.params.id;
    controllerCommit.removeCommit(condaction, (err, com) => {
        if (err) {
            req.flash('error_msg', err.msg);
            res.redirect('/admin/commites');
        }
        req.flash('success_msg', "The COMMENT was Deleted !:(  ");
        res.redirect('/admin/commites');
    });
});



// update body commit

router.post('/commites', ensureAuthenticated, (req, res) => {
    const condaction = req.body.id;
    const updatedat = {
        $set: {
            body: req.body.body,
        }
    };
    controllerCommit.updateCommit(condaction, updatedat, (err, com) => {
        if (err) {
            req.flash('error_msg', err.msg);
            res.redirect('/admin/commites');
        }
        req.flash('success_msg', "The COMMENT was Update Data !:(  ");
        res.redirect('/admin/commites');
    });
});


// get commit Was PostID
router.get("/post/:id", (req, res) => {
    const condaction = {
        PostId: req.params.id
    };
    controllerCommit.getallCommit(condaction, (err, doc) => {
        if (err) {
            req.flash('error_msg', err.msg);
            res.redirect('/post/:id');
        }
        req.flash('success_msg', "The !:(  ");
        res.redirect('/post/:id');
    });

});





module.exports = router;