const express = require('express')
const router = express.Router()
 
router.route('/')
    .all((req, res, next) => {
        res.locals.pageData = {
            title: 'Login Page'
        }
        next();
    })
    .get((req, res, next) => {

        
    })
    .post((req, res, next) => {


    });
 
module.exports = router