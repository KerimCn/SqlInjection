const express = require('express');
const router = express.Router();
const con = require('../connection/pg-con');
const passport = require('passport');

//Tüm adresler listesini getir
router.get('/', (req, res, next) => {
    
    res.render('login');
});

router.post('/', (req, res,next) => {
    var username = req.body.username; // a valid username is admin
    var password = req.body.password; // a valid password is admin123
    var query = "SELECT name FROM user where username = '" + username + "' and password = '" + password + "'";

    console.log("username: " + username);
    console.log("password: " + password);
    console.log('query: ' + query);
    
    db.get(query , function(err, row) {

        if(err) {
            console.log('ERROR', err);
            res.redirect("/index.html#error");
        } else if (!row) {
            res.redirect("/index.html#unauthorized");
        } else {
            res.send('Hello <b>' + row.name + '</b><br /><a href="/index.html">Go back to login</a>');
        }
    });

});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/login');
});




module.exports=router;