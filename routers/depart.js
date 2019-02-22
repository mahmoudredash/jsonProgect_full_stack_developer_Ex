const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../config/auth');
const ControllerdepartmentDB = require('../controllers/departC');



router.get('/departs', ensureAuthenticated, (req, res) => {
    ControllerdepartmentDB.getAllDepartMent({}, res);
});


router.post('/departs', ensureAuthenticated, (req, res) => {
    req.checkBody("departname", "Depar tname is Required");
    const errors = req.validationErrors();
    if (errors) {
        req.flash('error_msg', error.msg);
        console.log(error);
        res.redirect('/admin/dashboard');
    } else {
        const data = {
            name: req.body.departname,
            author: req.user.username
        };
        ControllerdepartmentDB.addDepartMent(data, (err, user) => {
            if (err) throw err;
            if (user) {
                req.flash('success_msg', 'Your Add New DepartMent in DB !:)');
                res.redirect('/admin/postes');
            }
        });

    }
});


router.get('/departs/:id', ensureAuthenticated, (req, res) => {
    ControllerdepartmentDB.deletDepart(req.params.id, res);

});



module.exports = router;