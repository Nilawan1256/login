const express = require('express')
const router = express.Router()
const crypto = require('crypto');
const User = require("../models/Sequelize");
const app = express();

router.route('/')
    .all((req, res, next) => {
        res.locals.pageData = {
            title: 'Register Page'
        }
        next()
    })
    .get((req, res, next) => {
        res.render('pages/register')
    })
    .post((req, res, next) => {

        const bodyParser = require('body-parser');

        // parse application/json
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        const user = req.body.user,
            name = req.body.name,
            pass = req.body.pass
        ;

        var mykey = crypto.createCipher('aes-128-cbc', 'abc');
        var mystr = mykey.update(pass, 'utf8', 'hex')
        mystr += mykey.final('hex');

        User.create({
            user: user,
            name: name,
            pass: mystr
        }).then(result => {
            console.log(result.get({
                plain: true
            }))

            res.render('pages/login')
        })

        // const conn = require('../connection/con');

        // var mykey = crypto.createCipher('aes-128-cbc', 'abc');
        // var mystr = mykey.update(pass, 'utf8', 'hex')
        // mystr += mykey.final('hex');

        // const sql = "INSERT INTO user (user, pass) VALUES ('" + user + "', '" + mystr + "')";
        // console.log("has =",mystr);
        // conn.query(sql, [user, pass], function (err, data) {
        //   if (err) {
        //     console.log("Error inserted into db", err);
        //   } else {
        //     console.log("Successfully inserted into db");
        //     res.redirect('/login');
        //   }
        // });
    })

module.exports = router;