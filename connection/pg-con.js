var mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.64.2",
  user: "boranka",
  password: "UWzlz9VtfFIM3zNy",
  database:'jscms',
  port:'3306',
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports=con;

