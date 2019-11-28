const express = require('express')
const router = express.Router()
 
router.route('/')
    .get((req, res, next) => { 
        res.locals.pageData = {
            title:'Dashboard Page'
        }
        var user = req.session.user.user;
        var name = req.session.user.name;
        res.render('pages/dashboard',{

            user: user,
            name: name
        })    
    })
    .post((req, res, next) => {
        res.locals.pageData = {
            title:'Dashboard Page'
        }


    });
 
module.exports = router