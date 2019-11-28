const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require("../models/Sequelize");
const app = express();

router.route('/')
    .all((req, res, next) => {
        res.locals.pageData = {
            title: 'Login Page'
        }
        next();
    })
    .get((req, res, next) => {
        req.session.destroy()
        res.render('pages/login')
    })
    .post((req, res, next) => {
        const bodyParser = require('body-parser');
        // parse application/json
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        const usersec = req.body.user
        opass = req.body.pass;
        User.findAll({
            where: { user: usersec }
        }).then(result => {
            result.forEach(function (data) {
                var mykey = crypto.createDecipher('aes-128-cbc', 'abc');
                var mystr = mykey.update(data.pass, 'hex', 'utf8')
                mystr += mykey.final('utf8');

                if (!mystr == opass) {
                    console.log("Login don't Successfully");
                    res.redirect('/login');
                }
                else {
                    console.log("Login Successfully");
                    req.session.user = data;
                    res.redirect('/dashboard');
                };
            });
        });

        // const conn = require('../connection/con');
        // const user = req.body.user
        //       opass = req.body.pass
        // ;
        // console.log("User is is =" + user);
        // const sql = "SELECT * FROM user WHERE user = '" + user + "'";
        // console.log("sql is =" + sql);
        // conn.query(sql, function (err, result) {
        //     result.forEach(function (data) {
        //         var mykey = crypto.createDecipher('aes-128-cbc', 'abc');
        //         var mystr = mykey.update(data.pass, 'hex', 'utf8')
        //         mystr += mykey.final('utf8');
        //         if (!mystr == opass) {
        //             console.log("Login don't Successfully");
        //             res.redirect('/login');
        //         } else {
        //             console.log("Login Successfully");
        //             var username = data.user ;
        //             res.redirect('/dashboard?user=' + username);
        //         };
        //     });
        // });

    });

module.exports = router;