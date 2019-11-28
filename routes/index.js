const express = require('express')
const router = express.Router()
 
router.route('/')
    .all((req, res, next) => {
        res.locals.pageData = {
            title: 'Index Page'
        }
        next();
    })
    .get((req, res, next) => {
        res.render('pages/index')
    })
    .post((req, res, next) => {

        res.render('pages/index')

    });
 
module.exports = router