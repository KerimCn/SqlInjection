// { autofold
var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();

var app = express();
app.use(express.static('.'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');


var db = new sqlite3.Database(':memory:');
db.serialize(function() {
  db.run("CREATE TABLE user (id INT ,username TEXT, password TEXT, name TEXT,surname TEXT)");
  db.run("INSERT INTO user VALUES ('1','admin', 'admin123', 'Admin','')");
  db.run("INSERT INTO user VALUES ('2','kerim', 'kerimcan123', 'Kerim Can','Karpuz')");
  db.run("INSERT INTO user VALUES ('3','user', 'user123', 'Deneme','Hesap')");

});
// }
app.post('/login', function (req, res) {
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
            res.send('Hello <b>' + row.name + '</b><br /><a href="/index.html">Go back to login</a><br /><a href="/uye">Üyeleri Listele</a>');
        }
    });

});

app.post('/uye', function (req, res) {
    var id = req.body.id; // a valid username is admin
    var query = "SELECT * FROM user where id = '" + id + "'";

    console.log("ID: " + id);
    console.log('query: ' + query);
    
    db.all(query , function(err, row) {

        if(err) {
            console.log('ERROR', err);
            res.redirect("/uye#error");
        } else if (!row) {
            res.redirect("/uye#unauthorized");
        } else {
            console.log (row)
            res.render('uye',{row:row});
        }
    });

});

app.get('/uye', function (req, res) {
    res.render('uye');
  });

  app.post('/arama', function (req, res) {
    var name = req.body.name; // a valid username is admin
    var query = "SELECT * FROM user where name = '" + name + "'";

    console.log("Name: " + name);
    console.log('query: ' + query);
    
    db.all(query , function(err, row) {

        if(err) {
            console.log('ERROR', err);
            res.redirect("/arama#error");
        } else if (!row) {
            res.redirect("/arama#unauthorized");
        } else {
            console.log (row)
            res.render('arama',{row:row});
        }
    });

});

app.get('/arama', function (req, res) {
    res.render('arama');
  });




app.listen(3001);
