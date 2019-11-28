const express = require('express')
const router = express.Router()
const User = require("../models/Sequelize");
 
router.get('/', function(req, res, next) {
    res.locals.pageData = {
        title:'show'
    }
    User.findAll().then(result => {
        // var data = JSON.stringify(x, null, 4)
        result.forEach(function(data) {

            var decyp = data.pass;
            res.render("pages/show", {
    
                result: result,
                decyp: decyp
          
            });

        });
    
    });
})
 
module.exports = router